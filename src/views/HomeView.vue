<script setup lang="ts">

import MainSidebar from "@/components/layout/Sidebar/MainSidebar.vue";
import NotesDisplay from "@/components/NotesDisplay/NotesDisplay.vue";
import TextEditor from "@/components/TextEditor/TextEditor.vue";
import {computed, onMounted, provide, ref, watch, watchEffect} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";
import {useNoteStore} from "@/stores/noteStore";

onMounted(() => {
  const notebookStore = useNotebookStore();
  notebookStore.fetchNotebooks();
});

const sidebar = ref<HTMLElement | null>(null);
provide('openSidebar', () => {
  sidebar.value.openSidebar();
});

const showEditor = ref(false);
const noteStore = useNoteStore();
const isMobile = computed(() => window.innerWidth < 1280)
watchEffect(() => {
    if(!isMobile.value){
        showEditor.value = true;
        return;
    }
    if(noteStore.selectedNote){
        showEditor.value = true;
    }else{
        showEditor.value = false;
    }
});
</script>

<template>
  <main class="flex flex-col xl:grid grid-cols-12">
    <MainSidebar ref="sidebar" class="absolute left-0 top-0 z-20 w-10/12 xl:col-span-2 xl:w-full xl:relative"/>
    <NotesDisplay
            v-if="!isMobile || (isMobile && !showEditor)"
            class="col-span-3"
    />
    <TextEditor
            v-else-if="!isMobile || (isMobile && showEditor)"
            class="col-span-7"/>
  </main>
</template>
