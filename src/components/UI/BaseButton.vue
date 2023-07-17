<script setup lang="ts">
import {computed} from "vue";

interface Props{
  type?: 'secondary' | 'primary';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary'
});

const classes = computed(() => {
  return {
    'bg-primary text-white  font-title hover:bg-primary-light ': props.type === 'primary',
    'bg-white text-gray-600 font-body border-2 border-primary hover:border-primary-light': props.type === 'secondary'
  }
});
</script>

<template>
  <button
      class="py-2 px-3 rounded-lg transition-colors"
      :class="classes"
  >
      <slot></slot>
  </button>
</template>