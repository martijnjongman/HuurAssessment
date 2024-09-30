<script setup lang="ts">
import ListingGrid from './components/ListingGrid.vue';
import Filters from './components/Filters.vue';

</script>

<template>
  <div class="max-w-screen-2xl m-auto py-14 px-6 lg:px-28">
    <div class="flex flex-col lg:flex-row justify-between text-brand-dark-gray pb-8 mb-8 border-b border-brand-light-gray">
      <h1 class="text-2xl lg:text-4xl font-semibold">Huurwoningen in Nederlands</h1>
      
      <span class="text-base lg:text-xl font-semibold">30 resultaten</span>
    </div>

    <div class="flex flex-col lg:flex-row lg:gap-14">
      <Filters />
  
      <ListingGrid />
    </div>
  </div>
</template>
