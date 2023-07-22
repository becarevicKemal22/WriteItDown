<script lang="ts" setup>

import BaseCard from "@/components/UI/BaseCard.vue";
import BaseTag from "@/components/UI/BaseTag.vue";
import {Note} from "@/types/Note";
import {computed, toRef, watch} from "vue";
import {useLastModified} from "@/composables/useLastModified";
import {useHighlightText} from "@/composables/useHighlightText";

const emit = defineEmits<{
    (e: 'toggleFavorite'): void,
    (e: 'makeSelected', id: string): void,
}>();

interface Props {
    note: Note,
    searchTerm: string,
}

const props = defineProps<Props>();

const emitMakeSelected = () => {
    emit('makeSelected', props.note.id);
}

const lastModifiedRef = toRef(props.note, 'lastModified');
const {lastModifiedString} = useLastModified(lastModifiedRef);

const noteContentPreview = computed(() => {
    const parser = new DOMParser();
    const document = parser.parseFromString(props.note.content, 'text/html');
    return document.querySelector(':first-child').textContent;
});

const {highlightedTextHTML} = useHighlightText(toRef(() => props.note.title), toRef(() => props.searchTerm), 'bg-primary-light text-white');

</script>

<template>
    <BaseCard class="cursor-pointer note" @click="emitMakeSelected">
        <div class="flex max-w-full flex-col gap-2">
            <div class="flex justify-between items-center">
                <h4 class="font-title text-lg line-clamp-1 -mb-0.5 text-gray-600">
                    <span v-html="highlightedTextHTML"></span>
                </h4>
                <font-awesome-icon :class="{'text-yellow-400': note.favorite, 'text-gray-300': !note.favorite}"
                                   :icon="['fas', 'star']"
                                   class="star"
                                   @click="$emit('toggleFavorite')"
                />
            </div>
            <p class="font-body text-sm text-gray-500 line-clamp-1">{{ noteContentPreview }}</p>
            <p class="font-body text-tiny text-gray-400 line-clamp-1">
                <font-awesome-icon :icon="['far', 'clock']"
                                   class="mr-1"
                />
                Modified {{ lastModifiedString }}
            </p>
            <div class="flex gap-1 flex-wrap">
                <BaseTag v-for="tag in note.tags"
                         :key="tag">
                    {{ tag }}
                </BaseTag>
            </div>
        </div>
    </BaseCard>
</template>

<style scoped>

</style>