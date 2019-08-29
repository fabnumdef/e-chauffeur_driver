// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
import pushNotification from '../plugins/push-notification';

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
  socket_rideUpdate({ commit, state }, payload) {
    pushNotification(payload, state.rides.rides.slice());
    commit('rides/pushRide', { ride: payload, loggedUser: state.auth.user });
    if (Object.keys(state.rides.selectedRide).length === 0) {
      commit('rides/selectRide', 0);
    }
  },
  reconnecting({ commit }, reconnecting = true) {
    commit('reconnecting', reconnecting);
  },
};
