<script lang="ts" setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BaseSearch from "@/components/UI/BaseSearch.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import NoteItem from "@/components/NotesDisplay/NoteItem.vue";
import {useNoteStore} from "@/stores/noteStore";
import {computed, inject, ref} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";
import NoteItemSkeleton from "@/components/NotesDisplay/NoteItemSkeleton.vue";
import NotesDisplayHeader from "@/components/NotesDisplay/NotesDisplayHeader.vue";

const noteStore = useNoteStore();

const notes = computed(() => {
  if (noteStore.displaySearched) {
    return noteStore.searchedNotes;
  }
  return noteStore.notes;
});

const notebookStore = useNotebookStore();
const isLoaded = computed(() => !notebookStore.isProcessing);

const createNote = () => {
  noteStore.createNote(notebookStore.selectedNotebook);
}

const setSelectedNote = (id: string) => {
  noteStore.setSelectedNote(id);
}

const searchTerm = ref('');
const searchNotes = (value: string) => {
  noteStore.searchNotes(value);
  searchTerm.value = value;
}

</script>

<template>
  <div class="bg-gray-50 h-screen">
    <NotesDisplayHeader/>
    <div class="mt-3 p-6">
      <BaseSearch @search="searchNotes"/>
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
        <div v-if="!isLoaded" class="flex flex-col gap-4">
          <NoteItemSkeleton/>
          <NoteItemSkeleton/>
          <NoteItemSkeleton/>
        </div>
        <NoteItem v-else-if="notes.length"
                  v-for="note in notes"
                  :key="note.id"
                  :note="note"
                  :searchTerm="searchTerm"
                  @makeSelected="setSelectedNote"/>
        <div v-else>
          <p class="flex justify-center mt-10 text-gray-500 font-title text-lg">No notes found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>