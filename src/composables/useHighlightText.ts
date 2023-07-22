import {ref, watchEffect} from "vue";
import type {Ref} from "vue";

const findIndexAndLength = (text: string, term: string) => {
    const index = text.toLowerCase().indexOf(term.toLowerCase());
    const length = term.length;
    return {index, length};
}

export const useHighlightText = (text: Ref<string>, term: Ref<string>, highlightClasses: string) => {
    const highlightedTextHTML = ref('');
    watchEffect(() => {
        const {index, length} = findIndexAndLength(text.value, term.value);
        if (index === -1) {
            highlightedTextHTML.value = text.value;
        }
        else {
            const highlightedText = text.value.substr(index, length);
            const beforeText = text.value.substr(0, index);
            const afterText = text.value.substr(index + length);
            highlightedTextHTML.value = `${beforeText}<span class="${highlightClasses}">${highlightedText}</span>${afterText}`;
        }
    });
    return {highlightedTextHTML};
}