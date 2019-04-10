// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
import pushNotification from '../plugins/push-notification';

export const state = () => ({
  isReconnecting: false,
});

export const mutations = {
  reconnecting: (s, reconnecting = true) => {
    s.isReconnecting = reconnecting;
  },
};

export const getters = {
  isReconnecting: s => s.isReconnecting,
};

export const actions = {
  // eslint-disable-next-line no-shadow
  socket_rideUpdate({ commit, state }, payload) {
    pushNotification(payload, state.rides.rides.slice());
    commit('rides/pushRide', { ride: payload, loggedUser: state.auth.user });
  },
  reconnecting({ commit }, reconnecting = true) {
    commit('reconnecting', reconnecting);
  },
};
