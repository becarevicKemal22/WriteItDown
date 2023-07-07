import BaseButton from "@/components/UI/BaseButton.vue";
import {mount} from "@vue/test-utils";
import {describe, it, expect} from "vitest";

describe('BaseButton', function () {
    it('renders slot correctly', function () {
        const wrapper = mount(BaseButton, {
            slots: {
                default: 'Test',
            }
        });
        expect(wrapper.html()).toContain('Test');
    });
});