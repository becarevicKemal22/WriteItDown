<script lang="ts" setup>

import BaseUserAvatar from "@/components/UI/BaseUserAvatar.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import {useAuthState} from "@/composables/useAuthState";
import {computed, ref} from "vue";
import {getAuth, signOut} from "firebase/auth";
import {useRouter} from "vue-router";
import {onClickOutside} from "@vueuse/core";
import {useNoteStore} from "@/stores/noteStore";
import {useNotebookStore} from "@/stores/notebookStore";

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
    const noteStore = useNoteStore();
    noteStore.$reset();
    const notebookStore = useNotebookStore();
    notebookStore.$reset();
    signOut(auth).then(() => {
        router.push({name: 'Login'});
    })
}

const userNameOrPhotoURL = computed((): string | undefined => {
    return (user.value?.photoURL ?? user.value?.displayName) as string | undefined;
});

</script>

<template>
    <div
            ref="elComponent"
            class="flex select-none relative items-center justify-between font-body text-gray-600 rounded cursor-pointer"
            @click="toggleDropdown"
    >
        <div class="userDisplay grid grid-cols-8 items-center overflow-hidden">
            <BaseUserAvatar :userNameOrURL="userNameOrPhotoURL" class="col-span-2"/>
            <h3 class="font-title col-span-6">{{ user?.displayName }}</h3>
        </div>
        <font-awesome-icon
                :flip="arrowFlip"
                :icon="['fas', 'caret-down']"
        />
        <BaseCard
                v-if="dropdownIsOpen"
                class=".dropdown absolute left-0 top-11 w-full flex flex-col gap-0.5 text-sm"
        >
            <button class="changePictureButton text-gray-600 flex gap-2 items-center rounded p-2 -ml-1 hover:bg-gray-100"
                    >
              <font-awesome-icon :icon="['fas', 'circle-user']" fixed-width/>
              Profile picture
            </button>
            <button class="signOutBtn text-gray-600 flex gap-2 items-center rounded p-2 -ml-1 hover:bg-gray-100"
                    @click="handleSignOut">
                <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" fixed-width/>
                Sign out
            </button>
        </BaseCard>
    </div>
</template>

<style scoped>

</style>