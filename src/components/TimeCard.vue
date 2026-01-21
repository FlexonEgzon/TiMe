<script setup lang="ts">
import { computed } from 'vue'
import type { TimeCard } from '../stores/types/TimeCard'
import { formatTime } from '../utils/formatTime'
import { useTickPulse } from '../composables/useTickPulse'

const props = defineProps<{ card: TimeCard }>() //Interface of Timecard that makes possible to use it in the template
const { tickPulse } = useTickPulse(() => props.card.isRunning, { pulseMs: 90 })

const formattedTime = computed(() => formatTime(props.card.timeMs))

const emit = defineEmits<{
  (e: 'remove-card', id: number): void // Before: const emit = defineEmits(['remove-card']) Reason: Its a Parameter check for id: number (id is required and needs to be a number)
  (e: 'start-card', id: number): void // Start card by firing event
  (e: 'stop-card', id: number): void //Stop card by firing event
}>()

const removeCard = () => {
  emit('remove-card', props.card.id)
}
const startCard = () => {
  emit('start-card', props.card.id)
}
const stopCard = () => {
  emit('stop-card', props.card.id)
}
</script>

<template>
  <div :class="[
    'rounded-xl p-4 w-full max-w-sm transition-all duration-300',
    props.card.isRunning
      ? 'bg-white shadow-xl ring-4 ring-green-400/70 border border-green-500 scale-[1.01]'
      : 'bg-white shadow border border-gray-200',
    tickPulse ? 'ring-green-500/90 shadow-2xl ring-offset-2 ring-offset-white' : '',
  ]">
    <div class="flex flex-row justify-between">
      <h2 class="text-lg font-semibold mb-2">{{ props.card.title }}</h2>

      <!-- its just a button :-( -->
      <div @click="removeCard"
        class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all bg-gray-100 hover:bg-gray-300 hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
    <div class="text-3xl font-bold mb-4">
      {{ formattedTime }}
    </div>

    <div class="flex gap-2">
      <button @click="startCard" v-if="!props.card.isRunning"
        class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Start
      </button>

      <button @click="stopCard" v-if="props.card.isRunning"
        class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
        Stop
      </button>
    </div>
  </div>
</template>
