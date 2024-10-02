import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

interface State {
  listingItems: Array<any>;
  filter: {
    searchTerm: string;
    priceRange: [number, number];
    selectedTypes: string[];
  };
  filteredItems: Array<any>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    listingItems: [],
    filter: {
      searchTerm: "",
      priceRange: [0, 9999],
      selectedTypes: [],
    },
    filteredItems: [],
  },
  mutations: {
    SET_LISTING_ITEMS(state, items) {
      state.listingItems = items;
    },
    SET_SEARCH_TERM(state, term) {
      state.filter.searchTerm = term;
    },
    SET_PRICE_RANGE(state, range: [number, number]) {
      state.filter.priceRange = range;
    },
    TOGGLE_TYPE(state, type) {
      const index = state.filter.selectedTypes.indexOf(type);
      if (index === -1) {
        state.filter.selectedTypes.push(type);
      } else {
        state.filter.selectedTypes.splice(index, 1);
      }
    },
    RESET_TYPES(state) {
      state.filter.selectedTypes = [];
    },
  },
  actions: {
    setListingItems({ commit }, items) {
      commit("SET_LISTING_ITEMS", items);
      this.dispatch("updatePriceRange");
    },
    updatePriceRange({ commit, state }) {
      if (state.listingItems.length > 0) {
        const prices = state.listingItems.map((item) => item.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        commit("SET_PRICE_RANGE", [minPrice, maxPrice]);
      }
    },
    setSearchTerm({ commit }, term) {
      commit("SET_SEARCH_TERM", term);
    },
    toggleType({ commit }, type) {
      commit("TOGGLE_TYPE", type);
    },
    resetSelectedTypes({ commit }) {
      commit("RESET_TYPES");
    },
  },
  getters: {
    filteredItems(state) {
      return state.listingItems.filter((item) => {
        const matchesSearchTerm = item.city
          .toLowerCase()
          .includes(state.filter.searchTerm.toLowerCase());
        const matchesPriceRange =
          item.price >= state.filter.priceRange[0] &&
          item.price <= state.filter.priceRange[1];
        const matchesTypes =
          state.filter.selectedTypes.length === 0 ||
          state.filter.selectedTypes.includes(item.type);

        return matchesSearchTerm && matchesPriceRange && matchesTypes;
      });
    },
    houseTypes(state) {
      const types = state.listingItems.map((item) => item.type);
      return Array.from(new Set(types));
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
