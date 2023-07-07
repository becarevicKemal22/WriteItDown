import {beforeEach, describe, it, expect} from "vitest";
import NoteItem from "@/components/NotesDisplay/NoteItem.vue";
import {mount} from "@vue/test-utils";

describe('NoteItem', function () {
    const note = {
        title: 'Test title',
        content: 'Test content',
        tags: ['Education', 'Important'],
        lastUpdate: '2 hours ago',
    }
    let wrapper = mount(NoteItem,{
        props: {
            note,
        }
    });
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(NoteItem, {
            props: {
                note,
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
                }
            }
        })
        expect(tempWrapper.find('.star').classes()).toContain('text-yellow-400');
    })
    it('renders note content', () => {
        expect(wrapper.html()).toContain(note.content);
    })
    it('renders when note was last updated', () => {
        expect(wrapper.html()).toContain('Modified ' + note.lastUpdate);
    });
    it('renders tags', () => {
        expect(wrapper.html()).toContain(note.tags[0]);
        expect(wrapper.html()).toContain(note.tags[1]);
    })
    it('emits toggleFavorite event when star is clicked', async () => {
        await wrapper.find('.star').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('toggleFavorite');
    });
});