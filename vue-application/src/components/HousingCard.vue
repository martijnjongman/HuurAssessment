<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

/* Dynamic styling the label based on status */
const rentalStatus = computed(() => {
  switch (props.item.rental_status) {
    case 'forRent':
      return { color: 'bg-brand-blue', textColor: 'text-brand-blue', name: 'Te huur' };
    case 'rentedOut':
      return { color: 'bg-brand-red', textColor: 'text-brand-red', name: 'Verhuurd' };
    case 'underOption':
      return { color: 'bg-brand-orange', textColor: 'text-brand-orange', name: 'Onder optie' };
    default:
      return { color: 'bg-black', textColor: 'text-black', name: 'Onbekend' };
  }
});
const containerClass = computed(() => [
  'flex items-center gap-1 justify-center px-2 bg-opacity-5 rounded-full',
  rentalStatus.value.color 
])
const dotClass = computed(() => [
  'w-1 h-1 rounded-full',
  rentalStatus.value.color
])
const textClass = computed(() => [
  'font-semibold text-sm',
  rentalStatus.value.textColor
])

const isPremium = computed(() => props.item.house_type === 'premium');
</script>

<template>
    <li class="relative">
        <div v-if="isPremium" class="absolute z-10 inset-0 flex flex-col justify-center items-center p-12 cursor-not-allowed">
            <div class="w-12 h-12 bg-brand-blue rounded-full p-3 border-2 border-color-white">
                <img class="w-full h-full object-fit" src="../assets/lock.svg" alt="icon">
            </div>

            <p class="font-semibold text-xl text-center">Voor het bekijken van deze woning heb je een account nodig</p>
        </div>

        <div
            :class="{
                'relative flex items-end rounded-2xl border-brand-light-gray border border-b-4 h-96 hover:-translate-y-1 hover:shadow-xl transition': true,
                'blur-sm': isPremium
            }"
            :style="{ backgroundImage: `url(${props.item?.images?.[0]?.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >   
            <div class="flex flex-col gap-6 w-full p-6 bg-white rounded-b-xl">
                <div class="flex justify-between">
                    <div :class="containerClass">
                        <div :class="dotClass"></div>
                        <span :class="textClass">{{ rentalStatus.name }}</span>
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
                    <span class="font-semibold">€ {{ props.item.price}} /maand</span>

                    <button class="text-sm font-semibold text-brand-blue cursor-not-allowed">Meer zien</button>
                </div>
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