<script setup lang="ts">

import {ref} from "vue";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
    sendPasswordResetEmail,
} from "firebase/auth";
import {useRouter} from "vue-router";
import BaseInput from "@/components/UI/BaseInput.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

const email = ref('');
const password = ref('');
const router = useRouter();

const errMsg = ref('');

const validate = () => {
  if (email.value.trim() === '' || password.value.trim() === '') {
    errMsg.value = 'Please fill in all fields';
    return false;
  }
  if(password.value.length < 8) {
    errMsg.value = 'Password must be at least 8 characters';
    return false;
  }
  return true;
}

const login = async () => {
  isLoading.value = true;
  if (!validate()) {
    return;
  }
  await signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        router.push('/home');
      })
      .catch((error) => {
        console.log(error.code);
        switch(error.code) {
          case 'auth/invalid-email':
            errMsg.value = 'Please enter a valid email address';
            break;
          case 'auth/user-disabled':
            errMsg.value = 'User disabled';
            break;
          case 'auth/user-not-found':
            errMsg.value = 'No user found with this email';
            break;
          case 'auth/wrong-password':
            errMsg.value = 'Email and password do not match';
            break;
          case 'auth/account-exists-with-different-credential':
            errMsg.value = 'An account already exists with these credentials - please sign in with the correct provider';
            break;
          default:
            errMsg.value = 'An error has occurred';
        }
      });
  isLoading.value = false;
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

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider)
      .then(result => {
        console.log(result.user)
        router.push('/home');
      })
      .catch(error => {
        parseError(error);
      })
}

const signInWithGithub = () => {
    console.log('GITHUB PROVIDER')
  const provider = new GithubAuthProvider();
  signInWithPopup(getAuth(), provider)
      .then(result => {
          console.log("SIGNED IN WITH POPUP")
          console.log(result);
        console.log(result.user)
        router.push('/home');
      })
      .catch(error => {
        parseError(error);
      })
}
</script>

<template>
  <img src="../../assets/blobBackground.svg" alt="Background" class="w-screen h-screen object-cover">
  <div class="flex h-screen justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="flex flex-col gap-3 xl:gap-4 p-8 xl:p-12 xl:px-14 bg-white rounded-md">
      <div class="flex justify-center mb-5">
        <h1 class="text-4xl font-title text-gray-700">Log in</h1>
      </div>
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
          type="password"
          v-model="password"
          class="w-full"
      >
        Password
      </BaseInput>
      <div class="flex justify-end -mt-3 -mb-3 text-tiny">
        <RouterLink to="/forgot-password" class="text-primary underline">Forgot your password?</RouterLink>
      </div>
      <BaseButton
          @click="login"
          class="px-5 mt-3"
      >
        <span v-if="!isLoading">Log in</span>
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
      <p class="font-body text-center text-gray-600 -mb-3 xl:-mb-6 w-72">Don't have an account?
        <br>
        <RouterLink to="/register" class="text-primary underline">Register</RouterLink>
        instead
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>