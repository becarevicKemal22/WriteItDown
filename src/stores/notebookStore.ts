import { defineStore } from "pinia";
import {ref} from "vue";
import type {Notebook} from "@/types/Notebook";

export const useNotebookStore = defineStore("notebook",  () => {
    const notebooks = ref<Notebook[]>([]);
    const selectedNotebook = ref<Notebook>(notebooks.value[0] ?? null);

    function addNotebook(notebookName: string) {
        const notebookId = Math.random();
        const notebook: Notebook = {
            id: notebookId,
            name: notebookName,
        }
        notebooks.value.unshift(notebook);
        selectedNotebook.value = notebook;
    }

    return { selectedNotebook, notebooks, addNotebook };
});