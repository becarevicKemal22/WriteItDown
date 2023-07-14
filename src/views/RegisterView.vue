<script setup lang="ts">

import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useRouter} from "vue-router";
import {GoogleAuthProvider, GithubAuthProvider, signInWithPopup} from "firebase/auth";
import BaseInput from "@/components/UI/BaseInput.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const errMsg = ref('');

const validate = () => {
  if (email.value.trim() === '' || password.value.trim() === '' || name.value.trim() === '') {
    errMsg.value = 'Please fill in all fields';
    return false;
  }
  if(password.value.length < 8) {
    errMsg.value = 'Password must be at least 8 characters';
    return false;
  }
  return true;
}

const parseError = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      errMsg.value = 'Please enter a valid email address';
      break;
    case 'auth/user-disabled':
      errMsg.value = 'User disabled';
      break;
    case 'auth/email-already-exists':
      errMsg.value = 'This email is already in use';
      break;
    case 'auth/account-exists-with-different-credential':
      errMsg.value = 'This email is already in use';
      break;
    default:
      errMsg.value = 'An error has occurred';
  }
}

const isLoading = ref(false);

const register = async () => {
  isLoading.value = true;
  if (!validate()) {
    return;
  }
  await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        const user = getAuth().currentUser!;
        updateProfile(user, {
          displayName: name.value
        })
        router.push('/home');
      })
      .catch((error) => {
        parseError(error);
      });
  isLoading.value = false;
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
      .then(result => {
        router.push('/home');
      })
      .catch(error => {
        parseError(error);
      })
}

const signInWithGithub = () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(getAuth(), provider)
      .then(result => {
        console.log(result.user)
        router.push('/home');
      })
      .catch(error => {
        parseError(error);
      })
}
</script>

<template>
  <img src="../assets/blobBackground.svg" alt="Background" class="w-screen h-screen object-cover">
  <div class="flex h-screen justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="flex flex-col gap-4 p-12 bg-white rounded-md">
      <div class="flex justify-center mb-5">
        <h1 class="text-4xl font-title text-gray-700">Sign up</h1>
      </div>
      <BaseInput
          name="full name"
          placeholder="Enter your name"
          v-model="name"
          class="w-full"
      >
        Full name
      </BaseInput>
      <BaseInput
          name="email"
          placeholder="Enter your email"
          v-model="email"
          class="w-full"
      >
        Email
      </BaseInput>
      <BaseInput
          name="password"
          placeholder="Enter your password"
          v-model="password"
          class="w-full"
      >
        Password
      </BaseInput>

      <BaseButton
          @click="register"
          class="px-5 mt-3"
      >
        <span v-if="!isLoading">Sign up</span>
        <span v-else class="flex justify-center"><BaseSpinner :size="24" color="#ffffff"/></span>
      </BaseButton>
      <p v-if="errMsg" class="font-body text-red-500 text-sm">{{ errMsg }}</p>
      <BaseButton
          type="secondary"
          @click="signInWithGoogle"
      >
        <div class="flex items-center gap-2 justify-center">
          <font-awesome-icon :icon="['fab', 'google']" class="text-primary"/>
          Continue with Google
        </div>
      </BaseButton>
      <BaseButton
          type="secondary"
          @click="signInWithGithub"
      >
        <div class="flex items-center gap-2 justify-center">
          <font-awesome-icon :icon="['fab', 'github']" class="text-primary"/>
          Continue with GitHub
        </div>
      </BaseButton>
      <p class="font-body w-72 text-center text-gray-600 -mb-6">Already have an acount?
        <br>
        <RouterLink to="/login" class="text-primary underline">Login</RouterLink>
        instead
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>