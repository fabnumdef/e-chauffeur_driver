// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */

export const state = () => ({
  isReconnecting: false,
  isMenuOpen: false,
});

export const mutations = {
  reconnecting: (s, reconnecting = true) => {
    s.isReconnecting = reconnecting;
  },
  toggleMenu: (s, bool) => {
    s.isMenuOpen = typeof bool !== 'undefined' ? bool : !s.isMenuOpen;
  },
};

export const getters = {
  isReconnecting: (s) => s.isReconnecting,
  isMenuOpen: (s) => s.isMenuOpen,
};

export const actions = {
  // eslint-disable-next-line no-shadow
  socket_rideUpdate({ dispatch }, payload) {
    dispatch('rides/pushStep', payload);
  },
  socket_deleteStep({ dispatch }, rideId) {
    dispatch('rides/deleteStep', rideId);
  },
  reconnecting({ commit }, reconnecting = true) {
    commit('reconnecting', reconnecting);
  },
};
