<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BaseModal from "@/components/UI/BaseModal.vue";
import {computed, inject, ref} from "vue";
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

const isChangingName = ref(false);
const renameInput = ref<HTMLInputElement | null>(null);
const handleRenameStart = () => {
  isChangingName.value = true;
  setTimeout(() => {
    renameInput.value?.focus();
    (renameInput.value as HTMLInputElement).value = selectedNotebookName.value;
    (renameInput.value as HTMLInputElement).select();
  }, 0);
}

const handleRenameSubmit = () => {
  const newName = renameInput.value?.value as string;
  if (newName === selectedNotebookName.value) return;
  if (newName.length === 0) {
    renameInput.value?.focus();
    return;
  }
  isChangingName.value = false;
  notebookStore.changeSelectedNotebookName(renameInput.value?.value as string);
}

const openSidebar = inject('openSidebar');

</script>

<template>
    <div class="bg-primary w-full xl:hidden">
        <button class="bg-primary-light p-2 px-6 pl-5 text-white rounded-br-2xl" @click="openSidebar">
            <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
        </button>
    </div>
  <div class="bg-primary p-8 pt-6 w-full flex items-center justify-between xl:rounded-b-2xl">
    <h2 class="text-white text-xl font-title">
      <span v-if="!isLoaded">Loading...</span>
      <span v-else-if="!isChangingName">{{ selectedNotebookName }}</span>
      <input
          v-else
          ref="renameInput"
          class="renameNotebookInput bg-transparent focus:outline-none selection:bg-primary-light focus:border-[1px] p-1 -m-1 rounded border-primary-light w-full"
          type="text"
          @blur="isChangingName = false"
          @keydown.enter="handleRenameSubmit"
      >
    </h2>
    <div class="flex gap-2" v-if="isLoaded">
      <button
          class="renameNotebookBtn p-1 rounded hover:bg-primary-light transition-colors"
          @click="handleRenameStart"
      >
        <font-awesome-icon :icon="['fas', 'pen']" class="fa-fw text-white"/>
      </button>
      <button
          class="deleteNotebookBtn p-1 rounded hover:bg-primary-light transition-colors"
          @click="handleModal"
      >
        <font-awesome-icon :icon="['fas', 'trash']" class="fa-fw text-white"/>
      </button>
    </div>
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