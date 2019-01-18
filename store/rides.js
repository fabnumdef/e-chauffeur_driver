// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
import { states } from '~/api/status';

const statesToTrack = [states.CREATED, states.ACCEPTED, states.IN_PROGRESS, states.WAITING];

export const state = () => ({
  rides: null,
});

export const mutations = {
  setRides: (s, rides = null) => {
    s.rides = rides.reduce((acc, curr) => {
      const { id } = curr;
      if (!id) {
        throw new Error('Id is required');
      }
      acc[id] = curr;
      return acc;
    }, {});
  },
  pushRide: (s, ride) => {
    const { id } = ride;
    if (!id) {
      throw new Error('Id is required');
    }
    if (!s.rides) {
      s.rides = {};
    }
    s.rides[id] = ride;
  },
};

export const getters = {
  rides: s => Object.values(s.rides).filter(r => statesToTrack.includes(r.status)),
};

export const actions = {
  async fetchRides({ commit }, campus) {
    try {
      const { data } = await this.$api.rides(
        campus,
        this.$auth.user.id,
        'id,start,end,phone,departure,arrival,passengersCount,car(id,label),status',
      ).getRides(...statesToTrack);
      commit('setRides', data);
    } catch (e) {
      throw new Error('Rides fetching failed');
    }
  },
};
