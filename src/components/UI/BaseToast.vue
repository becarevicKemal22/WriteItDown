<script setup lang="ts">
import {computed} from "vue";

defineEmits<{
  (e: 'close'): void
}>()

interface Props {
  show: boolean;
  variant: 'info' | 'success' | 'error';
}
const props = defineProps<Props>();

const colorClass = computed(() => {
  if(props.variant === 'info'){
    return 'bg-blue-400';
  }
  else if(props.variant === 'success'){
    return 'bg-green-400';
  }
  else{
    return 'bg-red-500';
  }
})
</script>

<template>
  <teleport to="body">
    <transition>
      <div v-if="show" class="flex gap-2 fixed right-[3%] bottom-[5%] w-72 lg:w-fit lg:max-w-lg bg-white shadow-lg items-center rounded-md overflow-hidden">
        <div class="py-5 px-4 flex items-center justify-center" :class="colorClass">
          <svg v-if="variant === 'info'" class="w-6 h-6 lg:w-7 lg:h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <svg v-else-if="variant === 'success'" class="w-6 h-6 lg:w-7 lg:h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
          <svg v-else-if="variant === 'error'" class="w-6 h-6 lg:w-7 lg:h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
          </svg>
        </div>
        <div class="flex justify-between items-center font-open-sans">
          <div class="flex flex-col mr-4 lg:mr-6 lg:px-1">
            <h3 class="font-bold text-gray-600 text-base"><slot></slot></h3>
            <p class="text-gray-600 text-sm leading-4 line-clamp-2"><slot name="description"></slot></p>
          </div>
<!--          <div class="p-2 group">-->
<!--            <div class="p-2 rounded-md group-hover:bg-gray-100 transition-colors"  @click="$emit('close')">-->
<!--              <svg class="w-3 h-3 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">-->
<!--                <path d="m9.414 8 5.293-5.293a1 1 0 1 0-1.414-1.414L8 6.586 2.707 1.293a1 1 0 0 0-1.414 1.414L6.586 8l-5.293 5.293a1 1 0 1 0 1.414 1.414L8 9.414l5.293 5.293a1 1 0 0 0 1.414-1.414L9.414 8Z"/>-->
<!--              </svg>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.v-enter-from,
.v-leave-to{
  transform: translateX(200%);
}

.v-enter-to,
.v-leave-from{
  transform: translateX(0%);
}

.v-enter-active,
.v-leave-active{
  position: fixed;
  bottom: 5%;
  right: 3%;
  transition: transform 0.4s ease;
}
</style>