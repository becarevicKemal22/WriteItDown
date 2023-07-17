<script setup lang="ts">

import MainSidebar from "@/components/layout/Sidebar/MainSidebar.vue";
import NotesDisplay from "@/components/NotesDisplay/NotesDisplay.vue";
import TextEditor from "@/components/TextEditor/TextEditor.vue";
import {onMounted} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";
import BaseModal from "@/components/UI/BaseModal.vue";

onMounted(() => {
  const notebookStore = useNotebookStore();
  notebookStore.fetchNotebooks();
});

</script>

<template>
  <main class="grid grid-cols-12">
    <MainSidebar class="col-span-2"></MainSidebar>
    <NotesDisplay class="col-span-3"></NotesDisplay>
    <TextEditor class="col-span-7"></TextEditor>
  </main>
</template>
