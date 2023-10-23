<script lang="ts" setup>

import {useNoteStore} from "@/stores/noteStore";
import TextEditorTopBarSavingIndicator from "@/components/TextEditor/TextEditorTopBarSavingIndicator.vue";
import {computed, ref} from "vue";
import BaseModal from "@/components/UI/BaseModal.vue";

const noteStore = useNoteStore();

const showModal = ref(false);
const modalPending = ref(false);
const handleDeleteNote = async () => {
    modalPending.value = true;
    await noteStore.deleteSelectedNote();
    modalPending.value = false;
    showModal.value = false;
}

const makeFavorite = () => {
    noteStore.toggleSelectedNoteFavorite();
}

const handleBack = () => {
    noteStore.unselectNote();
}

</script>

<template>
    <div class="bg-gray-100 w-full font-body text-gray-700 h-16 flex justify-between xl:justify-end items-center">
        <div class="xl:hidden">
            <button class="font-title text-gray-400 flex gap-2 items-center ml-5" @click="handleBack">
                <font-awesome-icon :icon="['fas', 'arrow-left']"/>
                Back
            </button>
        </div>
        <div class="flex justify-end items-center p-4 gap-3 xl:gap-6 pr-5 xl:pr-10">
            <TextEditorTopBarSavingIndicator/>
            <button
                    :class="{ 'text-primary-light': noteStore.selectedNote?.favorite }"
                    class="makeFavoriteBtn p-1 px-2 bg-transparent hover:bg-gray-200 rounded text-gray-400 transition-colors duration-500"
                    @click="makeFavorite"
            >
                <font-awesome-icon :icon="['fas', 'star']" fixed-width/>
            </button>
            <button class="deleteBtn p-1 px-2 bg-transparent hover:bg-red-100 text-red-400 rounded transition-colors duration-500"
                    @click="showModal=true">
                <font-awesome-icon :icon="['fas', 'trash']" fixed-width/>
            </button>
        </div>
    </div>
    <BaseModal
            v-if="showModal"
            :pending="modalPending"
            primary-action-text="Delete"
            secondary-action-text="Cancel"
            @close="showModal = false"
            @primaryAction="handleDeleteNote"
            @secondaryAction="showModal = false"
    >
        <template #title>Delete note?</template>
        <template #default>This action cannot be undone.</template>
    </BaseModal>
</template>

<style scoped>

</style>