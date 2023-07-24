<script setup lang="ts">

import {computed, ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

interface Props {
    dropdownIcon?: [string, string];
    dropdownMobile?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    dropdownIcon: ['fas', 'ellipsis-v'],
    dropdownMobile: false,
});

const isMobile = computed(() => {
    return window.innerWidth <= 1280;
});

const shouldBeDropdown = computed(() => {
    return props.dropdownMobile && isMobile.value;
});

const dropdownOpen = ref(false);
const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
}

</script>

<template>
  <div v-if="!shouldBeDropdown" class="flex gap-3 xl:gap-2 px-3 mr-0">
    <slot></slot>
  </div>
  <div v-else>
      <div class="relative">
        <font-awesome-icon :icon="dropdownIcon" @click="toggleDropdown"/>
        <div
                v-if="dropdownOpen"
                id="dropdown"
                class="absolute top-0 right-0 bg-red-500 shadow-sm rounded flex flex-col gap-2 p-2"
        >
            <slot></slot>
        </div>
      </div>
  </div>
</template>

<style scoped>
#dropdown {
    z-index: 1000000000 !important;
}
</style>