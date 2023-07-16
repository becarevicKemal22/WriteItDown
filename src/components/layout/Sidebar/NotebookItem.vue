<script setup lang="ts">
import {computed} from "vue";

interface Props {
  id: string;
  active: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'makeSelected', id: string): void,
}>();

const emitSetSelectedNotebook = () => {
  emit('makeSelected', props.id);
}

const classes = computed(() => {
  return {
    'bg-gray-300': props.active,
  }
})

</script>


<template>
  <div :class="classes"
       class="notebookItem cursor-pointer p-1.5 rounded hover:bg-gray-300 transition-colors"
       @click="emitSetSelectedNotebook"
  >
    <button
        class="font-body text-gray-500 text-sm line-clamp-1"
        :class="{'text-gray-800': props.active}"
    >
      <slot></slot>
    </button>
  </div>
</template>