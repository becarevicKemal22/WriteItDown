<script lang="ts" setup>

import {computed} from "vue";

interface Props {
    userNameOrURL: string | undefined;
}

const props = defineProps<Props>();

const isUrl = (str: string) => {
    try {
        new URL(str);
        return true;
    } catch (e) {
        return false;
    }
}

const letters = computed(() => {
    if (props.userNameOrURL) {
        const letters = props.userNameOrURL.split(' ');
        return letters.map(letter => letter[0].toUpperCase()).join('');
    }
    return '';
})

const url = computed(() => {
    if (isUrl(props.userNameOrURL as string)) {
        console.log('is url')
        return props.userNameOrURL;
    }
    return `https://placehold.co/200x200?text=${letters.value}`
})

</script>

<template>
    <div class="w-9 h-9 overflow-hidden rounded-full">
        <img :src="url" alt="User avatar" referrerpolicy="no-referrer">
    </div>
</template>

<style scoped>

</style>