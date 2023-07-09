import { setActivePinia, createPinia } from "pinia";
import {describe, it, expect, beforeEach} from "vitest";
import {useNoteStore} from "@/stores/noteStore";

describe("noteStore", () => {
    let noteStore: any = null;
    beforeEach(() => {
        setActivePinia(createPinia());
        noteStore = useNoteStore();
    })
    it('creates new note with id', () => {
        noteStore.createNote(1);
        expect(noteStore.notes[0]?.id).toBeDefined();
    });
    it('makes new note the selected one', () => {
        noteStore.createNote(1);
        expect(noteStore.selectedNote).toBe(noteStore.notes[0]);
    });
    it('sets selected note', () => {
        noteStore.createNote(1);
        noteStore.createNote(1);
        noteStore.setSelectedNote(noteStore.notes[0].id);
        expect(noteStore.selectedNote).toBe(noteStore.notes[0]);
    });
    it('updates selected notebook notes on new note added', async () => {
        expect(noteStore.selectedNotebookNotes.length).toBe(0);
        noteStore.createNote(1);
        expect(noteStore.selectedNotebookNotes.length).toBe(1);
        expect(noteStore.selectedNotebookNotes[0]).toEqual(noteStore.notes[0]);
    });
});