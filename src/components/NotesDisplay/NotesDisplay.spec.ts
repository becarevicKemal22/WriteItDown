import NotesDisplay from "@/components/NotesDisplay/NotesDisplay.vue";
import {mount} from "@vue/test-utils";
import {describe, it, expect, beforeEach, vitest} from "vitest";
import {createTestingPinia} from "@pinia/testing";
import {useNoteStore} from "@/stores/noteStore";
import {useNotebookStore} from "@/stores/notebookStore";
import {nextTick} from "vue";
import type {Note} from "@/types/Note";

describe('NotesDisplay', function () {
    let wrapper = mount(NotesDisplay, {
        global: {
            plugins: [createTestingPinia({
                createSpy: vitest.fn,
            })],
        }
    });
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(NotesDisplay, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                })],
            }
        });
    });
    it('renders add note button', () => {
        expect(wrapper.html()).toContain('Add new note');
    });
    it('renders "Notes" title', () => {
        expect(wrapper.html()).toContain('Notes');
    });
    it('adds new note to state on add new note button click', async () => {
        const noteStore = useNoteStore();
        const addNoteButton = wrapper.find('.addNewNoteBtn');
        await addNoteButton.trigger('click');
        expect(noteStore.createNote).toHaveBeenCalledOnce();
    });
    it('makes a note selected on click', async () => {
        const notebookStore = useNotebookStore();
        const noteStore = useNoteStore();
        notebookStore.notebooks = [{id: "1", name: "Test notebook", ownerID: "1x"}];
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
        noteStore.notes = [note];
        await nextTick();
        await wrapper.find('.note').trigger('click');
        expect(noteStore.setSelectedNote).toHaveBeenCalledOnce();
        expect(noteStore.setSelectedNote).toHaveBeenCalledWith(note.id);
    });
});