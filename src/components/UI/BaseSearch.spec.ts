import {beforeEach, describe, it, expect, vitest} from "vitest";
import BaseSearch from "@/components/UI/BaseSearch.vue";
import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {useNoteStore} from "@/stores/noteStore";
import {nextTick} from "vue";

describe("BaseSearch", () => {
    let wrapper = mount(BaseSearch, {
        global: {
            plugins: [createTestingPinia({
                createSpy: vitest.fn,
            })]
        }
    });
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(BaseSearch, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                })]
            }
        });
    });
    it('renders search bar', () => {
        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper.find('button').exists()).toBe(true);
    })
    it('should emit search event on input', async () => {
        await wrapper.find('input').setValue('test');
        expect(wrapper.emitted()).toHaveProperty('search');
    });
    it('should be empty when clear button is clicked', async () => {
        await wrapper.find('input').setValue('test');
        await wrapper.find('button').trigger('click');
        expect(wrapper.find('input').element.value).toBe('');
    });
    it('is empty when displaySearched from noteStore becomes false', async () => {
        await wrapper.find('input').setValue('test');
        const noteStore = useNoteStore();
        noteStore.displaySearched = true;
        await nextTick();
        noteStore.displaySearched = false;
        await nextTick();
        expect(wrapper.find('input').element.value).toBe('');
    })
});