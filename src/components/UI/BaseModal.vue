<script setup lang="ts">

import BaseCard from "@/components/UI/BaseCard.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import {useSlots} from "vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

interface Props {
  primaryActionText?: string,
  secondaryActionText?: string,
  pending?: boolean;
  disableTeleport?: boolean;
}

withDefaults(defineProps<Props>(), {
  primaryActionText: "",
  secondaryActionText: "",
  pending: false,
  disableTeleport: false
});

const emit = defineEmits<{
  close: () => void;
  primaryAction: () => void;
  secondaryAction: () => void;
}>();

const close = () => {
  emit("close");
}

const primaryAction = () => {
  emit("primaryAction");
}
const secondaryAction = () => {
  emit("secondaryAction");
}

</script>

<template>
  <teleport :disabled="disableTeleport" to="#app">
    <div>
      <BaseCard class="modal w-80 xl:w-96 z-20 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-hidden">
        <div class="p-2">
          <div class="header p-1 pb-2 flex items-center gap-6 border-b-[1px] mb-4 justify-between text-gray-600">
            <h1 class="font-title text-xl xl:text-2xl"><slot name="title"></slot></h1>
            <button
                class="closeBtn hover:bg-gray-100 p-1 rounded transition-colors"
                @click="close"
            >
              <font-awesome-icon :icon="['fas', 'x']" class="fa-fw text-gray-500" size="sm"/>
            </button>
          </div>
          <div class="content p-1 font-body text-sm xl:text-md text-gray-500">
            <slot></slot>
          </div>
          <div class="footer mt-5 flex justify-end gap-4">
            <BaseButton v-if="secondaryActionText"
                        type="secondary"
                        class="text-tiny xl:text-sm secondaryAction"
                        @click="secondaryAction"
            >
              {{secondaryActionText}}
            </BaseButton>
            <BaseButton
                v-if="primaryActionText"
                class="text-tiny xl:text-sm primaryAction"
                @click="primaryAction"
            >
              {{primaryActionText}}
            </BaseButton>
          </div>
        </div>
        <div
            v-if="pending"
            class="spinner flex justify-center items-center w-full h-full absolute top-0 left-0 z-30 bg-black bg-opacity-20"
        >
          <BaseSpinner color="primary"
                       :size="48"
          />
        </div>
      </BaseCard>
      <div
          class="modalBackdrop z-10 w-screen h-screen bg-black bg-opacity-20 absolute top-0 left-0"
          @click="close"
      ></div>
    </div>
  </teleport>
</template>

<style scoped>

</style>