// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
import { states } from '~/api/status';

const statesToTrack = [
  states.VALIDATED,
  states.STARTED,
  states.ACCEPTED,
  states.IN_PROGRESS,
  states.WAITING,
  states.DELIVERED,
];

export const state = () => ({
  rides: [],
});

export const mutations = {
  setRides: (s, rides = null) => {
    s.rides = rides
      .filter(({ id }) => !!id);
  },
  pushRide: (s, ride) => {
    if (!ride.id) {
      throw new Error('Id is required');
    }
    const i = s.rides.findIndex(({ id }) => id === ride.id);
    const isToTrack = statesToTrack.includes(ride.status);
    if (i === -1) {
      if (isToTrack) {
        s.rides.push(ride);
      }
    } else if (isToTrack) {
      Object.assign(s.rides[i], ride);
    } else {
      s.rides.splice(i, 1);
    }
  },
};

export const getters = {
  ridesToDo: s => s.rides.filter(({ status }) => status !== states.VALIDATED),
  ridesToAccept: s => s.rides.filter(({ status }) => status === states.VALIDATED),
};

export const actions = {
  async fetchRides({ commit }, campus) {
    try {
      const { data } = await this.$api.rides(
        campus,
        this.$auth.user.id,
        'id,start,end,phone,departure(label),arrival(label),passengersCount,car(id,label,model(label)),status,comments',
      ).getRides(...statesToTrack);
      commit('setRides', data);
    } catch (e) {
      throw new Error('Rides fetching failed');
    }
  },
};
