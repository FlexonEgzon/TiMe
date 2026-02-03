<script setup lang="ts">
import { useCardStore } from '../stores/cardStore'
import TimeCard from './TimeCard.vue'
import { ref, computed } from 'vue'
import TimeCardDetailsModal from './TimeCardDetailsModal.vue'
import type { SaveDetailsPayload } from '../types/TimeCardDetailsPayload'


const store = useCardStore()
const { removeCard, startCard, stopCard, renameCard, updateDescription } = store
let activeCardId = ref<number | null>(null);
const currCard = computed(() => { //Get Card that has been clicked for description/details
  return activeCardId.value === null ? undefined : store.cards.find(x => x.id === activeCardId.value)
})



//Function for Modal openening
function openDetails(cardId: number) {
  activeCardId.value = cardId;
  console.log('open Details ', activeCardId.value)
}
function closeDetails() {
  activeCardId.value = null;
}
function saveDetails(payload: SaveDetailsPayload) {
  updateDescription(payload.id, payload.description)
  renameCard(payload.id, payload.title)
  closeDetails()
}
</script>



<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    <TimeCard v-for="card in store.cards" @remove-card="removeCard" @start-card="startCard" @stop-card="stopCard"
      @rename-card="renameCard" @open-details="openDetails" :key="card.id" :card="card" />
    <TimeCardDetailsModal v-if="currCard" :key="currCard.id" :card="currCard" @close-modal="closeDetails"
      @save-modal="saveDetails" />
  </div>
</template>
