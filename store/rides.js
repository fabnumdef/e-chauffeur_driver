// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
import {
  VALIDATED, STARTED, IN_PROGRESS, WAITING, DELIVERED,
} from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import getAction from '../helpers/mutate-step';
import { sortByDate } from '../helpers/date-helpers';

export const state = () => ({
  steps: [],
  previous: 'Position actuelle',
  alert: false,
});

const statesToTrack = [
  VALIDATED,
  STARTED,
  IN_PROGRESS,
  WAITING,
];

export const mutations = {
  setSteps: (s, steps = []) => {
    s.steps = steps
      .filter(({ id }) => !!id);
  },
  toggleAlert: (s) => {
    s.alert = !s.alert;
  },
  setPrevious: (s, previous) => {
    s.previous = previous;
  },
};

export const getters = {
  rawSteps: (s) => s.steps,
  steps: (s) => s.steps.map((step) => ({
    ...step,
    previous: s.previous,
  })),
  alert: (s) => s.alert,
};

export const actions = {
  async fetchRides({ commit }, campus) {
    try {
      const { data } = await this.$api.rides(
        campus,
        'id,destination,phone,details(*),type,date,status,rideId,passengersCount',
      ).getDriverRides(this.$auth.user.id, 'steps', ...statesToTrack);
      commit('setSteps', data);
    } catch (e) {
      throw new Error('Rides fetching failed');
    }
  },
  async updateSteps({ commit, getters: g }, { step, campusId }) {
    try {
      await this.$api.rides(campusId, 'id').mutateRide(step, getAction(step.status), 'step');
      commit('status/setRideStatus', null, { root: true });
      if (g.alert) {
        commit('toggleAlert');
      }
    } catch (e) {
      throw new Error('Ride mutation failed');
    }
  },
  deleteStep: ({ commit, getters: g }, rideId) => {
    const updatedSteps = JSON.parse(JSON.stringify(g.rawSteps))
      .filter((step) => {
        const updatedRideId = step.rideId.filter((id) => rideId !== id);
        return updatedRideId.length > 0 ? { ...step, rideId: updatedRideId } : false;
      });
    commit('setSteps', updatedSteps);
  },
  pushStep: ({ commit, getters: g }, payload) => {
    payload.forEach((step) => {
      const steps = JSON.parse(JSON.stringify(g.rawSteps));
      const { status, id } = step;
      if (!id) {
        throw new Error('Id is required');
      }
      const index = steps.findIndex((st) => st.id === id);
      if (index === -1) {
        if (status === VALIDATED || status === WAITING) {
          steps.push(step);
          if (steps.length > 0 && step.date < steps[0].date) {
            commit('toggleAlert');
          }
        }
      } else if (status === DELIVERED || status === WAITING) {
        steps.splice(index, 1);
        commit('setPrevious', step.destination);
      } else {
        steps[index].status = status;
      }
      sortByDate(steps);
      commit('setSteps', steps);
    });
  },
};
