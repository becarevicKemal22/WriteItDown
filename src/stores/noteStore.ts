import {defineStore} from "pinia";
import {ref} from "vue";
import type {Note} from "@/types/Note";
import {getFirestore, doc, collection, setDoc, query, where, getDocs, updateDoc} from "firebase/firestore";

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
            notes.value = notes.value.filter(note => note.id !== id);
            notes.value.unshift(note);
        } else {
            throw new Error("Note not found");
        }
    }

    const setSelectedNoteTitle = async (newTitle: string, saveToDB: boolean = false) => {
        if(selectedNote.value){
            selectedNote.value.title = newTitle;
            if(!saveToDB) return;

            isSaving.value = true;
            const noteRef = doc(getFirestore(), "notes", selectedNote.value.id);
            await updateDoc(noteRef, {
                title: newTitle,
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
        }, inactivityRequiredForUpdate);
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
        fetchNotesForNotebook,
        setSelectedNoteTitle,
        saveNoteContent,
        isSaving,
        setInactivityRequiredForUpdate,
        $reset,
    };
});