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
    'bg-gray-100': props.active,
  }
})

</script>


<template>
  <div :class="classes"
       class="notebookItem cursor-pointer p-1.5 rounded hover:bg-gray-100 transition-colors"
       @click="emitSetSelectedNotebook"
  >
    <button
        class="font-body text-gray-500 text-sm"
        :class="{'text-gray-600': props.active}"
    >
      <slot></slot>
    </button>
  </div>
</template>