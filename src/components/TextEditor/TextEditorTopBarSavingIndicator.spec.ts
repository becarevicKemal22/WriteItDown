import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {describe, it, expect, vitest} from "vitest";
import TextEditorTopBarSavingIndicator from "@/components/TextEditor/TextEditorTopBarSavingIndicator.vue";

describe('TextEditorTopBarSavingIndicator', function () {
    it('renders saving text and updates on prop change', async () => {
        const wrapper = mount(TextEditorTopBarSavingIndicator, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                })],
            }
        });
        expect(wrapper.html()).toContain('Saved!');
        await wrapper.setProps({isSaving: true});
        expect(wrapper.html()).toContain('Saving note...');
    });
});