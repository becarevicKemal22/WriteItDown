<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BaseSearch from "@/components/UI/BaseSearch.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
</script>

<template>
    <div>
        <div class="bg-primary p-10 w-full flex items-center justify-start rounded-b-2xl">
            <h2 class="text-white text-xl font-title">
                <font-awesome-icon :icon="['fas', 'book']" class="pr-1" size="sm"/>
                Notebook name
            </h2>
        </div>
        <div class="mt-3 p-6">
            <BaseSearch/>
            <div class="mt-6 flex justify-between items-center">
                <h3 class="font-title text-lg text-gray-600 mr-28">
                    <font-awesome-icon :icon="['fas', 'file']" class="mr-1" size="sm"/>
                    Notes
                </h3>
                <BaseButton class="text-tiny">Add new note</BaseButton>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>