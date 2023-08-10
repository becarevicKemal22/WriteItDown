<script setup lang="ts">

import BaseButton from "@/components/UI/BaseButton.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {verifyPasswordResetCode, confirmPasswordReset, getAuth} from "firebase/auth";

const route = useRoute();
const router = useRouter();

const password = ref('');
const passwordConfirm = ref('');

const validate = () => {
  if (password.value.trim() === '' || passwordConfirm.value.trim() === '') {
    errMsg.value = 'Please fill in both fields';
    return false;
  }
  if (password.value.length < 8) {
    errMsg.value = 'Password must be at least 8 characters';
    return false;
  }
  if (password.value !== passwordConfirm.value) {
    errMsg.value = 'Passwords do not match';
    return false;
  }
  return true;
}

const errMsg = ref('');
const buttonPending = ref(false);
const handleReset = async () => {
  if (!validate()) return;
  buttonPending.value = true;
  const auth = getAuth();
  const actionCode = route.query.oobCode as string;
  try {
    verifyPasswordResetCode(getAuth(), actionCode).then(() => {
      const newPassword = password.value;

      confirmPasswordReset(auth, actionCode, newPassword).then(() => {

        router.push({name: 'Login'});

      }).catch(() => {
        errMsg.value = 'An error has occurred';
      });
    }).catch(() => {
      errMsg.value = 'This link has expired. Try resetting your password again.';
    });
  } catch (e) {
    errMsg.value = 'An error has occurred';
  }
}

</script>

<template>
  <img src="../../assets/blobBackground.svg" alt="Background" class="w-screen h-screen object-cover">
  <div class="flex h-screen justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="bg-white rounded-md p-8 xl:p-12 text-gray-500 font-body">
      <div class="flex flex-col gap-8 items-center text-center">
        <h1 class="font-title text-gray-600 text-2xl xl:text-4xl">Reset password</h1>
        <div class="text-left self-start w-full flex flex-col gap-4">
          <BaseInput name="newPassword" type="password" placeholder="Enter your new password" v-model="password"
                     class="w-full">
            New password
          </BaseInput>
          <BaseInput name="confirmPassword" type="password" placeholder="Confirm your new password"
                     v-model="passwordConfirm" class="w-full">
            Confirm password
          </BaseInput>
        </div>
        <BaseButton @click="handleReset" class="px-8">
          <span v-if="buttonPending"><base-spinner :size="24" color="white"/></span>
          <span v-else>Reset password</span>
        </BaseButton>
        <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>