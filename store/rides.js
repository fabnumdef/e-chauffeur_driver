// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
import {
  VALIDATED, STARTED, IN_PROGRESS, WAITING, DELIVERED,
} from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import { DateTime } from 'luxon';
import generateSteps, { generateStep, mutateStep } from '../helpers/steps-converter';
import { sortByDate } from '../helpers/date-helpers';

const statesToTrack = [
  VALIDATED,
  STARTED,
  IN_PROGRESS,
  WAITING,
];

export const state = () => ({
  rides: [],
  steps: [],
  previous: 'Position actuelle',
});

export const mutations = {
  setRides: (s, rides = null) => {
    s.rides = rides
      .filter(({ id }) => !!id);
  },
  setSteps: (s, rides = []) => {
    s.steps = generateSteps(rides);
  },
  pushRide: (s, { ride, loggedUser }) => {
    if (!ride.id) {
      throw new Error('Id is required');
    }
    const i = s.rides.findIndex(({ id }) => id === ride.id);
    const isToTrack = statesToTrack.includes(ride.status) && loggedUser.id === ride.driver.id;
    if (i === -1) {
      if (isToTrack) {
        const steps = generateStep(ride);
        s.rides.push(ride);
        s.steps.push(...steps);
        sortByDate(s.rides);
        sortByDate(s.steps);
      }
    } else {
      Object.assign(s.rides[i], ride);
      if (ride.status === WAITING || ride.status === IN_PROGRESS) {
        s.steps = s.steps.filter((step) => {
          const toKeep = step.id !== ride.id || step.type !== 'departure';
          if (!toKeep) {
            s.previous = step.destination;
          }
          return toKeep;
        });
      } else if (ride.status === DELIVERED) {
        s.steps = s.steps.filter((step) => {
          const toKeep = step.id !== ride.id;
          if (!toKeep && step.type === 'arrival') {
            s.previous = step.destination;
          }
          return toKeep;
        });
      } else if (ride.status !== STARTED) {
        s.steps = s.steps.filter((step) => step.id !== ride.id);
      }
    }
  },
};

export const getters = {
  rides: ({ rides }) => rides,
  steps: (s) => s.steps.map((step) => ({
    ...step,
    date: DateTime.fromISO(step.date).toFormat("HH 'h' mm"),
    previous: s.previous,
  })),
};

export const actions = {
  async fetchRides({ dispatch }, campus) {
    try {
      const { data } = await this.$api.rides(
        campus,
        'id,start,end,phone,departure(label),arrival(label),'
        + 'passengersCount,car(id,label,model(label)),status,comments,luggage',
      ).getDriverRides(this.$auth.user.id, ...statesToTrack);
      dispatch('setState', data);
    } catch (e) {
      throw new Error('Rides fetching failed');
    }
  },
  setState({ commit }, rides) {
    commit('setRides', rides);
    commit('setSteps', rides);
  },
  async updateSteps({ commit, getters: g }, { rideId, driverId, campusId }) {
    commit('status/toggleDriving', null, { root: true });

    try {
      const { ride, status } = mutateStep(g.rides, rideId);
      return this.$api.rides(campusId, driverId, 'id').mutateRide(ride, status);
    } catch (e) {
      throw new Error('Ride mutation failed');
    }
  },
};
