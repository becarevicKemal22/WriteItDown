import { setActivePinia, createPinia } from "pinia";
import { useNotebookStore } from "@/stores/notebookStore";
import {describe, it, expect, beforeEach, vi} from "vitest";
import {useNoteStore} from "@/stores/noteStore";

vi.mock('firebase/auth');
vi.mock('firebase/firestore', () => {
    return {
        doc: () => {
            return {
                id: Math.random(),
            }
        },
        collection: () => {

        },
        setDoc: () => {

        },
        getFirestore: () => {

        },
        query: () => {

        },
        where: () => {

        },
        getDocs: () => {
            return [];
        },
        deleteDoc: () => {
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        },
        updateDoc: () => {
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        },
    }
});

vi.mock("@/composables/useAuthState", () => {
    return {
        useAuthState: () => {
            const user = {
                uid: "test",
                displayName: "Test user",
                email: "test@email.com",
            }
            const getUser = async () => {
                return new Promise((resolve) => {
                    resolve(user);
                });
            }
            return {user, getUser};
        }
    }
});

describe("notebookStore", () => {
    let notebookStore: any = null;
    beforeEach(() => {
        setActivePinia(createPinia());
        notebookStore = useNotebookStore();
    })
    it('should add notebook with id', async () => {
        await notebookStore.addNotebook("Test notebook");
        expect(notebookStore.notebooks.length).toBe(1);
        expect(notebookStore.notebooks[0].name).toBe("Test notebook");
        expect(notebookStore.notebooks[0].id).toBeDefined();
    });
    it('should make added notebook the selected one', async () => {
        await notebookStore.addNotebook("Test notebook");
        console.log(notebookStore.notebooks[0]);
        expect(notebookStore.selectedNotebook).toBe(notebookStore.notebooks[0].id);
    });
    it('updates selected notebook notes on new notebook', async () => {
        const noteSpy = vi.spyOn(useNoteStore(), 'fetchNotesForNotebook');
        await notebookStore.addNotebook("Test notebook");
        expect(noteSpy).toHaveBeenCalledOnce();
    });
    it('should update selected notebook notes on new and switch', async () => {
        const noteSpy = vi.spyOn(useNoteStore(), 'fetchNotesForNotebook');
        await notebookStore.addNotebook("Test notebook");
        await notebookStore.addNotebook("Test notebook 2");
        await notebookStore.setSelectedNotebook(notebookStore.notebooks[1].id);
        expect(noteSpy).toHaveBeenCalledTimes(3);
    });
    it('assigns owner id to notebook', async () => {
        await notebookStore.addNotebook("Test notebook");
        expect(notebookStore.notebooks[0].ownerID).toBeDefined();
    });
    it('deletes selected notebook', async () => {
        await notebookStore.addNotebook('Test notebook');
        await notebookStore.addNotebook('Test notebook 2');
        await notebookStore.setSelectedNotebook(notebookStore.notebooks[0].id);
        await notebookStore.deleteSelectedNotebook();
        expect(notebookStore.notebooks.length).toBe(1);
        expect(notebookStore.notebooks[0].id).toBe(notebookStore.notebooks[0].id);
    });
    it('changes notebook name', async () => {
        await notebookStore.addNotebook('Test notebook');
        await notebookStore.setSelectedNotebook(notebookStore.notebooks[0].id);
        await notebookStore.changeSelectedNotebookName('Test notebook 2');
        expect(notebookStore.notebooks[0].name).toBe('Test notebook 2');
    });
    it('unselects active note on notebook change', async () => {
        const noteSpy = vi.spyOn(useNoteStore(), 'unselectNote');
        await notebookStore.addNotebook('Test notebook');
        expect(noteSpy).toHaveBeenCalledOnce();
        await notebookStore.setSelectedNotebook(notebookStore.notebooks[0].id);
        expect(noteSpy).toHaveBeenCalledTimes(1); // once because the selected notebook is already selected
    });
});