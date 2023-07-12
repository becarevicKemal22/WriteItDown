<script setup lang="ts">

import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import {useEditor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextEditorWYSIWYGTopBar from "@/components/TextEditor/TextEditorWYSIWYGTopBar.vue";
import {Underline} from "@tiptap/extension-underline";
import {TextAlign} from "@tiptap/extension-text-align";
import {useNoteStore} from "@/stores/noteStore";


const noteStore = useNoteStore();

const editor = ref(useEditor({
  content: noteStore.selectedNote.content,
  extensions: [
    Underline,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    StarterKit.configure({
      heading: {
        levels: [1],
        HTMLAttributes: {
          class: 'font-title text-2xl text-gray-600'
        }
      },
      bulletList: {
        HTMLAttributes: {
          class: 'list-disc ml-5'
        }
      },
      orderedList: {
        HTMLAttributes: {
          class: 'list-decimal ml-5'
        }
      },
      blockquote: {
        HTMLAttributes: {
          class: 'ml-2 border-l-[3px] border-primary-lighter pl-2'
        }
      },
      codeBlock: {
        HTMLAttributes: {
          class: 'p-3 bg-gray-700 text-white rounded-md'
        }
      },
    }),
  ],
  editorProps: {
    attributes: {
      class: 'p-2 focus:outline-none font-body text-gray-600 selection:text-white selection:bg-primary-light caret-sprimary-light'
    }
  }
}));

watch(() => editor.value?.getHTML(), (newVal, oldVal) => {
  if(oldVal === undefined){ // It is undefined when the editor is still loading - prevents unnecessary save
    return;
  }
  noteStore.saveNoteContent((newVal as string));
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});


</script>

<template>
  <div class="p-2 mt-10 w-full flex flex-col">
    <TextEditorWYSIWYGTopBar :editor="editor"/>
    <div class="editorContainer">
      <editor-content :editor="editor"/>
    </div>
  </div>
</template>

<style scoped>

</style>