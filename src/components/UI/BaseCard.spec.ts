import BaseCard from "@/components/UI/BaseCard.vue";
import {mount} from "@vue/test-utils";
import {describe, it, expect} from "vitest";

describe('BaseCard', function () {
    it('renders slot correctly', function () {
        const wrapper = mount(BaseCard, {
            slots: {
                default: 'Test',
            }
        });
        expect(wrapper.html()).toContain('Test');
    });
});