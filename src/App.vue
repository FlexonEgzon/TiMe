<script setup lang="ts">
import NewTimeCardButton from './components/NewTimeCardButton.vue';
import TimeCardList from './components/TimeCardList.vue';
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:300%_300%] animate-backgroundFlow p-6">

    
    <h1 class="text-6xl font-extrabold text-center mt-5 mb-5 text-blue-600 animate-float
           border border-blue-300 rounded-2xl px-8 py-2 backdrop-blur-sm bg-white/40 shadow-md">
  TiMe
</h1>



    <new-time-card-button/>
    <time-card-list/>
    </div>


</template>

<style scoped></style>
