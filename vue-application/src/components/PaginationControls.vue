<script lang="ts" setup>
import { defineEmits } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
  paginationNumbers: number[];
}

const props = defineProps<Props>();

interface Emits {
  (event: "updatePage", page: number): void;
}

const emit = defineEmits<Emits>();

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("updatePage", page);
  }
};
</script>

<template>
  <div class="pagination-controls flex items-center gap-2 justify-center mt-4">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      :class="[
        'items-center gap-1 px-3 py-1 bg-white text-sm rounded border border-brand-light-gray transition hover:bg-brand-light-gray',
        currentPage === 1 ? 'hidden' : 'flex',
      ]"
    >
      <img class="w-2 h-2" src="../assets/chevron.svg" alt="icon" />
      Vorige
    </button>

    <button
      v-for="page in paginationNumbers"
      :key="page"
      @click="changePage(page)"
      :class="[
        'px-3 py-1 rounded text-sm border border-brand-light-gray transition hover:bg-brand-light-gray',
        currentPage === page ? 'bg-brand-blue text-white' : 'bg-white',
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      :class="[
        'flex items-center gap-1 px-3 py-1 bg-white text-sm rounded border border-brand-light-gray transition hover:bg-brand-light-gray',
        currentPage === totalPages ? 'hidden' : 'flex',
      ]"
    >
      Volgende
      <img class="w-2 h-2 rotate-180" src="../assets/chevron.svg" alt="icon" />
    </button>
  </div>
</template>
