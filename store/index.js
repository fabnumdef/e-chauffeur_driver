import pushNotification from '../plugins/push-notification';

export const state = () => ({});

export const mutations = {};

export const actions = {
  // eslint-disable-next-line no-shadow
  socket_rideUpdate({ commit, state }, payload) {
    pushNotification(payload);
    commit('rides/pushRide', { ride: payload, loggedUser: state.auth.user });
  },
};
