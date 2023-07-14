import {describe, expect, it} from "vitest";
import BaseUserAvatar from "@/components/UI/BaseUserAvatar.vue";
import {mount} from "@vue/test-utils";


describe("BaseUserAvatar", () => {
    it('contains user initials in image url', () => {
        const props = {
            userName: "Test user",
        }
        const wrapper = mount(BaseUserAvatar, {props});
        console.log(wrapper.html());

        expect(wrapper.html()).toContain('TU');
    });
    it('still contains image if userName is undefined', () => {
        const props = {
            userName: undefined,
        }
        const wrapper = mount(BaseUserAvatar, {props});
        expect(wrapper.find('img').exists()).toBe(true);
    })
});