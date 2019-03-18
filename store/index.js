export const state = () => ({});

export const mutations = {};

export const actions = {
  // eslint-disable-next-line no-shadow
  socket_rideUpdate({ commit, state }, payload) {
    commit('rides/pushRide', { ride: payload, loggedUser: state.auth.user });
  },
};
