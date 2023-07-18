<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BaseModal from "@/components/UI/BaseModal.vue";
import {computed, ref} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";

const notebookStore = useNotebookStore();
const selectedNotebookName = computed(() => notebookStore.selectedNotebookName);
const isLoaded = computed(() => !notebookStore.isProcessing);
const notebookCount = computed(() => notebookStore.notebooks.length);

const showDeleteModal = ref(false);
const showErrorModal = ref(false);
const modalPending = ref(false);

const handleModal = () => {
  if (notebookCount.value > 1) {
    showDeleteModal.value = true;
  } else {
    showErrorModal.value = true;
  }
}

const handleDeleteNotebook = async () => {
  modalPending.value = true;
  await notebookStore.deleteSelectedNotebook();
  modalPending.value = false;
  showDeleteModal.value = false;
}

</script>

<template>
  <div class="bg-primary p-8 w-full flex items-center justify-between rounded-b-2xl">
    <h2 class="text-white text-xl font-title">
      <font-awesome-icon :icon="['fas', 'book']" class="pr-1" size="sm"/>
      <span v-if="isLoaded">{{ selectedNotebookName }}</span>
      <span v-else>Loading...</span>
    </h2>
    <button
        class="deleteNotebookBtn p-1 rounded hover:bg-primary-light transition-colors"
        @click="handleModal"
    >
      <font-awesome-icon :icon="['fas', 'trash']" class="fa-fw text-white"/>
    </button>
    <BaseModal
        v-if="showDeleteModal"
        primary-action-text="Delete"
        secondary-action-text="Cancel"
        @close="showDeleteModal = false"
        @primaryAction="handleDeleteNotebook"
        @secondaryAction="showDeleteModal = false"
        :pending="modalPending"
    >
      <template #title>Delete notebook?</template>
      <template #default>This action cannot be undone.</template>
    </BaseModal>
    <BaseModal
        v-if="showErrorModal"
        primary-action-text="Close"
        @close="showErrorModal = false"
        @primaryAction="showErrorModal = false"
    >
      <template #title>Can't delete notebook</template>
      <template #default>
        You cannot delete the last notebook.
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>

</style>