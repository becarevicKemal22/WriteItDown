<script setup lang="ts">

interface Props {
  isActive?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  isActive: false,
  disabled: false,
});

</script>

<template>
  <button
      class="w-7 h-7 rounded text-gray-700 transition-colors"
      :class="[{ 'bg-primary-lighter text-primary-dark hover:bg-primary-lighter': isActive }, { 'hover:bg-gray-200': !isActive }, {'bg-gray-200 text-gray-300 cursor-not-allowed': disabled}]"
  >
    <slot></slot>
  </button>
</template>

<style scoped>

</style>