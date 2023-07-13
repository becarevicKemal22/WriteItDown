import {describe, it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import BaseEditorModifier from "@/components/TextEditor/BaseEditorModifier.vue";

describe("BaseEditorModifier", () => {
    it('should display slot content correctly', () => {
        const wrapper = mount(BaseEditorModifier, {
            slots: {
                default: "Test",
            }
        })
        expect(wrapper.html()).toContain("Test");
    });
    it('should have active class when isActive prop is true', () => {
        const wrapper = mount(BaseEditorModifier, {
            props: {
                isActive: true,
            }
        })
        expect(wrapper.classes()).toContain("active");
    });
    it('should not have active class when isActive prop is false', () => {
        const wrapper = mount(BaseEditorModifier, {
            props: {
                isActive: false,
            }
        })
        expect(wrapper.classes()).not.toContain("active");
    });
    it('should have disabled class when disabled prop is true', () => {
        const wrapper = mount(BaseEditorModifier, {
            props: {
                disabled: true,
            }
        })
        expect(wrapper.html()).toContain("disabled");
    });
    it('should not have disabled class when disabled prop is false', () => {
        const wrapper = mount(BaseEditorModifier, {
            props: {
                disabled: false,
            }
        })
        expect(wrapper.html()).not.toContain("disabled");
    });
});