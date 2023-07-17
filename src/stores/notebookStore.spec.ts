import { setActivePinia, createPinia } from "pinia";
import { useNotebookStore } from "@/stores/notebookStore";
import {describe, it, expect, beforeEach, vi} from "vitest";
import {useNoteStore} from "@/stores/noteStore";

vi.mock('firebase/auth');
vi.mock('firebase/firestore', () => {
    return {
        doc: () => {
            return {
                id: "test"
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
        }
    }
});

// vi.mock('@/stores/noteStore', () => {
//     return {
//         useNoteStore: () => {
//             const fetchNotesForNotebook = () => {
//                 return new Promise((resolve, reject) => {
//                     console.log("EVO GA DJECEMI");
//                     resolve(true);
//
//                 });
//             }
//         }
//     }
// });

vi.mock("@/composables/useAuthState", () => {
    return {
        useAuthState: () => {
            const user = {
                uid: "test",
                displayName: "Test user",
                email: "test@email.com",
            }
            const getUser = async () => {
                return new Promise((resolve, reject) => {
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
        await notebookStore.setSelectedNotebook(notebookStore.notebooks[0].id);
        expect(noteSpy).toHaveBeenCalledTimes(3);
    });
    it('assigns owner id to notebook', async () => {
        await notebookStore.addNotebook("Test notebook");
        expect(notebookStore.notebooks[0].ownerID).toBeDefined();
    });

});