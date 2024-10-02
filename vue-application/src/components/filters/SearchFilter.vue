<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../../store/store";

const store = useStore();

const searchTerm = computed({
  get: () => store.state.filter.searchTerm,
  set: (term) => store.dispatch("setSearchTerm", term),
});

const updateSearchTerm = (event: any) => {
  searchTerm.value = event.target.value;
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="font-semibold">Locatie</label>
    <div
      class="flex items-center border py-3 px-4 rounded-lg hover:border-brand-blue transition"
    >
      <img src="../../assets/loop.svg" alt="Heart Icon" class="mr-4 w-4 h-4" />
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Bijv. Breda"
        @input="updateSearchTerm"
        class="flex-1 outline-none"
      />
    </div>
  </div>
</template>
