import {describe, it, expect, beforeEach, vitest} from "vitest";
import TextEditorWYSIWYGEditor from "@/components/TextEditor/TextEditorWYSIWYGEditor.vue";
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {useNoteStore} from "@/stores/noteStore";
import type {Note} from "@/types/Note";
import {nextTick} from "vue";

const note: Note = {
    id: "1",
    title: "Test note",
    content: "<p>Test content</p>",
    notebookId: "1",
    lastModified: Date.now(),
    tags: [],
    favorite: false,
    accessIDs: [],
}

describe("TextEditorWYSIWYGEditor", () => {
    let wrapper = mount(TextEditorWYSIWYGEditor, {
        global: {
            plugins: [createTestingPinia({
                createSpy: vitest.fn,
                initialState: {
                    'note': {
                        selectedNote: note,
                    }
                }
            })],
        }
    })
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(TextEditorWYSIWYGEditor, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                    initialState: {
                        'note': {
                            selectedNote: note,
                        }
                    }
                })],
            }
        });
    })
    it('renders note content', async () => {
        expect(wrapper.html()).toContain(note.content);
    });
    it('renders placeholder when note content is empty', async () => {
        const newNote: Note = {
            ...note,
            id: "new",
            content: "",
        }
        const noteStore = useNoteStore();
        noteStore.selectedNote = newNote;
        await nextTick();
        console.log(wrapper.html());
        expect(wrapper.html()).toContain("Start writing here...");
    });
});