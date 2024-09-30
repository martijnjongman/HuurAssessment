<script setup lang="ts">
import { ref } from 'vue';

const isFilterVisible = ref(false);

const toggleFilter = () => {
  isFilterVisible.value = !isFilterVisible.value;
};
</script>

<template>
    <button class="lg:hidden flex gap-2 justify-center items-center w-full py-4 rounded-xl bg-gray-100 border border-brand-gray mb-8 font-semibold" @click="toggleFilter">
        <img src="../assets/filters.svg" alt="icons" class="w-6 h-6">
        Filters
    </button>

    <div :class="{
    'hidden': !isFilterVisible,
    'block': isFilterVisible,
    'z-10 absolute lg:hidden inset-0 bg-black opacity-25': true
    }"
    @click="toggleFilter"></div>

    <div 
    :class="{
        'hidden': !isFilterVisible,
        'flex': isFilterVisible,
        'z-20 lg:flex flex-col lg:flex-row absolute top-0 left-0 lg:relative w-3/4 lg:w-96 h-screen lg:h-auto px-4 lg:px-0 py-4 lg:py-0 lg:pr-8 lg:border-r border-brand-light-gray bg-white': true
    }">
        <div class="flex lg:hidden items-start justify-end w-full">
            <button @click="toggleFilter">Sluiten</button>
        </div>

        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-semibold">Filters</h2>

                <p class="text-brand-gray leading-6">Wij zoeken woningen op meer dan 300 huursites en bundelen alle gevonden woningen in een overzichtelijk aanbod.</p>
            </div>
            
            <div class="">Eerste filter</div>
        </div>
    </div>
</template>