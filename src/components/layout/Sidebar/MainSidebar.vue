<script setup lang="ts">
import NotebookItem from "@/components/layout/Sidebar/NotebookItem.vue";
import {computed, ref} from "vue";
import {useNotebookStore} from "@/stores/notebookStore";
import NotebookItemNewInput from "@/components/layout/Sidebar/NotebookItemNewInput.vue";
import SidebarUserDisplay from "@/components/layout/Sidebar/SidebarUserDisplay.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

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
}

const setSelectedNotebook = (id) => {
  notebookStore.setSelectedNotebook(id);
}
</script>

<template>
  <div class="p-6 drop-shadow-side bg-white h-screen transition-all ease flex flex-col gap-6">
    <img alt="Logo"
         class="w-32 h-16 mb-6"
         src="https://placehold.co/800x200">
    <!--    Notebooks section-->
    <div>
      <SidebarUserDisplay/>
    </div>
    <div class="">
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
          <div v-if="!isLoading">
            <NotebookItem
                          v-for="notebook in notebooks"
                          :key="notebook.id"
                          :id="notebook.id"
                          :active="notebook.id === notebookStore.selectedNotebook"
                          @makeSelected="setSelectedNotebook"
            >
              {{ notebook.name }}
            </NotebookItem>
          </div>
          <div v-else class="flex justify-center">
            <BaseSpinner :size="25" color="primary"/>
          </div>
      </div>
    </div>
    <!--    Tag section-->
    <div class="">
      <div class="flex items-center justify-between">
        <h3 class="font-title text-gray-700">
          <font-awesome-icon :icon="['fas', 'tags']" class="pr-1" size="sm"/>
          Tags
        </h3>
        <button class="text-primary">
          <font-awesome-icon :icon="['fas', 'circle-plus']" class="hover:scale-110 transition-transform"
                             size="xl"/>
        </button>
      </div>
    </div>
  </div>
</template>