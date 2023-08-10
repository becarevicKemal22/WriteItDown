import {describe, it, expect} from "vitest";
import NotebookItem from "@/components/layout/Sidebar/NotebookItem.vue";
import {mount} from "@vue/test-utils";

describe("NotebookItem", () => {
    it('should render correctly', () => {
        const notebookName = 'Test';
        const wrapper = mount(NotebookItem, {
            slots: {
                default: 'Test',
            }
        })

        expect(wrapper.html()).toContain(notebookName);
    });
    it('should contain correct class if active', () => {
        const notebookName = 'Test';
        const activeClass = 'bg-gray-300';
        const wrapper = mount(NotebookItem, {
            props: {
                id: 'x',
                active: true,
            },
            slots: {
                default: notebookName,
            }
        });

        expect(wrapper.classes()).toContain(activeClass);
    })

    it.todo('should become active if clicked'); // TODO: Implement when Pinia is set up with events
});