<script setup>

</script>

<template>
  <button class="py-2 px-3 bg-primary rounded-lg text-white font-title hover:bg-primary-light transition-colors" :class="$attrs">
      <slot></slot>
  </button>
</template>