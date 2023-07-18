<script setup lang="ts">

import {useNoteStore} from "@/stores/noteStore";
import TextEditorTopBarSavingIndicator from "@/components/TextEditor/TextEditorTopBarSavingIndicator.vue";
import {ref} from "vue";
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

</script>

<template>
  <div class="bg-gray-100 w-full font-body text-gray-700 h-16 flex justify-end items-center p-4 gap-6 pr-10">
    <TextEditorTopBarSavingIndicator :isSaving="noteStore.isSaving"/>
    <button @click="showModal=true" class="deleteBtn p-1 px-2 bg-transparent hover:bg-red-100 text-red-400 rounded transition-colors duration-500">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </button>
  </div>
  <BaseModal
      v-if="showModal"
      primary-action-text="Delete"
      secondary-action-text="Cancel"
      :pending="modalPending"
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