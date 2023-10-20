<script lang="ts" setup>
import NotebookItem from "@/components/layout/Sidebar/NotebookItem.vue";
import {computed, inject, ref, watchEffect} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";
import NotebookItemNewInput from "@/components/layout/Sidebar/NotebookItemNewInput.vue";
import SidebarUserDisplay from "@/components/layout/Sidebar/SidebarUserDisplay.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {onClickOutside} from "@vueuse/core";
import BaseToast from "@/components/UI/BaseToast.vue";

const notebookStore = useNotebookStore();
const notebooks = computed(() => notebookStore.notebooks);
const isLoading = computed(() => notebookStore.isProcessing);

const isInputtingNewNotebook = ref(false);
const addNotebookInput = () => {
    isInputtingNewNotebook.value = true;
}

const saveNotebook = (name: string) => {
    isInputtingNewNotebook.value = false;
    notebookStore.addNotebook(name);
    closeSidebar();
    showSuccessToast.value = true;
    setTimeout(() => {
        showSuccessToast.value = false;
    }, 3000);
}

const setSelectedNotebook = (id: string) => {
    notebookStore.setSelectedNotebook(id);
    closeSidebar();
}

const isOpen = ref(true);
const windowWidth = inject('windowWidth');
const isMobile = computed(() => (windowWidth as {value: number}).value < 1280);
watchEffect(() => {
  if(!isMobile.value){
    isOpen.value = true;
  }
});
const closeSidebar = () => {
  if(isMobile.value){
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

const showSuccessToast = ref(false);
const toastTitle = ref('Success!');
const toastDescription = ref('Notebook created successfully.');

</script>

<template>
    <div v-if="isOpen"
         ref="container"
         class="p-6 drop-shadow-side bg-white h-screen flex flex-col gap-10 xl:gap-16"
    >
        <div class="flex justify-end xl:hidden"
             @click="closeSidebar"
        >
            <button class="p-2 px-3 font-title text-gray-400 -mb-3">
                <font-awesome-icon :icon="['fas', 'arrow-left']"
                                   size="lg"
                                   class="mr-1"
                /> Close
            </button>
        </div>
        <img alt="Logo"
             class="h-10 object-contain"
             src="../../../assets/logo.webp">
        <!--    Notebooks section-->
        <div>
            <SidebarUserDisplay/>
        </div>
        <div>
            <div class="flex items-center justify-between">
                <h3 class="font-title text-gray-600">
                    <font-awesome-icon :icon="['fas', 'book']" class="pr-1" size="sm"/>
                    Notebooks
                </h3>
                <button class="text-primary addNotebookBtn"
                        @click="addNotebookInput"
                >
                    <font-awesome-icon :icon="['fas', 'circle-plus']"
                                       class="hover:scale-110 transition-transform"
                                       size="xl"/>
                </button>
            </div>
            <!--      Notebook display-->
          <div class="py-2 flex flex-col gap-2">
                <NotebookItemNewInput
                        v-if="isInputtingNewNotebook"
                        @addNotebook="saveNotebook"
                        @fail="isInputtingNewNotebook = false"
                        class="mt-2 -mb-1"
                />
                <div v-if="!isLoading" class="mt-2 flex flex-col gap-2">
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
      <BaseToast :show="showSuccessToast" variant="success">
        <template #default>{{ toastTitle }}</template>
        <template #description>{{ toastDescription }}</template>
      </BaseToast>
    </div>

</template>