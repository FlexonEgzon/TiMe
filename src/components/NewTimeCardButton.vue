<script setup lang="ts">
import { useCardStore } from '../stores/cardStore'

const store = useCardStore();

//Create a new instance of a Card
const newTimeCard = () => {
  store.addCard();
}
</script>

<template>
  <button @click="newTimeCard"
    class="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-blue-800 transition">
    New Timecard
  </button>
</template>
