<script setup lang="ts">

import BaseButton from "@/components/UI/BaseButton.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
import {ref} from "vue";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";

const email = ref('');

const buttonPending = ref(false);
const errMsg = ref('');
const sent = ref(false);
const handleSubmit = async () => {
  buttonPending.value = true;
  if(email.value.trim() === '') {
    return;
  }
  try{
    await sendPasswordResetEmail(getAuth(), email.value);
    sent.value = true;
  }catch(err){
    errMsg.value = "An error occurred.";
  }
  buttonPending.value = false;
}
</script>

<template>
  <img src="../../assets/blobBackground.svg" alt="Background" class="w-screen h-screen object-cover">
  <div class="flex h-screen justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="bg-white rounded-md p-8 xl:p-12 text-gray-500 font-body">
      <div class="flex flex-col gap-8 items-center text-center">
        <h1 class="font-title text-gray-600 text-2xl xl:text-4xl">Forgot password</h1>
        <p class="text-sm xl:text-md">Enter the email associated with the account you forgot the password for.</p>
        <div class="text-left self-start w-full">
          <BaseInput name="email" placeholder="Enter your account's email" v-model="email" class="w-full">
            Email
          </BaseInput>
        </div>
        <BaseButton @click="handleSubmit" class="px-5">
          <span v-if="buttonPending"><base-spinner :size="24" color="white"/></span>
          <span v-else>Receive email</span>
        </BaseButton>
        <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
        <p v-if="sent">An email has been sent to you, check your inbox.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>