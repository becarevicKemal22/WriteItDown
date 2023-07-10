import {describe, it, expect, beforeEach} from "vitest";
import {mount} from "@vue/test-utils";
import NotebookItemNewInput from "@/components/layout/Sidebar/NotebookItemNewInput.vue";
import {nextTick} from "vue";

describe("NotebookItemNewInput", () => {
    let wrapper = mount(NotebookItemNewInput);
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(NotebookItemNewInput);
    });
    it('should render empty input', () => {
        expect(wrapper.html()).toContain('input');
        expect(wrapper.html()).toContain('Enter notebook name');
        expect(wrapper.find('input').element.value).toBe('');
    });
    it('should emit addNotebook event on enter', async () => {
        await wrapper.find('input').setValue('Test notebook');
        await wrapper.find('input').trigger('keydown.enter');
        const emittedEvent = wrapper.emitted('addNotebook');
        expect(emittedEvent).toBeTruthy();
        if (emittedEvent) {
            expect(emittedEvent[0][0]).toBe('Test notebook');
        }
    });
    it('should not emit event when input is empty', async () => {
       await wrapper.find('input').setValue('  ');
         await wrapper.find('input').trigger('keydown.enter');
        expect(wrapper.emitted()).not.toHaveProperty('addNotebook');
    });
    it('should autofocus input on mount', () => {
        const tempWrapper = mount(NotebookItemNewInput, {
            attachTo: document.body,
        });
        expect(tempWrapper.find('input').element).toBe(document.activeElement);
        tempWrapper.unmount();
    });
    it('should emit fail on blur', async () => {
        await wrapper.find('input').setValue('Test notebook');
        await wrapper.find('input').trigger('blur');
        const emittedEvent = wrapper.emitted('fail');
        expect(emittedEvent).toBeTruthy();
    });
});