import {defineStore} from "pinia";
import {ref} from "vue";
import type {Notebook} from "@/types/Notebook";
import {useNoteStore} from "@/stores/noteStore";
import {useAuthState} from "@/composables/useAuthState";
import type {User} from "firebase/auth";
import {collection, doc, getFirestore, setDoc, query, where, getDocs, deleteDoc, updateDoc} from "firebase/firestore";

export const useNotebookStore = defineStore("notebook", () => {
    const notebooks = ref<Notebook[]>([]);
    const selectedNotebook = ref<string>(notebooks.value[0]?.id ?? null);
    const selectedNotebookName = ref<string>("");
    const isProcessing = ref<boolean>(false);

    const addNotebook = async (notebookName: string) => {
        isProcessing.value = true;
        const {getUser} = useAuthState();
        const user = (await getUser()) as User;
        const userId = user.uid as string;
        const newNotebookRef = doc(collection(getFirestore(), "notebooks"));
        const firestoreID = newNotebookRef.id as string;
        const notebook: Notebook = {
            id: firestoreID,
            name: notebookName,
            ownerID: userId,
        }
        notebooks.value.unshift(notebook);
        await setDoc(newNotebookRef, notebook);
        await setSelectedNotebook(firestoreID);
        isProcessing.value = false;
    }

    const setSelectedNotebook = async (notebookId: string) => {
        if(notebookId === selectedNotebook.value) return;
        isProcessing.value = true;
        selectedNotebook.value = notebookId;
        selectedNotebookName.value = notebooks.value.find(notebook => notebook.id === notebookId)?.name ?? "";
        const noteStore = useNoteStore();
        noteStore.unselectNote();
        await noteStore.fetchNotesForNotebook(notebookId);
        isProcessing.value = false;
    }

    const deleteSelectedNotebook = async () => {
        isProcessing.value = true;
        const noteStore = useNoteStore();
        await noteStore.deleteAllNotesInSelectedNotebook();
        const notebookRef = doc(getFirestore(), "notebooks", selectedNotebook.value);
        await deleteDoc(notebookRef);
        notebooks.value = notebooks.value.filter(notebook => notebook.id !== selectedNotebook.value);
        await setSelectedNotebook(notebooks.value[0]?.id ?? null);
        isProcessing.value = false;
    }

    const changeSelectedNotebookName = async (newName: string) => {
        isProcessing.value = true;
        const notebookRef = doc(getFirestore(), "notebooks", selectedNotebook.value);
        await updateDoc(notebookRef, {name: newName});
        const notebook = notebooks.value.find(notebook => notebook.id === selectedNotebook.value)!;
        notebook.name = newName;
        selectedNotebookName.value = newName;
        isProcessing.value = false;
    }

    const fetchNotebooks = async () => {
        isProcessing.value = true;
        const {getUser} = useAuthState();
        const user = (await getUser()) as User;
        const userId = user.uid as string;
        const notebookQuery = query(collection(getFirestore(), "notebooks"), where("ownerID", "==", userId));
        notebooks.value = [];
        const notebookQuerySnapshot = await getDocs(notebookQuery);
        notebookQuerySnapshot.forEach((doc: any) => {
            const notebook = doc.data() as Notebook;
            notebooks.value.push(notebook);
        });
        if(notebooks.value.length === 0) {
            await addNotebook("My first notebook");
        }
        await setSelectedNotebook(notebooks.value[0]?.id);
        isProcessing.value = false;
    }

    function $reset() {
        notebooks.value = [];
        selectedNotebook.value = '';
        selectedNotebookName.value = "";
    }

    return {
        selectedNotebook,
        notebooks,
        addNotebook,
        setSelectedNotebook,
        deleteSelectedNotebook,
        selectedNotebookName,
        changeSelectedNotebookName,
        fetchNotebooks,
        isProcessing,
        $reset,
    };
});