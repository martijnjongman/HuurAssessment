<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useStore } from '../store/store'

    import HousingCard from './HousingCard.vue';
    import PaginationControls from './PaginationControls.vue';
    
    import { getPaginatedItems, calculateTotalPages, generatePaginationNumbers } from '../utils/pagination';

    const store = useStore();

    const itemsPerPage = 10;
    const currentPage = ref(1);

    const listingItems = computed(() => store.state.listingItems);

    // Pagination
    const paginatedItems = computed(() => {
        return getPaginatedItems(listingItems.value, currentPage.value, itemsPerPage);
    });
    const totalPages = computed(() => {
        return calculateTotalPages(listingItems.value, itemsPerPage);
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
        <ul class="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1 border-b pb-8 border-brand-light-gray">
            <HousingCard v-for="item in paginatedItems" :item="item"/>
        </ul>

        <PaginationControls
            :currentPage="currentPage"
            :totalPages="totalPages"
            :paginationNumbers="paginationNumbers"
            @updatePage="changePage"
        />
    </div>
</template>