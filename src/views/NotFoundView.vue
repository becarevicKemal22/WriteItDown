<script lang="ts" setup>

</script>

<template>
    <img alt="Background" class="w-screen h-screen object-cover" src="../assets/blobBackground.svg">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-4 xl:p-0 xl:w-fit text-center flex flex-col gap-16 text-white font-bold font-title">
        <h1 class="text-5xl xl:text-[5rem]">Oops!</h1>
        <h2 class="text-lg xl:text-[2rem]">We couldn't find the page you're looking for.</h2>
        <router-link to="/home" class="bg-white self-center text-primary p-2.5 xl:p-3 text-sm xl:text-lg rounded-lg w-36 xl:w-48">Back to home</router-link>
    </div>
</template>