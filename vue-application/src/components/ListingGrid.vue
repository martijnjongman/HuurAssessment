<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useStore } from "../store/store";

import HousingCard from "./HousingCard.vue";
import PaginationControls from "./PaginationControls.vue";

import {
  getPaginatedItems,
  calculateTotalPages,
  generatePaginationNumbers,
} from "../utils/pagination";

const store = useStore();

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

const itemsPerPage = 10;
const currentPage = ref(1);

const filteredItems = computed(() => store.getters.filteredItems);

// Pagination
const paginatedItems = computed(() => {
  return getPaginatedItems(
    filteredItems.value,
    currentPage.value,
    itemsPerPage
  );
});
const totalPages = computed(() => {
  return calculateTotalPages(filteredItems.value, itemsPerPage);
});
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
const paginationNumbers = computed(() => {
  return generatePaginationNumbers(currentPage.value, totalPages.value);
});
</script>

<template>
  <div class="flex flex-col flex-1">
    <ul
      class="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1 border-b pb-8 border-brand-light-gray"
    >
      <HousingCard v-for="item in paginatedItems" :item="item" />
    </ul>

    <PaginationControls
      :currentPage="currentPage"
      :totalPages="totalPages"
      :paginationNumbers="paginationNumbers"
      @updatePage="changePage"
    />
  </div>
</template>
