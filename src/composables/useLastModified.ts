import {ref, watchEffect} from "vue";
import type {Ref} from "vue";

export const useLastModified = (lastModifiedValue: Ref<number>) => {
    const lastModifiedString = ref('');

    watchEffect(() => {
        const difference = Date.now() - lastModifiedValue.value;
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(weeks / 4);
        const years = Math.floor(months / 12);
        const array = [years, months, weeks, days, hours, minutes, seconds];
        const names = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];
        const index = array.findIndex((value) => value > 0);
        if (index === -1) {
            lastModifiedString.value = 'just now';
        }
        else {
            const number = array[index];
            const name = names[index];
            const plural = number > 1 ? 's' : '';
            lastModifiedString.value = `${number} ${name}${plural} ago`;
        }
    });
    return {lastModifiedString};
}