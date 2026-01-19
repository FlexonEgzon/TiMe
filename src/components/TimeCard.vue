<script setup lang="ts">
import type { TimeCard } from '../stores/types/TimeCard';
const props = defineProps<{ card: TimeCard }>(); //Interface of Timecard that makes possible to use it in the template

const emit = defineEmits<{
  (e: 'remove-card', id: number): void // Before const emit = defineEmits(['remove-card']) Reason: Its a Parameter check for id: number (id is required and needs to be a number)
}>()

const removeCard = () => {
  emit('remove-card', props.card.id);
}
</script>

<template>
  <div class="border rounded-xl p-4 shadow bg-white w-full max-w-sm">

    <div class="flex flex-row justify-between">

      <h2 class="text-lg font-semibold mb-2"> {{ props.card.title }} </h2>

      <!-- its just a button :-( -->
      <div @click="removeCard" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer 
         transition-all bg-gray-100 hover:bg-gray-300 hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>


    </div>
    <div class="text-3xl font-bold mb-4">
      {{ props.card.time === 0 ? "00:00:00" : props.card.time }}
    </div>

    <div class="flex gap-2">
      <button class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Start
      </button>

      <button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
        Stopp
      </button>
    </div>
  </div>
</template>
