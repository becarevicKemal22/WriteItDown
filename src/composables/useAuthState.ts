import {computed, onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import type {User} from "firebase/auth";

export const useAuthState = () => {
    const user = ref<User | null>(null);
    const error = ref<Error | null>(null);
    const auth = getAuth();
    onMounted(() => {
        onAuthStateChanged(
            auth,
            u => {user.value = u;
                console.log(user.value)},
            e => error.value = e
        )
    })

    const isAuthenticated = computed(() => user.value !== null);

    const getUserState = () => {
        new Promise((resolve, reject) => {
            onAuthStateChanged(getAuth(), resolve, reject)
        });
    }

    return {user, error, isAuthenticated, getUserState};
}