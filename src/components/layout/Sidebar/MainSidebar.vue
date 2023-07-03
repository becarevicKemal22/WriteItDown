<script setup>
import NotebookItem from "@/components/layout/Sidebar/NotebookItem.vue";
import {computed, ref} from "vue";

const isOpen = ref(true);
const isMobile = ref(true);
const classes = computed(() => {
    return {
        'scale-x-0': !isOpen.value && isMobile.value,
        '-translate-x-1/2': !isOpen.value && isMobile.value,
    }
});

</script>

<template>
    <div :class="classes" class="p-6 w-64 w-fit drop-shadow-side bg-white h-screen transition-all ease">
        <div v-if="isMobile" :class="{'opacity-0': !isOpen}" class="flex justify-end" @click="isOpen = !isOpen">
            <button>
                <font-awesome-icon :icon="['fas', 'arrow-left']"/>
            </button>
        </div>
        <img alt="Logo" class="w-32 h-16 mb-6" src="https://placehold.co/800x200">

        <div class="mb-4">
            <div class="flex items-center justify-between">
                <h3 class="font-title text-gray-700">
                    <font-awesome-icon :icon="['fas', 'book']" class="pr-1" size="sm"/>
                    Notebooks
                </h3>
                <button class="text-primary">
                    <font-awesome-icon :icon="['fas', 'circle-plus']" class="hover:scale-110 transition-transform"
                                       size="xl"/>
                </button>
            </div>
            <div class="ml-2 mt-2 p-2 flex flex-col gap-2">
                <NotebookItem>First Notebook</NotebookItem>
                <NotebookItem>Second Notebook</NotebookItem>
            </div>
        </div>

        <div class="">
            <div class="flex items-center justify-between">
                <h3 class="font-title text-gray-700">
                    <font-awesome-icon :icon="['fas', 'tags']" class="pr-1" size="sm"/>
                    Tags
                </h3>
                <button class="text-primary">
                    <font-awesome-icon :icon="['fas', 'circle-plus']" class="hover:scale-110 transition-transform"
                                       size="xl"/>
                </button>
            </div>
        </div>
    </div>

</template>