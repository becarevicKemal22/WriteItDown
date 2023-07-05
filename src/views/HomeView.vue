<script setup lang="ts">

import MainSidebar from "@/components/layout/Sidebar/MainSidebar.vue";
import NotesDisplay from "@/components/NotesDisplay/NotesDisplay.vue";
</script>

<template>
    <main class="overflow-x-scroll flex">
        <MainSidebar></MainSidebar>
        <NotesDisplay></NotesDisplay>
    </main>
</template>
