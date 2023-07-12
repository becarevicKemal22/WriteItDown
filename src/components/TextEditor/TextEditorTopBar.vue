<script setup lang="ts">

import {useNoteStore} from "@/stores/noteStore";
import TextEditorTopBarSavingIndicator from "@/components/TextEditor/TextEditorTopBarSavingIndicator.vue";

const noteStore = useNoteStore();

</script>

<template>
  <div class="bg-gray-100 w-full font-body text-gray-700 h-16 flex items-center p-4">
    <TextEditorTopBarSavingIndicator :isSaving="noteStore.isSaving"/>
  </div>
</template>

<style scoped>

</style>