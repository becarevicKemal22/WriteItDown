<script setup lang="ts">

import {computed, ref} from "vue";
import {useNoteStore} from "@/stores/noteStore";

const noteStore = useNoteStore();

enum ModificationState {
  SAVING,
  SAVED,
  MODIFIED
}

const state = computed(() => {
  if(noteStore.hasBeenModifiedSinceLastSave && !noteStore.isSaving){
    return ModificationState.MODIFIED;
  }
  else if(noteStore.isSaving){
    return ModificationState.SAVING;
  }
  else{
    return ModificationState.SAVED;
  }
})

</script>

<template>
  <div class="text-gray-400">
    <div v-if="state === ModificationState.SAVING"  class="flex items-center gap-2">
      <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
      <p>Saving note...</p>
    </div>
    <div v-else-if="state === ModificationState.SAVED" class="flex items-center gap-2">
      <font-awesome-icon :icon="['fas', 'file-circle-check']" />
      <p>Saved!</p>
    </div>
    <div v-else class="flex items-center gap-2">
      <font-awesome-icon :icon="['fas', 'file-circle-exclamation']" />
      <p>Note not saved</p>
    </div>
  </div>

</template>

<style scoped>

</style>