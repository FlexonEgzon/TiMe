<script setup lang="ts">
import { useCardStore } from '../stores/cardStore'
import TimeCard from './TimeCard.vue'

const store = useCardStore();

const removeCard = (cardId: number) => {
  store.removeCard(cardId);
}

</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    <TimeCard v-for="card in store.cards" @remove-card="removeCard" :key="card.id" :card="card" />
  </div>
</template>
