<script setup lang="ts">
import {computed} from "vue";

interface Props {
  active?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
});

const classes = computed(() => {
  return {
    'bg-gray-300': props.active,
  }
})

</script>


<template>
  <div :class="classes"
       class="cursor-pointer p-1.5 rounded hover:bg-gray-300 transition-colors">
    <button class="font-body text-gray-500 text-sm line-clamp-1">
      <slot></slot>
    </button>
  </div>
</template>