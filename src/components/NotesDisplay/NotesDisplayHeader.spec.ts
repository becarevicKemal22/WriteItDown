import {describe, expect, it, beforeEach, vitest, afterEach} from "vitest";
import {useNotebookStore} from "@/stores/notebookStore";
import {nextTick} from "vue";
import {createTestingPinia} from "@pinia/testing";
import {mount} from "@vue/test-utils";
import NotesDisplayHeader from "@/components/NotesDisplay/NotesDisplayHeader.vue";
import BaseModal from "@/components/UI/BaseModal.vue";

describe('NotesDisplayHeader', () => {
    let wrapper = mount(NotesDisplayHeader, {
        global: {
            plugins: [createTestingPinia({
                createSpy: vitest.fn,
            })],
        },
    });
    let notebookStore = useNotebookStore();
    beforeEach(() => {
        wrapper.unmount();
        const el = document.createElement('div')
        el.id = 'app'
        document.body.appendChild(el)
        wrapper = mount(NotesDisplayHeader, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                })],
            },
        });
        notebookStore = useNotebookStore();
        notebookStore.notebooks = [{id: "1", name: "Test notebook", ownerID: "1x"}];
        notebookStore.selectedNotebook = "1";
        notebookStore.selectedNotebookName = "Test notebook";
    });
    afterEach(() => {
        document.body.outerHTML = '';
    });
    it('renders selected notebook name', async () => {
        const notebookStore = useNotebookStore();
        notebookStore.selectedNotebookName = "First notebook";
        await nextTick();
        expect(wrapper.html()).toContain('First notebook');
        notebookStore.selectedNotebookName = "Second notebook";
        await nextTick();
        expect(wrapper.html()).toContain('Second notebook');
    });
    it('renders notebook delete notebook button', async () => {
        expect(wrapper.find('.deleteNotebookBtn').exists()).toBe(true);
    });
    it('displays modal when delete button is clicked', async () => {
        notebookStore.notebooks = [{id: "1", name: "Test notebook", ownerID: "1x"}, {id: "2", name: "Test notebook 2", ownerID: "1x"}];
        const deleteButton = wrapper.find('.deleteNotebookBtn');
        await deleteButton.trigger('click');
        const modal = wrapper.getComponent(BaseModal);
        expect(modal).toBeDefined();
    });
    it('deletes notebook when modal is confirmed', async () => {
        notebookStore.notebooks = [{id: "1", name: "Test notebook", ownerID: "1x"}, {id: "2", name: "Test notebook 2", ownerID: "1x"}];
        const deleteButton = wrapper.find('.deleteNotebookBtn');
        await deleteButton.trigger('click');
        const modal = wrapper.getComponent(BaseModal);
        await modal.vm.$emit('primaryAction');
        expect(notebookStore.deleteSelectedNotebook).toHaveBeenCalled();
    });
    it('shows error modal if there is only one notebook', async () => {
        notebookStore.notebooks = [{id: "1", name: "Test notebook", ownerID: "1x"}];
        const deleteButton = wrapper.find('.deleteNotebookBtn');
        await deleteButton.trigger('click');
        const modal = wrapper.getComponent(BaseModal);
        expect(modal).toBeDefined();
    });
});
