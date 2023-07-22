import {describe, it, expect} from "vitest";
import {useLastModified} from "@/composables/useLastModified";
import {nextTick, ref} from "vue";


describe('useLastModified', () => {
    it('returns just now if last modified is now', () => {
        const lastModifiedValue = ref(Date.now());
        const {lastModifiedString} = useLastModified(lastModifiedValue);
        expect(lastModifiedString.value).toBe('just now');
    });
    it('should return x seconds ago', async () => {
        const lastModifiedValue = ref(Date.now() - 1000);
        const {lastModifiedString} = useLastModified(lastModifiedValue);
        expect(lastModifiedString.value).toBe('1 second ago');
        lastModifiedValue.value = Date.now() - 2000;
        await nextTick();
        expect(lastModifiedString.value).toBe('2 seconds ago');
    });
    it('should return x minutes ago', async () => {
        const lastModifiedValue = ref(Date.now() - 60000);
        const {lastModifiedString} = useLastModified(lastModifiedValue);
        expect(lastModifiedString.value).toBe('1 minute ago');
        lastModifiedValue.value = Date.now() - 120000;
        await nextTick();
        expect(lastModifiedString.value).toBe('2 minutes ago');
    });
    it('should return x hours ago', async () => {
        const lastModifiedValue = ref(Date.now() - 3600000);
        const {lastModifiedString} = useLastModified(lastModifiedValue);
        expect(lastModifiedString.value).toBe('1 hour ago');
        lastModifiedValue.value = Date.now() - 3600000 * 2;
        await nextTick();
        expect(lastModifiedString.value).toBe('2 hours ago');
    });
    it('should return x days ago', async () => {
        const lastModifiedValue = ref(Date.now() - 86400000);
        const {lastModifiedString} = useLastModified(lastModifiedValue);
        expect(lastModifiedString.value).toBe('1 day ago');
        lastModifiedValue.value = Date.now() - 86400000 * 2;
        await nextTick();
        expect(lastModifiedString.value).toBe('2 days ago');
    });
    it('should return x weeks ago', async () => {
        const lastModifiedValue = ref(Date.now() - 604800000);
        const {lastModifiedString} = useLastModified(lastModifiedValue);
        expect(lastModifiedString.value).toBe('1 week ago');
        lastModifiedValue.value = Date.now() - 604800000 * 2;
        await nextTick();
        expect(lastModifiedString.value).toBe('2 weeks ago');
    });
    it('should return x months ago', async () => {
        const lastModifiedValue = ref(Date.now() - 2419200000);
        const {lastModifiedString} = useLastModified(lastModifiedValue);
        expect(lastModifiedString.value).toBe('1 month ago');
        lastModifiedValue.value = Date.now() - 2419200000 * 2;
        await nextTick();
        expect(lastModifiedString.value).toBe('2 months ago');
    });
    it('should return x years ago', async () => {
        const lastModifiedValue = ref(Date.now() - 29030400000);
        const {lastModifiedString} = useLastModified(lastModifiedValue);
        expect(lastModifiedString.value).toBe('1 year ago');
        lastModifiedValue.value = Date.now() - 29030400000 * 2;
        await nextTick();
        expect(lastModifiedString.value).toBe('2 years ago');
    });
});