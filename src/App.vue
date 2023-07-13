<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router'

import { onMounted, ref } from "vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";

const router = useRouter();

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/login');
  })
}
</script>

<template>
  <button @click.prevent="handleSignOut" v-if="isLoggedIn">Logout</button>
  <RouterView />
</template>

<style scoped>

</style>
