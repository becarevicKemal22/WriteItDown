<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {applyActionCode, getAuth} from "firebase/auth";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

const msg = ref('');
const route = useRoute();
const actionCode = computed(() => route.query.oobCode);
const verified = ref(false);
const handleEmailVerification = async () => {
  const auth = await getAuth();
  try {
    await applyActionCode(auth, (actionCode.value as string));
    verified.value = true;
    await redirect();
  } catch (err) {
    msg.value = "There has been an error. Try verifying your email again.";
  }
}

const router = useRouter();
const buttonPending = ref(false);
const redirect = async () => {
  buttonPending.value = true;
  const timer = setInterval(async () => {
    await getAuth().currentUser?.reload();
    const user = await getAuth().currentUser;
    if(user?.emailVerified) {
      clearInterval(timer);
      await router.push('/home');
    }
  }, 50);
}

onMounted(async () => {
  await handleEmailVerification();
})

</script>

<template>
  <img src="../../assets/blobBackground.svg" alt="Background" class="w-screen h-screen object-cover">
  <div class="flex h-screen justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="bg-white rounded-md p-8 xl:p-12 text-gray-500 font-body">
      <div v-if="verified" class="flex flex-col gap-8 items-center text-center">
        <h1 class="font-title text-gray-600 text-2xl xl:text-4xl">You have successfully verified your
          email</h1>
        <p class="text-sm xl:text-md">You will be automatically redirected to the home page. If you don't, click the button below to continue.</p>
        <BaseButton @click="redirect" class="px-5">
          <span v-if="buttonPending"><base-spinner :size="24" color="white"/></span>
          <span v-else>Continue</span>
        </BaseButton>
      </div>
      <div v-else class="flex flex-col gap-8 items-center text-center">
        <h1 class="font-title text-gray-600 text-xl xl:text-4xl">Please wait</h1>
        <p class="text-sm xl:text-md">We are verifying your email...</p>
        <p class="text-red-500" v-if="msg">{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>