<script setup lang="ts" async>
import {useAuthState} from "@/composables/useAuthState";
import BaseButton from "@/components/UI/BaseButton.vue";
import {getAuth, sendEmailVerification} from "firebase/auth";
import type {User} from "firebase/auth";
import {ref} from "vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

const {user} = useAuthState();

const timesReset = ref(0);
const msg = ref('');
const buttonPending = ref(false);

const resendEmail = async () => {
  if(timesReset.value > 0){
    msg.value = 'Email has already been resent';
    return;
  }
  const usr = await getAuth().currentUser;
  buttonPending.value = true;
  try{
    await sendEmailVerification((usr as User));
  }catch{
    buttonPending.value = false;
    return;
  }
  timesReset.value++;
  buttonPending.value = false;
  msg.value = 'Email resent!';
}


</script>

<template>
  <div v-if="user?.email">
    <img src="../../assets/blobBackground.svg" alt="Background" class="w-screen h-screen object-cover">
    <div class="flex h-screen w-10/12 justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="bg-white rounded-md p-8 xl:p-12 text-gray-500 font-body flex flex-col gap-8 items-center text-center">
        <h1 class="font-title text-gray-600 text-2xl text-center xl:text-4xl">Please verify your email</h1>
        <div class="flex flex-col items-center">
          <p class="xl:text-lg">You're almost there! We've sent an email to</p>
          <p class="font-title xl:text-lg text-gray-600">{{user?.email}}</p>
        </div>
        <div>
          <p class="text-sm xl:text-md">Click on the link in the email to complete the signup process.</p>
          <p class="text-sm mt-2 xl:text-md">If you don't see the email, be sure to check your spam folder.</p>
        </div>
        <div class="flex flex-col items-center gap-4">
          <p>Still can't find the email?</p>
          <BaseButton @click="resendEmail" class="text-sm">
            <div v-if="buttonPending" class="px-12">
              <span>
                <BaseSpinner color="white" :size="20"/>
              </span>
            </div>
            <span v-else>
              Resend email
            </span>
          </BaseButton>
          <p v-if="msg">{{msg}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>