import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  listingItems: Object[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    listingItems: [],
  },
  mutations: {
    SET_LISTING_ITEMS(state, items) {
      state.listingItems = items;
    },
  },
  actions: {
    setListingItems({ commit }, items) {
      commit('SET_LISTING_ITEMS', items);
    },
  },
})

export function useStore () {
  return baseUseStore(key)
}
