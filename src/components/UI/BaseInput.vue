<script lang="ts" setup>
import {ref} from "vue";

interface Props {
    modelValue: string;
    name: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number';
}

defineProps<Props>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const update = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value);
}

const inputFocused = ref(false);
const showingPassword = ref(false);
const elInput = ref<HTMLInputElement | null>(null);
const togglePasswordVisibility = () => {
    console.log('togglePasswordVisibility')
    const input = document.querySelector('input[ispassword="true"]') as HTMLInputElement;
    input.focus();
    if (input.type === 'password') {
        input.type = 'text';
        showingPassword.value = true;
        setTimeout(() => elInput.value?.focus(), 1);
    } else {
        input.type = 'password';
        showingPassword.value = false;
        setTimeout(() => elInput.value?.focus(), 1);
    }
}
</script>

<template>
    <div class="flex flex-col gap-1 relative">
        <p class="font-body text-sm text-gray-600">
            <slot></slot>
        </p>
        <input
                ref="elInput"
                :name="name"
                :placeholder="placeholder"
                :type="type || 'text'"
                :ispassword="type === 'password'"
                class="p-1 placeholder text-gray-700 font-body border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-light transition-colors"
                @input="update"
                @focus="inputFocused = true"
                @blur="inputFocused = false"
        >
        <button
                v-if="type === 'password' && inputFocused"
                @mousedown.left="togglePasswordVisibility"
                class="absolute top-1/2 right-3 transform focus:outline-none"
        >
            <span>
              <font-awesome-icon v-if="!showingPassword" :icon="['fas', 'eye']" class="text-gray-500" size="xs"/>
              <font-awesome-icon v-else :icon="['fas', 'eye-slash']" class="text-gray-500" size="xs"/>
            </span>
        </button>
    </div>
</template>

<style scoped>

</style>