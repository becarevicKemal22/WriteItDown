<script lang="ts" setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BaseSearch from "@/components/UI/BaseSearch.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import NoteItem from "@/components/NotesDisplay/NoteItem.vue";
import {useNoteStore} from "@/stores/noteStore";
import {Note} from "@/types/Note";
import {computed, watch} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";
import NoteItemSkeleton from "@/components/NotesDisplay/NoteItemSkeleton.vue";

const noteStore = useNoteStore();

const notes = computed(() => noteStore.notes);

const notebookStore = useNotebookStore();
const selectedNotebookName = computed(() => notebookStore.selectedNotebookName);
const isLoaded = computed(() => !notebookStore.isProcessing);

const createNote = () => {
    noteStore.createNote(notebookStore.selectedNotebook);
}

const setSelectedNote = (id: string) => {
    noteStore.setSelectedNote(id);
}

</script>

<template>
    <div class="bg-gray-50">
        <div class="bg-primary p-8 w-full flex items-center justify-start rounded-b-2xl">
            <h2 class="text-white text-xl font-title">
                <font-awesome-icon :icon="['fas', 'book']" class="pr-1" size="sm"/>
                <span v-if="isLoaded">{{ selectedNotebookName }}</span>
                <span v-else>Loading...</span>
            </h2>
        </div>
        <div class="mt-3 p-6">
            <BaseSearch/>
            <div class="mt-6 flex justify-between items-center">
                <h3 class="font-title text-lg text-gray-600 mr-28">
                    <font-awesome-icon :icon="['fas', 'file']" class="mr-1" size="sm"/>
                    Notes
                </h3>
                <BaseButton
                        class="text-tiny addNewNoteBtn"
                        @click="createNote"
                >
                    Add new note
                </BaseButton>
            </div>
            <div class="mt-6 flex flex-col gap-4">
                <NoteItemSkeleton v-if="!isLoaded"/>
                <NoteItemSkeleton v-if="!isLoaded"/>
                <NoteItemSkeleton v-if="!isLoaded"/>
                <NoteItem v-else v-for="note in notes" :key="note.id" :note="note" @makeSelected="setSelectedNote"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>