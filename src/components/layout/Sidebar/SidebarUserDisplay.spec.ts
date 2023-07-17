import {describe, it, expect, vi} from "vitest";
import {mount} from "@vue/test-utils";
import SidebarUserDisplay from "@/components/layout/Sidebar/SidebarUserDisplay.vue";

vi.mock('firebase/auth');

vi.mock("@/composables/useAuthState", () => {
    return {
        useAuthState: () => {
            const user = {
                displayName: "Test user",
                email: "test@email.com",
            }
            return {user};
        }
    }
});

describe("SidebarUserDisplay", () => {
    it('renders user display name', () => {
        const wrapper = mount(SidebarUserDisplay);
        expect(wrapper.text()).toContain('Test user');
    });
    it('shows dropdown on click', async () => {
        const wrapper = mount(SidebarUserDisplay);
        expect(wrapper.html()).not.toContain('dropdown');
        await wrapper.find('.userDisplay').trigger('click');
        expect(wrapper.html()).toContain('dropdown');
    });
    it('should sign user out on sign out click', async () => {
        const wrapper = mount(SidebarUserDisplay);
        // @ts-ignore
        const signOut = vi.spyOn(wrapper.vm, 'handleSignOut');
        signOut.mockImplementationOnce(() => {});
        await wrapper.find('.userDisplay').trigger('click');
        await wrapper.find('.signOutBtn').trigger('click');
        expect(signOut).toHaveBeenCalledOnce();
    });
    it('closes dropdown on click again', async () => {
        const wrapper = mount(SidebarUserDisplay);
        await wrapper.find('.userDisplay').trigger('click');
        expect(wrapper.html()).toContain('dropdown');
        await wrapper.find('.userDisplay').trigger('click');
        expect(wrapper.html()).not.toContain('dropdown');
    });
    it('closes dropdown on click outside', async () => {
        const wrapper = mount(SidebarUserDisplay);
        await wrapper.find('.userDisplay').trigger('click');
        expect(wrapper.html()).toContain('dropdown');
        await document.body.click();
        expect(wrapper.html()).not.toContain('dropdown');
    });
});