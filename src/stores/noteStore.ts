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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const inactivityRequiredForUpdate = 1000;

    const saveNoteContent = async (newContent: string) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(async () => {
            isSaving.value = true;
            await new Promise(resolve => setTimeout(resolve, 1000)); // Just to test indicator
            selectedNote.value.content = newContent;
            selectedNote.value.lastModified = Date.now();
            isSaving.value = false;
        }, inactivityRequiredForUpdate);
    }

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
    };
});