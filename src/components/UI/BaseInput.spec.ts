import {describe, it, expect} from "vitest";
import BaseInput from "@/components/UI/BaseInput.vue";
import {mount} from "@vue/test-utils";
import {nextTick} from "vue";

describe("BaseInput", () => {
    it('has working v-model binding', async () => {
        const wrapper = mount(BaseInput, {
            props: {
                modelValue: 'initialText',
                'onUpdate:modelValue': (e: string) => wrapper.setProps({modelValue: e}),
            }
        });

        await wrapper.find('input').setValue('Test');
        expect(wrapper.props('modelValue')).toBe('Test');
    });
    it('sets input name to props.name', () => {
        const wrapper = mount(BaseInput, {
            props: {
                name: 'testName',
            }
        });
        expect(wrapper.find('input').html()).toContain('name="testName"');
    });
    it('sets the placeholder to props.placeholder', () => {
        const wrapper = mount(BaseInput, {
            props: {
                placeholder: 'testPlaceholder',
            }
        });
        expect(wrapper.find('input').html()).toContain('placeholder="testPlaceholder"');
    });
});