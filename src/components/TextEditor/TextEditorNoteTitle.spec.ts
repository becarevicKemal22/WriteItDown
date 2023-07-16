import {beforeEach, describe, it, expect, vitest} from "vitest";
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import TextEditorNoteTitle from "@/components/TextEditor/TextEditorNoteTitle.vue";
import {useNoteStore} from "@/stores/noteStore";
import type {Note} from "@/types/Note";
import {nextTick} from "vue";

const note: Note = {
    id: "1",
    title: "Test note",
    content: "Test note content",
    notebookId: "1",
    lastModified: Date.now(),
    favorite: false,
    tags: [],
    accessIDs: [],
}

describe("TextEditorNoteTitle", () => {
    let wrapper = mount(TextEditorNoteTitle, {
        global: {
            plugins: [createTestingPinia({
                createSpy: vitest.fn,
            })],
        }
    });
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(TextEditorNoteTitle, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                    initialState: {
                        note: {
                            notes: [note],
                            selectedNote: note,
                        },

                    }
                })],
            }
        });
    });
    it('displays note title from state', () => {
        expect(wrapper.find("input").element.value).toBe(note.title)
    })
    it('updates note title in state when input is changed and additionally saves to DB on enter', async () => {
        const noteStore = useNoteStore();
        await wrapper.find("input").setValue("New title");
        expect(noteStore.setSelectedNoteTitle).toHaveBeenCalled();
        expect(noteStore.setSelectedNoteTitle).toHaveBeenCalledWith("New title", false);
        expect(wrapper.find("input").element.value).toBe("New title");
        await wrapper.find("input").trigger("keydown.enter");
        expect(noteStore.setSelectedNoteTitle).toHaveBeenCalledWith("New title", true);
    })
    it('is updated when selected note is changed', async () => {
        const noteStore = useNoteStore();
        const newNote: Note = {
            id: "2",
            title: "New note",
            content: "New note content",
            notebookId: "1",
            lastModified: Date.now(),
            favorite: false,
            tags: [],
            accessIDs: [],
        }
        noteStore.selectedNote = newNote;
        await nextTick();
        expect(wrapper.find("input").element.value).toBe(newNote.title);
    });
    it('blurs input on enter', async () => {
        await wrapper.find("input").trigger("keydown.enter");
        expect(wrapper.find("input").element).not.toBe(document.activeElement);
    });
});