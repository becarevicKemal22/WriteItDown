<script setup lang="ts">

import TextEditorTopBar from "@/components/TextEditor/TextEditorTopBar.vue";
import TextEditorNoteTitle from "@/components/TextEditor/TextEditorNoteTitle.vue";
import {useNoteStore} from "@/stores/noteStore";
import TextEditorWYSIWYGEditor from "@/components/TextEditor/TextEditorWYSIWYGEditor.vue";

const noteStore = useNoteStore();

</script>

<template>
  <div class="">
    <TextEditorTopBar/>
    <div
        v-if="noteStore.selectedNote"
        class="p-16 grid grid-cols-5"
    >
      <div class="col-span-1"></div>
      <div class="col-span-3">
        <TextEditorNoteTitle/>
        <TextEditorWYSIWYGEditor/>
      </div>
      <div class="col-span-1"></div>
    </div>
  </div>
</template>

<style scoped>

</style>