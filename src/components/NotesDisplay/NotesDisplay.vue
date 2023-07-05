<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import BaseSearch from "@/components/UI/BaseSearch.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import NoteItem from "@/components/NotesDisplay/NoteItem.vue";

const note = {
  title: 'My note',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, adipisci aliquam asperiores atque autem commodi consequatur cumque cupiditate deserunt doloribus ducimus ea earum eius eos error esse est eum eveniet ex exercitationem facilis fugiat fugit hic id illum impedit in incidunt ipsa ipsum iure laboriosam laborum libero magnam magni maiores maxime minima minus molestiae mollitia natus nemo neque nisi nobis nostrum nulla numquam obcaecati odio officia officiis omnis optio pariatur perferendis perspiciatis placeat porro possimus praesentium provident quae quas quia quibusdam quisquam quod quos ratione recusandae rem repellat reprehenderit repudiandae rerum saepe sapiente sequi similique sint sit soluta sunt suscipit tempora temporibus tenetur totam ullam unde ut vel veniam veritatis voluptas voluptate voluptatem voluptates voluptatum.',
  tags: ['School', 'Important'],
  lastUpdate: '2 hours ago',
}

</script>

<template>
  <div class="w-[26rem] bg-gray-50">
    <div class="bg-primary p-8 w-full flex items-center justify-start rounded-b-2xl">
      <h2 class="text-white text-xl font-title">
        <font-awesome-icon :icon="['fas', 'book']" class="pr-1" size="sm"/>
        Notebook name
      </h2>
    </div>
    <div class="mt-3 p-6">
      <BaseSearch/>
      <div class="mt-6 flex justify-between items-center">
        <h3 class="font-title text-lg text-gray-600 mr-28">
          <font-awesome-icon :icon="['fas', 'file']" class="mr-1" size="sm"/>
          Notes
        </h3>
        <BaseButton class="text-tiny">Add new note</BaseButton>
      </div>
      <div class="mt-6">
        <NoteItem :note="note"></NoteItem>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>