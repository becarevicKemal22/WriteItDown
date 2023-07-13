import {defineStore} from "pinia";
import {ref} from "vue";
import type {Note} from "@/types/Note";

export const useNoteStore = defineStore("note", () => {
    const notes = ref<Note[]>([]);
    const selectedNotebookNotes = ref<Note[]>([]);
    const selectedNote = ref<Note>(notes.value[0] ?? null);

    const createNote = (selectedNotebook: number) => {
        const newNote: Note = {
            id: Date.now(),
            title: "New note",
            content: "Start writing here...",
            tags: [],
            lastModified: Date.now(),
            favorite: false,
            notebookId: selectedNotebook,
        };
        notes.value.unshift(newNote);
        updateSelectedNotebookNotes(selectedNotebook);
        selectedNote.value = newNote;
    }

    const setSelectedNote = (id: number) => {
        const note = notes.value.find(note => note.id === id);
        if (note) {
            selectedNote.value = note;
        } else {
            throw new Error("Note not found");
        }
    }

    const setSelectedNoteTitle = (newTitle: string) => {
        selectedNote.value.title = newTitle;
    }

    const updateSelectedNotebookNotes = (notebookId: number) => {
        selectedNotebookNotes.value = notes.value.filter(note => note.notebookId === notebookId);
    }

    const isSaving = ref(false);
    let timeoutId: {
        [key: number]: ReturnType<typeof setTimeout>
    } | undefined
    let inactivityRequiredForUpdate = 1000;

    const saveNoteContent = async (newContent: string, noteId: number) => {
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
            isSaving.value = false;
            delete timeoutId![noteId];
        }, inactivityRequiredForUpdate);
    }

    const setInactivityRequiredForUpdate = (newTime: number) => {
        inactivityRequiredForUpdate = newTime;
    };

    return {
        selectedNote,
        notes,
        createNote,
        setSelectedNote,
        updateSelectedNotebookNotes,
        selectedNotebookNotes,
        setSelectedNoteTitle,
        saveNoteContent,
        isSaving,
        setInactivityRequiredForUpdate,
    };
});