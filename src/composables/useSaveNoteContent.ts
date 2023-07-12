import { ref } from 'vue';
import {useNoteStore} from "@/stores/noteStore";

export function useSaveNoteContent() {
    const noteContent = ref<string>('');
    const isSaving = ref(false);
    const noteStore = useNoteStore();
    noteContent.value = noteStore.selectedNote.content;



    const saveNoteContent = async (newContent: string) => {

    }

    return { noteContent, saveNoteContent };
}