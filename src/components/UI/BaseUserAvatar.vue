<script setup lang="ts">

import {computed} from "vue";

interface Props {
  userName: string | undefined;
}

const props = defineProps<Props>();

const letters = computed(() => {
  if(props.userName){
    const letters = props.userName.split(' ');
    return letters.map(letter => letter[0].toUpperCase()).join('');
  }
  return '';
})

const url = computed(() => {
  return `https://placehold.co/200x200?text=${letters.value}`
})

</script>

<template>
  <div class="w-10 h-10 overflow-hidden rounded-full">
    <img :src="url" alt="User avatar">
  </div>
</template>

<style scoped>

</style>