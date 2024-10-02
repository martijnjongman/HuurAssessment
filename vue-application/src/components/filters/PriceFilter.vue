<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../../store/store";

const store = useStore();

const priceRange = computed({
  get: () => store.state.filter.priceRange,
  set: (range) => store.dispatch("setPriceRange", range),
});

const updatePriceRange = () => {
  priceRange.value = [priceRange.value[0], priceRange.value[1]];
};

const minPricePlaceholder = priceRange.value[0] !== undefined ? priceRange.value[0].toString() : '';
const maxPricePlaceholder = priceRange.value[1] !== undefined ? priceRange.value[1].toString() : '';
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="font-semibold">Huurprijs</span>

    <div class="flex flex-col gap-1">
      <div
        class="flex gap-1 w-full border py-3 px-4 rounded-lg hover:border-brand-blue transition"
      >
        <span class="opacity-50">Van €</span>
        <input
          id="minPrice"
          type="number"
          v-model.number="priceRange[0]"
          @change="updatePriceRange"
          class="flex-1"
          :placeholder="minPricePlaceholder"
        />
      </div>

      <div
        class="flex gap-1 w-full border py-3 px-4 rounded-lg hover:border-brand-blue transition"
      >
        <span class="opacity-50">Van €</span>
        <input
          id="maxPrice"
          type="number"
          v-model.number="priceRange[1]"
          @change="updatePriceRange"
          class="flex-1"
          :placeholder="maxPricePlaceholder"
        />
      </div>
    </div>
  </div>
</template>
