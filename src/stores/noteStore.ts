import {defineStore} from "pinia";
import {ref} from "vue";
import type {Note} from "@/types/Note";
import {getFirestore, doc, collection, setDoc, query, where, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import {useNotebookStore} from "@/stores/notebookStore";

export const useNoteStore = defineStore("note", () => {
    const notes = ref<Note[]>([]);
    const selectedNote = ref<Note | null>(notes.value[0] ?? null);

    const createNote = async (selectedNotebook: string) => {
        const newNoteRef = doc(collection(getFirestore(), "notes"));
        const firestoreID = newNoteRef.id as string;
        const newNote: Note = {
            id: firestoreID,
            title: "New note",
            content: "Start writing here...",
            tags: [],
            lastModified: Date.now(),
            favorite: false,
            notebookId: selectedNotebook,
            accessIDs: [],
        };
        notes.value.unshift(newNote);
        selectedNote.value = newNote;
        await setDoc(newNoteRef, newNote);
    }

    const setSelectedNote = (id: string) => {
        const note = notes.value.find(note => note.id === id);
        if (note) {
            selectedNote.value = note;
        } else {
            throw new Error("Note not found");
        }
    }

    const deleteSelectedNote = async () => {
        if(selectedNote.value){
            const noteRef = doc(getFirestore(), "notes", selectedNote.value.id);
            await deleteDoc(noteRef);
            notes.value = notes.value.filter(note => note.id !== selectedNote.value!.id);
            selectedNote.value = notes.value[0] ?? null;
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
        notes.value = [];
        selectedNote.value = null;
    }

    const setSelectedNoteTitle = async (newTitle: string, saveToDB: boolean = false) => {
        if(selectedNote.value){
            selectedNote.value.title = newTitle;
            moveSelectedNoteToTop();
            if(!saveToDB){
                return;
            }
            isSaving.value = true;
            const noteRef = doc(getFirestore(), "notes", selectedNote.value.id);
            await updateDoc(noteRef, {
                title: newTitle,
                lastModified: Date.now(),
            });
            isSaving.value = false;
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
            moveSelectedNoteToTop();
        }, inactivityRequiredForUpdate);
    }

    const moveSelectedNoteToTop = () => {
        if(selectedNote.value){
            notes.value = notes.value.filter(note => note.id !== selectedNote.value!.id);
            notes.value.unshift(selectedNote.value);
        }
    }

    const unselectNote = () => {
        selectedNote.value = null;
    }

    const setInactivityRequiredForUpdate = (newTime: number) => {
        inactivityRequiredForUpdate = newTime;
    };

    function $reset(){
        notes.value = [];
        selectedNote.value = null;
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
        saveNoteContent,
        isSaving,
        unselectNote,
        setInactivityRequiredForUpdate,
        $reset,
    };
});