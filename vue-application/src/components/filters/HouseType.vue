<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../store/store';

const store = useStore();

const availableTypes = computed(() => {
    const types = store.getters.houseTypes;

    return [...types];
});

const isSelectedType = (type: string) => {
    return store.state.filter.selectedTypes.includes(type);
};

const isEmptyType = () => {
    return store.state.filter.selectedTypes.length === 0;
}

const toggleType = (type: string) => {
    store.dispatch('toggleType', type);
};

const handleTypeChange = (type: string) => {
    if (type === 'all') {
        store.dispatch('resetSelectedTypes');
    } else {
        store.dispatch('toggleType', type);
    }
};
</script>

<template>
    <div class="flex flex-col gap-2">
        <h3 class="font-semibold">Woningtype</h3>

        <div class="flex flex-col gap-2">
          <div 
                @click="handleTypeChange('all')" 
                :class="[
                    'flex items-center rounded-lg py-3 px-4 border text-brand-dark-gray text-opacity-60 cursor-pointer hover:border-brand-blue transition',
                    isEmptyType()
                        ? 'bg-brand-blue bg-opacity-10 border-brand-blue' 
                        : 'bg-brand-light-gray bg-opacity-5 border-brand-light-gray'
                ]"
            >
                <input
                    type="checkbox"
                    :checked="isEmptyType()"
                    class="mr-2 custom-checkbox"
                />
                <label class="cursor-pointer">Alle woningtypes</label>
            </div>

            <div v-for="type in availableTypes" :key="type" @click="handleTypeChange(type)" 
            :class="[
            'flex items-center rounded-lg py-3 px-4 border text-brand-dark-gray text-opacity-60 cursor-pointer hover:border-brand-blue transition',
            isSelectedType(type) ? 'bg-brand-blue bg-opacity-10 border-brand-blue' : 'bg-brand-light-gray bg-opacity-5 border-brand-light-gray']">
                <input
                    type="checkbox"
                    :value="type"
                    :checked="isSelectedType(type)"
                    @change.stop="toggleType(type)"
                    class="mr-2 custom-checkbox"
                />
                <label class="cursor-pointer">{{ type }}</label>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.custom-checkbox {
  @apply appearance-none w-4 h-4 bg-white border border-brand-gray rounded-full block relative cursor-pointer;
}

.custom-checkbox:checked {
  @apply bg-white border-brand-blue border-opacity-50;
}

.custom-checkbox:checked::after {
  @apply absolute top-1/2 left-1/2 w-3 h-3 bg-brand-blue rounded-full;
  content: '';
  transform: translate(-50%, -50%);
}
</style>