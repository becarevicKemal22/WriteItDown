<script setup lang="ts">

import BaseUserAvatar from "@/components/UI/BaseUserAvatar.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import {useAuthState} from "@/composables/useAuthState";
import {ref} from "vue";
import {getAuth, signOut} from "firebase/auth";
import {useRouter} from "vue-router";
import {onClickOutside} from "@vueuse/core";

const {user} = useAuthState();

const dropdownIsOpen = ref(false);
const arrowFlip = ref<boolean | 'vertical'>(false);
const toggleDropdown = () => {
  dropdownIsOpen.value = !dropdownIsOpen.value;
  arrowFlip.value = arrowFlip.value === false ? 'vertical' : false;
}

const elComponent = ref<HTMLDivElement | null>(null);
onClickOutside(elComponent, () => {
  dropdownIsOpen.value = false;
  arrowFlip.value = false;
});

const router = useRouter();
const auth = getAuth();
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/login');
  })
}
</script>

<template>
  <div
      class="flex select-none relative items-center justify-between font-body text-gray-600 rounded hover:bg-gray-100 cursor-pointer p-2"
      ref="elComponent"
      @click="toggleDropdown"
  >
    <div class="userDisplay flex items-center gap-3">
      <BaseUserAvatar :userName="user?.displayName"/>
      <h3 class="font-title">{{user?.displayName}}</h3>
    </div>
    <font-awesome-icon
        :flip="arrowFlip"
        :icon="['fas', 'caret-down']"
    />
    <BaseCard
        v-if="dropdownIsOpen"
        class=".dropdown absolute right-0 top-14 flex flex-col gap-2 text-sm"
    >
      <button class="signOutBtn text-red-400 flex gap-2 items-center rounded p-1 px-4 hover:bg-gray-100" @click="handleSignOut">
        <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />Sign out
      </button>
    </BaseCard>
  </div>
</template>

<style scoped>

</style>