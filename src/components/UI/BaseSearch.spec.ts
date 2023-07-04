import {beforeEach, describe, it, expect} from "vitest";
import BaseSearch from "@/components/UI/BaseSearch.vue";
import {mount} from "@vue/test-utils";

describe("BaseSearch", () => {
    let wrapper = mount(BaseSearch);
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(BaseSearch);
    });
    it('renders search bar', () => {
        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper.find('button').exists()).toBe(true);
    })
    it('should emit search event on button click and not if empty', async () => {
        await wrapper.find('input').setValue('test');
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('search');
    });
    it('should not emit search event on click if input is empty', async () => {
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted()).not.toHaveProperty('search');
    });
    it('should not emit search event on enter if input is empty', async () => {
        await wrapper.find('input').trigger('keydown.enter');
        expect(wrapper.emitted()).not.toHaveProperty('search');
    });
    it('should emit search event on enter key press and not if empty', async () => {
        await wrapper.find('input').setValue('test');
        await wrapper.find('input').trigger('keydown.enter');
        expect(wrapper.emitted()).toHaveProperty('search');
    });
});