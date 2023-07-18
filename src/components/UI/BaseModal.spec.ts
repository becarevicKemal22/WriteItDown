import {describe, it, expect, beforeEach} from "vitest";
import {mount} from "@vue/test-utils";
import BaseModal from "@/components/UI/BaseModal.vue";
import {nextTick} from "vue";

describe('BaseModal', () => {
    let wrapper = mount(BaseModal, {
        props: {
            disableTeleport: true,
        }
    });
    beforeEach(() => {
        wrapper.unmount();
        wrapper = mount(BaseModal, {
            slots: {
                title: 'Test title',
                default: 'Test content',
            },
            props: {
                disableTeleport: true,
            }
        });
    });
    it('displays title passed as slot', () => {
        expect(wrapper.html()).toContain('Test title');
    });
    it('emits close event when x button next to title is clicked', () => {
        wrapper.find('.closeBtn').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('close');
    });
    it('displays content passed as default slot', () => {
        expect(wrapper.html()).toContain('Test content');
    });
    it('displays a div with class modalBackdrop', () => {
        expect(wrapper.html()).toContain('modalBackdrop');
    })
    it('emits close event when backdrop is clicked', () => {
        wrapper.find('.modalBackdrop').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('close');
    });
    it('renders primary action button if primaryAction prop is passed', async () => {
        await wrapper.setProps({
            disableTeleport: true,
            primaryActionText: 'Test primary action',
        });
        expect(wrapper.html()).toContain('Test primary action');
    });
    it('emits primaryAction event when primary action button is clicked', async () => {
        await wrapper.setProps({
            disableTeleport: true,
            primaryActionText: 'Test primary action',
        });
        await wrapper.find('.primaryAction').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('primaryAction');
    });
    it('renders secondary action button if secondaryAction prop is passed', async () => {
        await wrapper.setProps({
            disableTeleport: true,
            secondaryActionText: 'Test secondary action',
        });
        expect(wrapper.html()).toContain('Test secondary action');
    });
    it('emits secondaryAction event when secondary action button is clicked', async () => {
        await wrapper.setProps({
            disableTeleport: true,
            secondaryActionText: 'Test secondary action',
        });
        await wrapper.find('.secondaryAction').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('secondaryAction');
    });
    it('renders a spinner if pending props is true', async () => {
        await wrapper.setProps({
            disableTeleport: true,
            pending: true,
        });

        expect(wrapper.html()).toContain('spinner');
    })
});