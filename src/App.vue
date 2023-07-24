<script setup lang="ts">

import {onMounted, onUnmounted, provide, ref} from "vue";

const windowSize = ref(window.innerWidth)
onMounted(() => {
  window.addEventListener('resize', () => {windowSize.value = window.innerWidth} )
})
onUnmounted(() => {
  window.removeEventListener('resize', () => {windowSize.value = window.innerWidth})
})

provide('windowWidth', windowSize);

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
