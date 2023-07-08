import {describe, it, expect, beforeEach, vitest} from "vitest";
import {mount} from "@vue/test-utils";
import MainSidebar from "@/components/layout/Sidebar/MainSidebar.vue";
import {createTestingPinia} from "@pinia/testing";
import {useNotebookStore} from "@/stores/notebookStore";

describe("MainSidebar", () => {
    let wrapper = mount(MainSidebar, {
        global: {
            plugins: [createTestingPinia({
                createSpy: vitest.fn,
            })],
        }
    });
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(MainSidebar, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn,
                })],
            }
        });
    });
    it('should render correctly', () => {
        const wrapper = mount(MainSidebar);

        expect(wrapper.html()).toContain('Notebooks');
        expect(wrapper.html()).toContain('Tags');
    });

    it('should add input element on add notebook + button click', async () => {
        expect(wrapper.html()).not.toContain('newNotebookInput');
        await wrapper.find('.addNotebookBtn').trigger('click');
        expect(wrapper.html()).toContain('newNotebookInput');
    })

    it('should save notebook to state when input is filled and enter clicked', async () => {
        const notebookStore = useNotebookStore();
        await wrapper.find('.addNotebookBtn').trigger('click');
        await wrapper.find('.newNotebookInput').setValue('Test notebook');
        await wrapper.find('.newNotebookInput').trigger('keydown.enter');
        expect(wrapper.html()).not.toContain('newNotebookInput');
        expect(notebookStore.addNotebook).toHaveBeenCalledOnce();
    });

    it.todo('should render TagItems correctly'); // TODO: Implement when Pinia is set up with events
    it.todo('test responsivness and mobile');
    it.todo('adds item on click');
});