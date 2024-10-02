<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, computed } from "vue";
import { useStore } from "./store/store";

import Filters from "./components/Filters.vue";

const store = useStore();

const ListingGrid = defineAsyncComponent(
  () => import("./components/ListingGrid.vue")
);

const listingItems = ref<any[]>([]);

// Fetching data
onMounted(async () => {
  // Simulate fetch delay
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  try {
    await sleep(500);

    const responses = await Promise.all([
      fetch("/data/api-free-p1.json"),
      fetch("/data/api-free-p2.json"),
      fetch("/data/api-free-p3.json"),
      fetch("/data/api-premium-p1.json"),
    ]);

    const data = await Promise.all(
      responses.map((responses) => responses.json())
    );
    listingItems.value = data.flatMap((item) => item.data.houses);
    // Putting data in store
    store.dispatch("setListingItems", listingItems.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const totalResults = computed(() => store.getters.filteredItems.length);
</script>

<template>
  <div class="max-w-screen-2xl m-auto py-14 px-6 lg:px-28">
    <div
      class="flex flex-col lg:flex-row justify-between text-brand-dark-gray pb-8 mb-8 border-b border-brand-light-gray"
    >
      <h1 class="text-2xl lg:text-4xl font-semibold">
        Huurwoningen in Nederlands
      </h1>

      <span class="text-base lg:text-xl font-semibold"
        >{{ totalResults }} resultaten</span
      >
    </div>

    <div class="flex flex-col lg:flex-row lg:gap-14">
      <Filters />

      <Suspense>
        <template #default>
          <ListingGrid />
        </template>
        <template #fallback>
          <div
            class="flex-1 h-56 flex justify-center items-center font-bold text-xl"
          >
            Woningen laden...
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>
