import {setActivePinia, createPinia} from "pinia";
import {describe, it, expect, beforeEach, vi} from "vitest";
import {useNoteStore} from "@/stores/noteStore";

vi.mock('firebase/auth');
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

vi.mock('firebase/firestore', () => {
    return {
        doc: () => {
            return {
                id: Math.random().toString(),
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
        updateDoc: vi.fn(),
        deleteDoc: vi.fn(),
    }
});


describe("noteStore", () => {
    let noteStore: any = null;
    beforeEach(() => {
        setActivePinia(createPinia());
        noteStore = useNoteStore();
    })
    it('creates new note with id', async () => {
        await noteStore.createNote('1');
        expect(noteStore.notes[0]?.id).toBeDefined();
    });
    it('makes new note the selected one', async () => {
        await noteStore.createNote('1');
        expect(noteStore.selectedNote).toBe(noteStore.notes[0]);
    });
    it('sets selected note', async () => {
        await noteStore.createNote('1');
        await noteStore.createNote('1');
        noteStore.setSelectedNote(noteStore.notes[0].id);
        expect(noteStore.selectedNote).toBe(noteStore.notes[0]);
    });
    it('updates selected notebook notes on new note added', async () => {
        await noteStore.createNote('1');
        expect(noteStore.notes.length).toBe(1);
        expect(noteStore.notes[0]).toEqual(noteStore.notes[0]);
    });
    it('sets selected note title', async () => {
        await noteStore.createNote('1');
        const newTitle = "New title";
        await noteStore.setSelectedNoteTitle(newTitle, false);
        expect(noteStore.selectedNote.title).toBe(newTitle);
    });
    it('changes note content on saveNoteContent call', async () => {
        await noteStore.createNote('1');
        noteStore.setInactivityRequiredForUpdate(100);
        const newContent = "New content";
        await noteStore.saveNoteContent(newContent, noteStore.notes[0].id);
        await new Promise(resolve => setTimeout(resolve, 150));
        expect(noteStore.notes[0].content).toBe(newContent);
    });
    it('runs change only once on multiple saveNoteContent calls inside of a second', async () => {
        await noteStore.createNote('1');
        noteStore.setInactivityRequiredForUpdate(10);
        let newContent = "New content";
        await noteStore.saveNoteContent(newContent, noteStore.notes[0].id);
        await new Promise(resolve => setTimeout(resolve, 5));
        newContent = "Newer content";
        await noteStore.saveNoteContent(newContent, noteStore.notes[0].id);
        await new Promise(resolve => setTimeout(resolve, 5));
        expect(noteStore.notes[0].content).not.toBe("New content");
        await new Promise(resolve => setTimeout(resolve, 5));
        expect(noteStore.notes[0].content).toBe(newContent);
    });
    it('deletes selected note', async () => {
        await noteStore.createNote('1');
        await noteStore.createNote('1');
        await noteStore.deleteSelectedNote();
        expect(noteStore.notes.length).toBe(1);
        expect(noteStore.selectedNote).toBe(noteStore.notes[0]);
    });
    it('doesnt contain selected note if there is no left', async () => {
        await noteStore.createNote('1');
        await noteStore.deleteSelectedNote();
        expect(noteStore.selectedNote).toBe(null);
    })
});