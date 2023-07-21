import {describe, vitest, it, expect, beforeEach, afterEach} from "vitest";
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {useNoteStore} from "@/stores/noteStore";
import TextEditorTopBar from "@/components/TextEditor/TextEditorTopBar.vue";
import {nextTick} from "vue";
import BaseModal from "@/components/UI/BaseModal.vue";

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
        const el = document.createElement('div')
        el.id = 'app'
        document.body.appendChild(el)

        wrapper = mount(TextEditorTopBar, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                })],
            }
        });
    });
    afterEach(() => {
        document.body.outerHTML = '';
    });
    it('displays correct message depending on note save status', async () => {
        const noteStore = useNoteStore();

        expect(wrapper.html()).toContain('Saved!');
        noteStore.isSaving = true;
        await nextTick();

        expect(wrapper.html()).toContain('Saving note...');
    });
    it('displays modal when delete button is clicked', async () => {
        const deleteButton = wrapper.find('.deleteBtn');

        await deleteButton.trigger('click');
        const modal = wrapper.getComponent(BaseModal);
        expect(modal).toBeDefined();
    });
    it('deletes note when modal is confirmed', async () => {
        const noteStore = useNoteStore();
        const deleteButton = wrapper.find('.deleteBtn');

        await deleteButton.trigger('click');
        const modal = wrapper.getComponent(BaseModal);
        await modal.vm.$emit('primaryAction');

        expect(noteStore.deleteSelectedNote).toHaveBeenCalled();
    });
    it('favorites note when favorite button is clicked', async () => {
        const noteStore = useNoteStore();
        const favoriteButton = wrapper.find('.makeFavoriteBtn');

        await favoriteButton.trigger('click');

        expect(noteStore.toggleSelectedNoteFavorite).toHaveBeenCalled();
    });
});