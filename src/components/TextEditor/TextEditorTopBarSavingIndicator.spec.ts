import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {describe, it, expect, vitest} from "vitest";
import TextEditorTopBarSavingIndicator from "@/components/TextEditor/TextEditorTopBarSavingIndicator.vue";
import {useNoteStore} from "@/stores/noteStore";
import {nextTick} from "vue";

describe('TextEditorTopBarSavingIndicator', function () {
    it('renders correct text', async () => {
        const wrapper = mount(TextEditorTopBarSavingIndicator, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                })],
            }
        });
        const noteStore = useNoteStore();
        noteStore.hasBeenModifiedSinceLastSave = false;
        noteStore.isSaving = false;
        await nextTick();
        expect(wrapper.html()).toContain('Saved!');
        noteStore.isSaving = true;
        await nextTick();
        expect(wrapper.html()).toContain('Saving note...');
        noteStore.hasBeenModifiedSinceLastSave = true;
        await nextTick();
        expect(wrapper.html()).toContain('Saving note...');
        noteStore.isSaving = false;
        await nextTick();
        expect(wrapper.html()).toContain('Note not saved');
    });
});