<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const imageUrl = computed(() => {
  return props.item?.images?.[0]?.url || 'https://loremflickr.com/640/480/placholder';
});

</script>

<template>
    <li
        class="relative flex items-end rounded-2xl border-brand-light-gray border border-b-4 h-96"
        :style="{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
    >
        <div class="flex flex-col gap-6 w-full p-6 bg-white rounded-b-xl">
            <div class="flex justify-between">
                <div class="flex items-center gap-1 justify-center px-2 bg-brand-pastel-blue rounded-full">
                    <div class="w-1 h-1 rounded-full bg-brand-blue"></div>
                    <span class="text-brand-blue font-semibold text-sm">Te huur</span>
                </div>

                <div class="w-8 h-8 bg-gray-100 rounded-full p-2">
                    <img class="w-full h-full object-fit" src="../assets/heart.svg" alt="icon">
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <span class="text-lg font-semibold text-brand-dark-gray">{{ props.item.street}}</span>

                <div class="flex items-center gap-2 text-brand-gray text-sm">
                    <span>{{ props.item.surface_living }} m2</span>
                    <div class="line bg-brand-light-gray"></div>
                    <span>{{ props.item.rooms_total }} kamer</span>
                    <div class="line bg-brand-light-gray"></div>
                    <span>{{ props.item.city }}</span>
                </div>
            </div>

            <div class="flex justify-between">
                <span class="text-sm font-semibold">€ {{ props.item.price}} /maand</span>

                <button class="text-sm font-semibold text-brand-blue cursor-not-allowed">Meer zien</button>
            </div>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.line {
    width: 1px;
    height: 10px;
}
</style>