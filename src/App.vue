<script setup lang="ts">
import NewTimeCardButton from './components/NewTimeCardButton.vue';
import TimeCardList from './components/TimeCardList.vue';
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-r from-slate-950 via-slate-900 to-zinc-950 bg-[length:300%_300%] animate-backgroundFlow p-6 ">

    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
      <!-- left / TimeCardButton -->
      <div class="md:justify-self-start">
        <div
          class="inline-flex rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
          <new-time-card-button />
        </div>
      </div>

      <!-- mid / title -->
      <h1 class="md:justify-self-center justify-self-center
           inline-flex justify-center
           text-4xl md:text-6xl font-extrabold
           text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300
           animate-float
           border border-white/10 rounded-2xl px-6 md:px-8 py-2
           backdrop-blur-sm bg-white/5 shadow-lg shadow-cyan-500/10">
        TiMe
      </h1>

      <!-- right space -->
      <div class="hidden md:block"></div>
    </div>









    <time-card-list />
  </div>


</template>

<style scoped></style>
