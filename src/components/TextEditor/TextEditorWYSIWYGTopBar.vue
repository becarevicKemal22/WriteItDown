<script setup lang="ts">

import {Editor} from "@tiptap/vue-3";
import type {ref} from "vue";
import BaseEditorModifier from "@/components/TextEditor/BaseEditorModifier.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import TextEditorWYSIWYGTopBarSection from "@/components/TextEditor/TextEditorWYSIWYGTopBarSection.vue";

interface Props {
  editor: ref<Editor | undefined>;
}

const props = defineProps<Props>();

const toggleHeading = () => {
  props.editor.chain().focus().toggleHeading({level: 1}).run()
}

const toggleParagraph = () => {
  if (props.editor.isActive('orderedList')) {
    toggleOrderedList();
  } else if (props.editor.isActive('bulletList')) {
    toggleBulletList();
  }
  props.editor.chain().focus().setParagraph().run()
}

const toggleBulletList = () => {
  props.editor.chain().focus().toggleBulletList().run()
}

const toggleOrderedList = () => {
  props.editor.chain().focus().toggleOrderedList().run();
}

const toggleCodeBlock = () => {
  props.editor.chain().focus().toggleCodeBlock().run();
}

const toggleBold = () => {
  props.editor.chain().focus().toggleBold().run()
}

const toggleItalic = () => {
  props.editor.chain().focus().toggleItalic().run()
}

const toggleUnderline = () => {
  props.editor.chain().focus().toggleUnderline().run()
}

const toggleBlockquote = () => {
  props.editor.chain().focus().toggleBlockquote().run()
}

const setTextAlign = (alignment: 'left' | 'right' | 'center' | 'justify') => {
  props.editor.chain().focus().setTextAlign(alignment).run();
}

const undo = () => {
  props.editor.chain().focus().undo().run();
}

const redo = () => {
  props.editor.chain().focus().redo().run();
}

</script>

<template>
  <BaseCard class="drop-shadow-md self-center w-fit px-1 mb-10">
    <div class="editorTopBar flex gap-3 flex-wrap justify-center xl:divide-x xl:flex-nowrap">
      <TextEditorWYSIWYGTopBarSection dropdown-mobile :dropdown-icon="['fas', 'heading']">
        <BaseEditorModifier
            :isActive="editor?.isActive('heading', {level: 1})"
            @click="toggleHeading"
        >
          <font-awesome-icon :icon="['fas', 'heading']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="(editor?.isActive('paragraph')) && !(editor?.isActive('orderedList') || editor?.isActive('bulletList'))"
            @click="toggleParagraph"
        >
          <font-awesome-icon :icon="['fas', 'paragraph']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="editor?.isActive('bulletList')"
            @click="toggleBulletList"
        >
          <font-awesome-icon :icon="['fas', 'list-ul']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="editor?.isActive('orderedList')"
            @click="toggleOrderedList"
        >
          <font-awesome-icon :icon="['fas', 'list-ol']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="editor?.isActive('codeBlock')"
            @click="toggleCodeBlock"
        >
          <font-awesome-icon :icon="['fas', 'code']"/>
        </BaseEditorModifier>
      </TextEditorWYSIWYGTopBarSection>
<!--      <div class="p-[1px] bg-gray-200"></div>-->
      <TextEditorWYSIWYGTopBarSection>
        <BaseEditorModifier
            :isActive="editor?.isActive('bold')"
            :disabled="!editor?.can().chain().focus().toggleBold().run()"
            @click="toggleBold"
        >
          <font-awesome-icon :icon="['fas', 'bold']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="editor?.isActive('italic')"
            :disabled="!editor?.can().chain().focus().toggleItalic().run()"
            @click="toggleItalic"
        >
          <font-awesome-icon :icon="['fas', 'italic']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="editor?.isActive('underline')"
            :disabled="!editor?.can().chain().focus().toggleUnderline().run()"
            @click="toggleUnderline"
        >
          <font-awesome-icon :icon="['fas', 'underline']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="editor?.isActive('blockquote')"
            :disabled="!editor?.can().chain().focus().toggleBlockquote().run()"
            @click="toggleBlockquote"
        >
          <font-awesome-icon :icon="['fas', 'quote-left']"/>
        </BaseEditorModifier>
      </TextEditorWYSIWYGTopBarSection>
<!--      <div class="p-[1px] bg-gray-200"></div>-->
      <TextEditorWYSIWYGTopBarSection>
        <BaseEditorModifier
            :isActive="editor?.isActive({textAlign: 'left'})"
            :disabled="!editor?.can().chain().focus().setTextAlign('left').run()"
            @click="setTextAlign('left')"
        >
          <font-awesome-icon :icon="['fas', 'align-left']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="editor?.isActive({textAlign: 'center'})"
            :disabled="!editor?.can().chain().focus().setTextAlign('center').run()"
            @click="setTextAlign('center')"
        >
          <font-awesome-icon :icon="['fas', 'align-center']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="editor?.isActive({textAlign: 'right'})"
            :disabled="!editor?.can().chain().focus().setTextAlign('right').run()"
            @click="setTextAlign('right')"
        >
          <font-awesome-icon :icon="['fas', 'align-right']"/>
        </BaseEditorModifier>
        <BaseEditorModifier
            :isActive="editor?.isActive({textAlign: 'justify'})"
            :disabled="!editor?.can().chain().focus().setTextAlign('justify').run()"
            @click="setTextAlign('justify')"
        >
          <font-awesome-icon :icon="['fas', 'align-justify']"/>
        </BaseEditorModifier>
      </TextEditorWYSIWYGTopBarSection>
<!--      <div class="p-[1px] bg-gray-200"></div>-->
      <TextEditorWYSIWYGTopBarSection>
        <BaseEditorModifier
            :disabled="!editor?.can().chain().focus().undo().run()"
            @click="undo"
        >
          <font-awesome-icon :icon="['fas', 'arrow-turn-up']" rotation=270 />
        </BaseEditorModifier>
        <BaseEditorModifier
            :disabled="!editor?.can().chain().focus().redo().run()"
            @click="redo"
        >
          <font-awesome-icon :icon="['fas', 'arrow-turn-down']" rotation="270"/>
        </BaseEditorModifier>
      </TextEditorWYSIWYGTopBarSection>
    </div>
  </BaseCard>
</template>

<style scoped>

</style>