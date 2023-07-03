import {describe, it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import MainSidebar from "@/components/layout/Sidebar/MainSidebar.vue";

describe("MainSidebar", () => {
    it('should render correctly', () => {
        const wrapper = mount(MainSidebar);

        expect(wrapper.html()).toContain('Notebooks');
        expect(wrapper.html()).toContain('Tags');
    });

    it.todo('should render NotebookItems correctly'); // TODO: Implement when Pinia is set up with events
    it.todo('should render TagItems correctly'); // TODO: Implement when Pinia is set up with events
    it.todo('test responsivness and mobile');
    it.todo('adds item on click');
});