<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BaseSearch from "@/components/UI/BaseSearch.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import NoteItem from "@/components/NotesDisplay/NoteItem.vue";
import {useNoteStore} from "@/stores/noteStore";
import {Note} from "@/types/Note";
import {computed} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";

const note: Note = {
  id: 1,
  title: 'My note',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, adipisci aliquam asperiores atque autem commodi consequatur cumque cupiditate deserunt doloribus ducimus ea earum eius eos error esse est eum eveniet ex exercitationem facilis fugiat fugit hic id illum impedit in incidunt ipsa ipsum iure laboriosam laborum libero magnam magni maiores maxime minima minus molestiae mollitia natus nemo neque nisi nobis nostrum nulla numquam obcaecati odio officia officiis omnis optio pariatur perferendis perspiciatis placeat porro possimus praesentium provident quae quas quia quibusdam quisquam quod quos ratione recusandae rem repellat reprehenderit repudiandae rerum saepe sapiente sequi similique sint sit soluta sunt suscipit tempora temporibus tenetur totam ullam unde ut vel veniam veritatis voluptas voluptate voluptatem voluptates voluptatum.',
  tags: ['School', 'Important'],
  lastModified: Date.now(),
  favorite: false,
  notebookId: 1,
}

const secondNote: Note = {
  id: 2,
  title: 'My second note',
  content: 'This note is meant to be a test note for the second notebook',
  tags: ['Second'],
  lastModified: Date.now(),
  favorite: true,
  notebookId: 2,
}


const noteStore = useNoteStore();
noteStore.notes.push(note);
noteStore.notes.push(secondNote);

const notes = computed(() => noteStore.selectedNotebookNotes);

const notebookStore = useNotebookStore();

const createNote = () => {
  noteStore.createNote(notebookStore.selectedNotebook);
}

const setSelectedNote = (id: number) => {
  noteStore.setSelectedNote(id);
}

</script>

<template>
  <div class="bg-gray-50">
    <div class="bg-primary p-8 w-full flex items-center justify-start rounded-b-2xl">
      <h2 class="text-white text-xl font-title">
        <font-awesome-icon :icon="['fas', 'book']" class="pr-1" size="sm"/>
        Notebook name
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
        <NoteItem v-for="note in notes" :key="note.id" :note="note" @makeSelected="setSelectedNote"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>