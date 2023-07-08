import { setActivePinia, createPinia } from "pinia";
import { useNotebookStore } from "@/stores/notebookStore";
import {describe, it, expect, beforeEach} from "vitest";

describe("notebookStore", () => {
    let notebookStore: any = null;
    beforeEach(() => {
        setActivePinia(createPinia());
        notebookStore = useNotebookStore();
    })
    it('should add notebook with id', () => {
        notebookStore.addNotebook("Test notebook");
        expect(notebookStore.notebooks.length).toBe(1); // This should be changed when no default notebooks are added on start
        expect(notebookStore.notebooks[0].name).toBe("Test notebook");
        expect(notebookStore.notebooks[0].id).toBeDefined();
    });
    it('should make added notebook the selected one', () => {
        notebookStore.addNotebook("Test notebook");
        expect(notebookStore.selectedNotebook.id).toBe(notebookStore.notebooks[0].id);
        expect(notebookStore.selectedNotebook.name).toBe("Test notebook");
    })
});