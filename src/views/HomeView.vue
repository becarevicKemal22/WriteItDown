<script setup lang="ts">

import MainSidebar from "@/components/layout/Sidebar/MainSidebar.vue";
import NotesDisplay from "@/components/NotesDisplay/NotesDisplay.vue";
import TextEditor from "@/components/TextEditor/TextEditor.vue";
import {computed, inject, onMounted, provide, ref, watch, watchEffect} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";
import {useNoteStore} from "@/stores/noteStore";

onMounted(() => {
  console.log("MOUNTED");
  const notebookStore = useNotebookStore();
  notebookStore.fetchNotebooks();
});

const sidebar = ref<HTMLElement | null>(null);
provide('openSidebar', () => {
  sidebar.value.openSidebar();
});

const showEditor = ref(false);
const noteStore = useNoteStore();
const windowWidth = inject('windowWidth');
const isMobile = computed(() => windowWidth.value < 1280);
watchEffect(() => {
  if (!isMobile.value) {
    showEditor.value = true;
    return;
  }
  /*
  // works like this so it is changed when notes are selected and unselected,
  the above if statement is only for when the window is resized so that the editor container shows,
  and then other components handle whether there is content or not based on note selection
   */
  if (noteStore.selectedNote) {
    showEditor.value = true;
  } else {
    showEditor.value = false;
  }
});
</script>

<template>
  <main class="flex flex-col xl:grid grid-cols-12">
    <MainSidebar ref="sidebar" class="absolute left-0 top-0 z-10 w-10/12 xl:col-span-2 xl:w-full xl:relative"/>
    <NotesDisplay
        v-if="!isMobile || (isMobile && !showEditor)"
        class="col-span-3"
    />
    <TextEditor
        v-if="!isMobile || (isMobile && showEditor)"
        class="col-span-7"/>
  </main>
</template>
