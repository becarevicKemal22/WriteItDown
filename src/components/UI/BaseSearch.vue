<script lang="ts" setup>
import {ref} from "vue";

const emit = defineEmits<{
    (e: 'search', value: string): void
}>();

const elInput = ref<HTMLInputElement | null>(null);

const searchNotes = () => {
    const val = elInput.value?.value;
    if (val) {
        emit('search', val);
        (elInput.value as HTMLInputElement).value = '';
    }
}
</script>

<template>
    <div class="flex gap-2">
        <label class="w-0 h-0 hidden" for="search">Search notes</label>
        <input id="search"
               ref="elInput"
               class="appearance-none rounded-md p-1 text-sm text-body text-gray-700 border-2 border-gray-300 transition-colors focus:outline-0 focus:border-primary"
               placeholder="Search your notes..."
               type="text"
               @keydown.enter="searchNotes">
        <button class="bg-primary hover:bg-primary-light transition-colors p-2 rounded-lg"
                @click="searchNotes">
            <svg class="w-5 h-5 text-white"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2">
                </path>
            </svg>
        </button>
    </div>
</template>