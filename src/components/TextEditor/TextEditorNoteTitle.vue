<script setup lang="ts">

import {computed, onMounted, onUpdated, ref, watch} from "vue";
import {useNoteStore} from "@/stores/noteStore";

const noteStore = useNoteStore();

const noteTitle = computed(() => {
  return noteStore.selectedNote?.title;
});

const elInput = ref('');
const update = () => {
  noteStore.setSelectedNoteTitle((elInput.value as HTMLInputElement).value, false) ;
}

const blurInput = () => {
  (elInput.value as HTMLInputElement).blur();
  noteStore.setSelectedNoteTitle((elInput.value as HTMLInputElement).value, true);
}

onUpdated(() => {
  if(noteTitle.value === 'New note'){
    (elInput.value as HTMLInputElement).focus();
    (elInput.value as HTMLInputElement).select();
  }
});
onMounted(() => {
  if(noteTitle.value === 'New note'){
    (elInput.value as HTMLInputElement).focus();
    (elInput.value as HTMLInputElement).select();
  }
});

</script>

<template>
  <div class="font-title w-full text-3xl text-gray-600 border-b-2 border-gray-200 focus-within:border-gray-300">
    <input
        type="text"
        ref="elInput"
        :value="noteTitle"
        @input="update"
        @keydown.enter="blurInput"
        @blur="blurInput"
        class="w-full rounded-md rounded-b-none caret-primary-light p-4 pb-2 focus:pb-3 focus:outline-0 focus:bg-gray-100 transition-all ease-out"
    >
  </div>
</template>

<style scoped>

</style>