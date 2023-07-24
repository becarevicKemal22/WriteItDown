<script lang="ts" setup>
import NotebookItem from "@/components/layout/Sidebar/NotebookItem.vue";
import {computed, ref} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";
import NotebookItemNewInput from "@/components/layout/Sidebar/NotebookItemNewInput.vue";
import SidebarUserDisplay from "@/components/layout/Sidebar/SidebarUserDisplay.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {onClickOutside} from "@vueuse/core";

const notebookStore = useNotebookStore();
const notebooks = computed(() => notebookStore.notebooks);
const isLoading = computed(() => notebookStore.isProcessing);

const isInputtingNewNotebook = ref(false);
const addNotebookInput = () => {
    isInputtingNewNotebook.value = true;
}

const saveNotebook = (name) => {
    isInputtingNewNotebook.value = false;
    notebookStore.addNotebook(name);
    closeSidebar();
}

const setSelectedNotebook = (id) => {
    notebookStore.setSelectedNotebook(id);
    closeSidebar();
}

const isOpen = ref(false);
const isMobile = computed(() => window.innerWidth < 1280);
const closeSidebar = () => {
    if (isMobile.value) {
        isOpen.value = false;
    }
}
const container = ref<HTMLDivElement | null>(null);

const openSidebar = () => {
    isOpen.value = true;
}
onClickOutside(container, closeSidebar);

defineExpose({
    openSidebar,
})
</script>

<template>
    <div
            v-if="isOpen"
            ref="container"
            class="p-6 drop-shadow-side bg-white h-screen flex flex-col gap-6"
    >
        <div class="flex justify-end xl:hidden" @click="closeSidebar">
            <button class="p-2 px-3 bg-primary rounded-md font-title text-white">
                <font-awesome-icon :icon="['fas', 'arrow-left']" size="lg" class="mr-1"/>
                Close
            </button>
        </div>
        <img alt="Logo"
             class="w-32 h-16 mb-6"
             src="https://placehold.co/800x200">
        <!--    Notebooks section-->
        <div>
            <SidebarUserDisplay/>
        </div>
        <div>
            <div class="flex items-center justify-between">
                <h3 class="font-title text-gray-700">
                    <font-awesome-icon :icon="['fas', 'book']" class="pr-1" size="sm"/>
                    Notebooks
                </h3>
                <button
                        class="text-primary addNotebookBtn"
                        @click="addNotebookInput"
                >
                    <font-awesome-icon :icon="['fas', 'circle-plus']"
                                       class="hover:scale-110 transition-transform"
                                       size="xl"/>
                </button>
            </div>
            <!--      Notebook display-->
            <div class="ml-2 mt-2 p-2 flex flex-col gap-2">
                <NotebookItemNewInput
                        v-if="isInputtingNewNotebook"
                        @addNotebook="saveNotebook"
                        @fail="isInputtingNewNotebook = false"
                />
                <div v-if="!isLoading" class="flex flex-col gap-2">
                    <NotebookItem
                            v-for="notebook in notebooks"
                            :id="notebook.id"
                            :key="notebook.id"
                            :active="notebook.id === notebookStore.selectedNotebook"
                            @makeSelected="setSelectedNotebook"
                    >
                        {{ notebook.name }}
                    </NotebookItem>
                </div>
                <div v-else class="flex justify-center mt-2">
                    <BaseSpinner :size="25" color="primary"/>
                </div>
            </div>
        </div>
        <!--    Tag section-->
        <!--    <div class="">-->
        <!--      <div class="flex items-center justify-between">-->
        <!--        <h3 class="font-title text-gray-700">-->
        <!--          <font-awesome-icon :icon="['fas', 'tags']" class="pr-1" size="sm"/>-->
        <!--          Tags-->
        <!--        </h3>-->
        <!--        <button class="text-primary">-->
        <!--          <font-awesome-icon :icon="['fas', 'circle-plus']" class="hover:scale-110 transition-transform"-->
        <!--                             size="xl"/>-->
        <!--        </button>-->
        <!--      </div>-->
        <!--    </div>-->
    </div>
</template>