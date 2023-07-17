import {describe, expect, it} from "vitest";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import {mount} from "@vue/test-utils";


describe("BaseSpinner", () => {
    it('contains correct with and height based on size prop', () => {
        const wrapper = mount(BaseSpinner, {
            props: {
                size: 100,
            }
        });
        expect(wrapper.find('svg').attributes().width).toBe('100');
        expect(wrapper.find('svg').attributes().height).toBe('100');
    });
    it('has default size of 10', () => {
        const wrapper = mount(BaseSpinner);
        expect(wrapper.find('svg').attributes().width).toBe('10');
        expect(wrapper.find('svg').attributes().height).toBe('10');
    })
    it('has primary color stroke by default', () => {
        const wrapper = mount(BaseSpinner);
        expect(wrapper.find('circle').html()).toContain('#5F55D2');
    });
    it('has correct stroke color based on color prop', () => {
        const wrapper = mount(BaseSpinner, {
            props: {
                color: 'white',
            }
        });
        expect(wrapper.find('circle').html()).toContain('#ffffff');
    });
});