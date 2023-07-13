<script setup lang="ts">

import TextEditorTopBar from "@/components/TextEditor/TextEditorTopBar.vue";
import TextEditorNoteTitle from "@/components/TextEditor/TextEditorNoteTitle.vue";
import {useNoteStore} from "@/stores/noteStore";
import TextEditorWYSIWYGEditor from "@/components/TextEditor/TextEditorWYSIWYGEditor.vue";

const noteStore = useNoteStore();

</script>

<template>
  <div v-if="noteStore.selectedNote">
    <TextEditorTopBar/>
    <div class="p-16 grid grid-cols-6">
      <div class="col-span-1"></div>
      <div class="col-span-4">
        <TextEditorNoteTitle/>
        <TextEditorWYSIWYGEditor/>
      </div>
      <div class="col-span-1"></div>
    </div>
  </div>
</template>

<style scoped>

</style>