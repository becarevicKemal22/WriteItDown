import {describe, vitest, it, expect, beforeEach} from "vitest";
import {createTestingPinia} from "@pinia/testing";
import {mount} from "@vue/test-utils";
import TextEditor from "@/components/TextEditor/TextEditor.vue";
import {useNoteStore} from "@/stores/noteStore";
import {nextTick} from "vue";

describe('TextEditor', () => {
    let wrapper = mount(TextEditor, {
        global: {
            plugins: [createTestingPinia({
                createSpy: vitest.fn,
            })],
        }
    });
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(TextEditor, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                })],
            }
        });
    })
    it('should not have any content if there is no note selected', () => {
        expect(wrapper.html()).toBe('<!--v-if-->');
    })
    it('displays title of selected note', async () => {
        const noteStore = useNoteStore();
        noteStore.selectedNote = {
            id: "1",
            title: "Test note",
            content: "Test note content",
            notebookId: "1",
            lastModified: Date.now(),
            favorite: false,
            tags: [],
            accessIDs: [],
        };
        await nextTick();
        expect(wrapper.html()).toContain(noteStore.selectedNote.title);
    });
});