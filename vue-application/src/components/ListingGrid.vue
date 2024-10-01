<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store/store'
import HousingCard from './HousingCard.vue';

const store = useStore()

const listingItems = computed(() => store.state.listingItems);
</script>

<template>
    <ul class="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1">
        <HousingCard v-for="item in listingItems" :item="item"/>
    </ul>
</template>