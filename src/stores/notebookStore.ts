import { defineStore } from "pinia";
import {ref} from "vue";
import type {Notebook} from "@/types/Notebook";
import {useNoteStore} from "@/stores/noteStore";

export const useNotebookStore = defineStore("notebook",  () => {
    const notebooks = ref<Notebook[]>([]);
    const selectedNotebook = ref<number>(notebooks.value[0]?.id ?? null);

    function addNotebook(notebookName: string) {
        const notebookId = Math.random();
        const notebook: Notebook = {
            id: notebookId,
            name: notebookName,
        }
        notebooks.value.unshift(notebook);
        setSelectedNotebook(notebookId);
    }

    function setSelectedNotebook(notebookId: number) {
        selectedNotebook.value = notebookId;
        const noteStore = useNoteStore();
        noteStore.updateSelectedNotebookNotes(notebookId);
    }

    return { selectedNotebook, notebooks, addNotebook, setSelectedNotebook };
});