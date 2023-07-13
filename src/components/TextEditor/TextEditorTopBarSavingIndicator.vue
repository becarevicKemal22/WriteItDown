<script setup lang="ts">
interface Props {
  isSaving: boolean;
}
defineProps<Props>();

</script>

<template>
  <div class="text-gray-400">
    <div v-if="isSaving"  class="flex items-center gap-2">
      <font-awesome-icon :icon="['fas', 'file-arrow-up']" />
      <p>Saving note...</p>
    </div>
    <div v-else class="flex items-center gap-2">
      <font-awesome-icon :icon="['fas', 'file-circle-check']" />
      <p>Saved!</p>
    </div>
  </div>

</template>

<style scoped>

</style>