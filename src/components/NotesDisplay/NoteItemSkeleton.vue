<template>
    <BaseCard class="noteSkeleton select-none text-transparent">
        <div class="flex max-w-full flex-col gap-2">
            <div class="flex justify-between items-center">
                <span class="rounded font-title w-fit bg-gradient-to-r
            from-gray-200 to-gray-225
            animate-skeleton">This is the title</span>
            </div>
            <p class="font-body text-sm w-fit line-clamp-1 bg-gradient-to-r
            from-gray-200 to-gray-225
            animate-skeleton">This is some temporary note content</p>
            <p class="font-body text-tiny w-fit line-clamp-1 bg-gradient-to-r text-transparent
            from-gray-200 to-gray-225
            animate-skeleton"> Last modified </p>
        </div>
    </BaseCard>
</template>
<script setup lang="ts">
import BaseCard from "@/components/UI/BaseCard.vue";
</script>