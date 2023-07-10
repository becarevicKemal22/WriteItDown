<script setup lang="ts">

import {onMounted, ref} from "vue";

const emit = defineEmits<{
  (e: 'addNotebook', value: string): void;
  (e: 'fail'): void;
}>();

const elInput = ref<HTMLInputElement | null>(null);

const addNotebook = () => {
  const trimmedVal = elInput.value?.value.trim();
  if(trimmedVal && trimmedVal?.length > 0) {
    emit('addNotebook', trimmedVal);
    (elInput.value as HTMLInputElement).value = '';
  }
}

const emitFailed = () => {
  emit('fail');
}

onMounted(() => {
  elInput.value?.focus();
});

</script>

<template>
  <input id="search"
         ref="elInput"
         class="newNotebookInput appearance-none rounded-md p-1 text-sm text-body text-gray-500 border-2 border-gray-300 transition-colors focus:outline-0 focus:border-primary"
         placeholder="Enter notebook name"
         type="text"
         @keydown.enter="addNotebook"
         @blur="emitFailed"
  >
</template>

<style scoped>

</style>