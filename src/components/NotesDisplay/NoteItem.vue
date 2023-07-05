<script setup lang="ts">

import BaseCard from "@/components/UI/BaseCard.vue";
import BaseTag from "@/components/UI/BaseTag.vue";

defineEmits<{
  (e: 'toggleFavorite'): void,
}>();

interface Props {
  note: {
    title: string,
    content: string,
    tags: string[],
    lastUpdate: string,
    favorite: true,
  }
}

defineProps<Props>();
</script>

<template>
  <BaseCard>
    <div class="flex flex-col gap-2">
      <div class="flex justify-between items-center">
        <h4 class="font-title text-lg -mb-0.5 text-gray-600">{{ note.title }}</h4>
        <font-awesome-icon :icon="['fas', 'star']" class="star hover:scale-110 transition-transform cursor-pointer"
                           :class="{'text-yellow-400': note.favorite, 'text-gray-300': !note.favorite}"
                           @click="$emit('toggleFavorite')"
        />
      </div>
      <p class="font-body text-sm text-gray-500 line-clamp-1">{{ note.content }}</p>
      <p class="font-body text-tiny text-gray-400 line-clamp-1">
        <font-awesome-icon :icon="['far', 'clock']" class="mr-1"/>
        Modified {{ note.lastUpdate }}
      </p>
      <div class="flex gap-1 flex-wrap">
        <BaseTag v-for="tag in note.tags" :key="tag">{{ tag }}</BaseTag>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>

</style>