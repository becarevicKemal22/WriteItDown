import {describe, it, expect} from "vitest";
import TextEditorWYSIWYGTopBarSection from "@/components/TextEditor/TextEditorWYSIWYGTopBarSection.vue";
import {mount} from "@vue/test-utils";

describe("TextEditorWYSIWYGTopBarSection", () => {
    it("should render slot content", () => {
        const wrapper = mount(TextEditorWYSIWYGTopBarSection, {
            slots: {
                default: "Test",
            }
        })
        expect(wrapper.html()).toContain("Test");
    });
});