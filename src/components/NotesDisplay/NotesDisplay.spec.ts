import NotesDisplay from "@/components/NotesDisplay/NotesDisplay.vue";
import {mount} from "@vue/test-utils";
import {describe, it, expect, beforeEach} from "vitest";

describe('NotesDisplay', function () {
    let wrapper = mount(NotesDisplay);
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(NotesDisplay);
    })
    it('renders add note button', () => {
        expect(wrapper.html()).toContain('Add new note');
    });
    it('renders "Note" title', () => {
        expect(wrapper.html()).toContain('Notes');
    });

});