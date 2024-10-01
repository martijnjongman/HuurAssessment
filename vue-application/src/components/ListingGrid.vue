<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HousingCard from './HousingCard.vue';

const listingItems = ref<any[]>([]);

onMounted(async () => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
        await sleep(500);
        
        const responses = await Promise.all([
            fetch('/data/api-free-p1.json'),
            fetch('/data/api-free-p2.json'),
            fetch('/data/api-free-p3.json'),
            fetch('/data/api-premium-p1.json')
        ]);
        
        const data = await Promise.all(responses.map(responses => responses.json()));
        listingItems.value = data.flatMap(item => item.data.houses); 

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

</script>

<template>
    <ul class="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1">
        <HousingCard v-for="item in listingItems" :item="item" :key="item.id" />
    </ul>
</template>