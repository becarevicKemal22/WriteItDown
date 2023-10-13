import {defineStore} from "pinia";
import {ref} from "vue";
import type {Note} from "@/types/Note";
import {getFirestore, doc, collection, setDoc, query, where, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import {useNotebookStore} from "@/stores/notebookStore";

function emptyNoteFactory(firestoreID: string, selectedNotebook: string): Note{
    return {
        id: firestoreID,
        title: "New note",
        content: "",
        tags: [],
        lastModified: Date.now(),
        favorite: false,
        notebookId: selectedNotebook,
        accessIDs: [],
    }
}

export const useNoteStore = defineStore("note", () => {
    const notes = ref<Note[]>([]);
    const searchedNotes = ref<Note[]>([]);
    const displaySearched = ref(false);
    const selectedNote = ref<Note | null>(notes.value[0] ?? null);
    const hasBeenModifiedSinceLastSave = ref(false);

    const createNote = async (selectedNotebook: string) => {
        const newNoteRef = doc(collection(getFirestore(), "notes"));
        const firestoreID = newNoteRef.id as string;
        const newNote: Note = emptyNoteFactory(firestoreID, selectedNotebook);
        notes.value.unshift(newNote);
        setSelectedNote(newNote.id);
        await setDoc(newNoteRef, newNote);
    }

    const setSelectedNote = (id: string) => {
        const note = notes.value.find(note => note.id === id);
        if (note) {
            selectedNote.value = note;
            hasBeenModifiedSinceLastSave.value = false;
            resetSearch();
        } else {
            throw new Error("Note not found");
        }
    }

    const deleteSelectedNote = async () => {
        if(selectedNote.value){
            const noteRef = doc(getFirestore(), "notes", selectedNote.value.id);
            await deleteDoc(noteRef);
            resetSearch();
            notes.value = notes.value.filter(note => note.id !== selectedNote.value!.id);
            selectedNote.value = null;
        }
    }

    const deleteAllNotesInSelectedNotebook = async () => {
        const selectedNotebookId = useNotebookStore().selectedNotebook;
        const noteQuery = query(collection(getFirestore(), "notes"), where("notebookId", "==", selectedNotebookId));
        const noteQuerySnapshot = await getDocs(noteQuery);
        await noteQuerySnapshot.forEach( (document: any) => {
            const noteRef = doc(getFirestore(), "notes", document.id);
            deleteDoc(noteRef).then(() => {});
        });
        $reset();
    }

    const setSelectedNoteTitle = async (newTitle: string, saveToDB: boolean = false) => {
        if(selectedNote.value){
            selectedNote.value.title = newTitle;
            moveSelectedNoteToTop();
            if(!saveToDB){
                return;
            }
            isSaving.value = true;
            selectedNote.value.lastModified = Date.now();
            const noteRef = doc(getFirestore(), "notes", selectedNote.value.id);
            await updateDoc(noteRef, {
                title: newTitle,
                lastModified: Date.now(),
            });
            isSaving.value = false;
        }
    }

    const toggleSelectedNoteFavorite = async () => {
        if(selectedNote.value){
            selectedNote.value.favorite = !selectedNote.value.favorite;
            selectedNote.value.lastModified = Date.now();
            moveSelectedNoteToTop();
            const noteRef = doc(getFirestore(), "notes", selectedNote.value.id);
            await updateDoc(noteRef, selectedNote.value);
        }
    }

    const fetchNotesForNotebook = async (notebookId: string) => {
        const noteQuery = query(collection(getFirestore(), "notes"), where("notebookId", "==", notebookId));
        const noteQuerySnapshot = await getDocs(noteQuery);
        notes.value = [];
        noteQuerySnapshot.forEach((doc: any) => {
            const note = doc.data() as Note;
            notes.value.push(note);
        });
        sortNotes();
    }

    const isSaving = ref(false);
    let timeoutId: {
        [key: string]: ReturnType<typeof setTimeout>
    } | undefined
    let inactivityRequiredForUpdate = 1000;

    const saveNoteContent = async (newContent: string, noteId: string) => {
        if (timeoutId && timeoutId[noteId]){
            clearTimeout(timeoutId[noteId]);
        }else if(!timeoutId){
            timeoutId = {};
        }

        timeoutId[noteId] = setTimeout(async () => {
            isSaving.value = true;
            const noteStore = useNoteStore();
            const note = noteStore.notes.find(note => note.id === noteId)!;
            note.content = newContent;
            note.lastModified = Date.now();
            await setDoc(doc(getFirestore(), "notes", noteId), note);
            isSaving.value = false;
            delete timeoutId![noteId];
            sortNotes();
            hasBeenModifiedSinceLastSave.value = false;
        }, inactivityRequiredForUpdate);
    }

    const moveSelectedNoteToTop = () => {
        if(!selectedNote.value){
            return;
        }
        if(selectedNote.value.favorite){
            notes.value = notes.value.filter(note => note.id !== selectedNote.value!.id);
            notes.value.unshift(selectedNote.value);
        }else{
            notes.value = notes.value.filter(note => note.id !== selectedNote.value!.id);
            const index = notes.value.slice().reverse().findIndex(x => x.favorite === true);
            const count = notes.value.length - 1
            const finalIndex = index >= 0 ? count - index : index;
            if(finalIndex === -1){
                notes.value.unshift(selectedNote.value);
            }else{
                notes.value.splice(finalIndex + 1, 0, selectedNote.value);
            }
        }
    }

    const sortNotes = () => {
        notes.value.sort((a, b) => {
            if(a.favorite && !b.favorite){
                return -1;
            }else if(!a.favorite && b.favorite){
                return 1;
            }else{
                return b.lastModified - a.lastModified;
            }
        });
    }

    const unselectNote = () => {
        selectedNote.value = null;
    }

    const setInactivityRequiredForUpdate = (newTime: number) => {
        inactivityRequiredForUpdate = newTime;
    };

    const searchNotes = (searchTerm: string) => {
        if(searchTerm === ""){
            searchedNotes.value = [];
            displaySearched.value = false;
            return;
        }
        const searchResults = notes.value.filter(note => {
            return note.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        searchedNotes.value = searchResults;
        displaySearched.value = true;
        selectedNote.value = null;
    }

    const resetSearch = () => {
        searchedNotes.value = [];
        displaySearched.value = false;
    };

    function $reset(){
        notes.value = [];
        selectedNote.value = null;
        searchedNotes.value = [];
        displaySearched.value = false;
        hasBeenModifiedSinceLastSave.value = false;
    }

    return {
        selectedNote,
        notes,
        createNote,
        setSelectedNote,
        deleteSelectedNote,
        deleteAllNotesInSelectedNotebook,
        fetchNotesForNotebook,
        setSelectedNoteTitle,
        toggleSelectedNoteFavorite,
        saveNoteContent,
        isSaving,
        unselectNote,
        setInactivityRequiredForUpdate,
        sortNotes,
        searchedNotes,
        displaySearched,
        searchNotes,
        resetSearch,
        hasBeenModifiedSinceLastSave,
        $reset,
    };
});