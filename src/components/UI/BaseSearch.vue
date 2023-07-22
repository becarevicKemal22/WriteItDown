<script lang="ts" setup>
import {ref, watch} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useNoteStore} from "@/stores/noteStore";

const emit = defineEmits<{
    (e: 'search', value: string): void
}>();

const elInput = ref<HTMLInputElement | null>(null);

const searchNotes = () => {
    const val = elInput.value?.value;
    if (val || val.length === 0) {
        emit('search', val);
    }
}

const resetSearch = () => {
    (elInput.value as HTMLInputElement).value = '';
    searchNotes();
}

const noteStore = useNoteStore();
watch(() => noteStore.displaySearched, () => {
    if(noteStore.displaySearched === false){
        (elInput.value as HTMLInputElement).value = '';
    }
})
</script>

<template>
    <div class="flex gap-2 relative">
        <label class="w-0 h-0 hidden" for="search">Search notes</label>
        <input id="search"
               ref="elInput"
               class="appearance-none rounded-md p-1 text-sm text-body text-gray-700 border-2 border-gray-300 transition-colors focus:outline-0 focus:border-primary w-full"
               placeholder="Search your notes..."
               type="text"
               @input="searchNotes">
        <button
            class="text-gray-500 p-1 absolute right-2 top-1/2 -translate-y-1/2"
            @click="resetSearch"
        >
            <font-awesome-icon :icon="['fas', 'x']" size="xs"/>
        </button>
    </div>
</template>