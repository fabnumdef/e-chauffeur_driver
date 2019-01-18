export const state = () => ({});

export const mutations = {};

export const actions = {
  socket_rideUpdate({ commit }, payload) {
    commit('rides/pushRide', payload);
  },
};
