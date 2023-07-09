import { setActivePinia, createPinia } from "pinia";
import { useNotebookStore } from "@/stores/notebookStore";
import {describe, it, expect, beforeEach, vi} from "vitest";
import {useNoteStore} from "@/stores/noteStore";

describe("notebookStore", () => {
    let notebookStore: any = null;
    beforeEach(() => {
        setActivePinia(createPinia());
        notebookStore = useNotebookStore();
    })
    it('should add notebook with id', () => {
        notebookStore.addNotebook("Test notebook");
        expect(notebookStore.notebooks.length).toBe(1);
        expect(notebookStore.notebooks[0].name).toBe("Test notebook");
        expect(notebookStore.notebooks[0].id).toBeDefined();
    });
    it('should make added notebook the selected one', () => {
        notebookStore.addNotebook("Test notebook");
        expect(notebookStore.selectedNotebook).toBe(notebookStore.notebooks[0].id);
    });
    it('updates selected notebook notes on new notebook', () => {
        const noteSpy = vi.spyOn(useNoteStore(), 'updateSelectedNotebookNotes');
        notebookStore.addNotebook("Test notebook");
        expect(noteSpy).toHaveBeenCalledOnce();
    });
    it('should update selected notebook notes on new and switch', () => {
        const noteSpy = vi.spyOn(useNoteStore(), 'updateSelectedNotebookNotes');
        notebookStore.addNotebook("Test notebook");
        notebookStore.addNotebook("Test notebook 2");
        notebookStore.setSelectedNotebook(notebookStore.notebooks[0].id);
        expect(noteSpy).toHaveBeenCalledTimes(3);
    });
});