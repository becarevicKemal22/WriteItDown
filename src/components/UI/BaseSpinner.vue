<script setup lang="ts">
import {computed} from "vue";

interface Props{
  size?: number;
  color?: 'white' | 'primary';
}
const props = withDefaults(defineProps<Props>(), {
  size: 10,
  color: 'primary'
});

const strokeColor = computed(() => {
  return props.color === 'primary' ? '#5F55D2' : '#ffffff';
})
</script>

<template>
  <svg
      class="spinner"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="45" :style="{stroke: strokeColor}"/>
  </svg>
</template>

<style scoped>
svg.spinner {
  animation: 2s linear infinite svg-animation;
}

@keyframes svg-animation {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

.spinner circle {
  animation: 1.4s ease-in-out infinite both circle-animation;
  -webkit-transition: stroke 0.3s linear;
  -moz-transition: stroke 0.3s linear;
  -o-transition: stroke 0.3s linear;
  transition: stroke 0.3s linear;
  display: block;
  fill: transparent;
  stroke: #ffffff;
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 280;
  stroke-width: 10px;
  transform-origin: 50% 50%;
}

@keyframes circle-animation {
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }

  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }

  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
}

</style>