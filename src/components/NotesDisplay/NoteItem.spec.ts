import {beforeEach, describe, it, expect} from "vitest";
import NoteItem from "@/components/NotesDisplay/NoteItem.vue";
import {mount} from "@vue/test-utils";
import type {Note} from "@/types/Note";

describe('NoteItem', function () {
    const note: Note = {
        title: 'Test title',
        content: 'Test content',
        tags: ['Education', 'Important'],
        lastModified: Date.now(),
        favorite: false,
        id: '1',
        notebookId: '1',
        accessIDs: [],
    }
    let wrapper = mount(NoteItem,{
        props: {
            note,
            searchTerm: '',
        }
    });
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(NoteItem, {
            props: {
                note,
                searchTerm: '',
            }
        });
    })
    it('renders note title', () => {
        expect(wrapper.html()).toContain(note.title);
    });
    it('renders star', () => {
        expect(wrapper.find('.star').exists()).toBe(true);
    })
    it('renders yellow star if favorite', () => {
        const tempWrapper = mount(NoteItem, {
            props: {
                note: {
                    ...note,
                    favorite: true,
                },
                searchTerm: '',
            }
        })
        expect(tempWrapper.find('.star').classes()).toContain('text-primary-light');
    })
    it('renders note content', () => {
        expect(wrapper.html()).toContain(note.content);
    })
    //TODO: Fix test to work with future date format
    it.fails('renders when note was last updated', () => {
        expect(wrapper.html()).toContain('Modified ' + note.lastModified);
    });
    it.fails('renders tags', () => { // tags not yet implemented, so the tag section is commented out on NoteItem.vue
        expect(wrapper.html()).toContain(note.tags[0]);
        expect(wrapper.html()).toContain(note.tags[1]);
    })
    it('emits toggleFavorite event when star is clicked', async () => {
        await wrapper.find('.star').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('toggleFavorite');
    });
});