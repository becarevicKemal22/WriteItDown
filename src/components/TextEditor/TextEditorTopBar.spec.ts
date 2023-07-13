import {describe, vitest, it, expect, beforeEach} from "vitest";
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {useNoteStore} from "@/stores/noteStore";
import TextEditorTopBar from "@/components/TextEditor/TextEditorTopBar.vue";
import {nextTick} from "vue";

describe('TextEditorTopBar', () => {
    let wrapper = mount(TextEditorTopBar, {
        global: {
            plugins: [createTestingPinia({
                createSpy: vitest.fn,
            })],
        }
    });
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(TextEditorTopBar, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                })],
            }
        });
    });
    it('displays correct message depending on note save status', async () => {
        const noteStore = useNoteStore();

        expect(wrapper.html()).toContain('Saved!');
        noteStore.isSaving = true;
        await nextTick();

        expect(wrapper.html()).toContain('Saving note...');
    });
});