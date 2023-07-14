<script setup lang="ts">
interface Props {
  modelValue: string;
  name: string;
  placeholder?: string;
}
defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const update = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="font-body text-sm text-gray-600"><slot></slot></p>
    <input
        type="text"
        :placeholder="placeholder"
        @input="update"
        class="p-1 placeholder text-gray-700 font-body border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-light transition-colors"
        :name="name"
    >
  </div>
</template>

<style scoped>

</style>