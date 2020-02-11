// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
import * as states from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import { DateTime } from 'luxon';


const statesToTrack = [
  states.VALIDATED,
  states.STARTED,
  states.ACCEPTED,
  states.IN_PROGRESS,
  states.WAITING,
];

const generateDetails = ({ passengersCount, comments, luggage }, type) => {
  const details = [];
  if (passengersCount) {
    let key;
    if (type === 'arrival') {
      key = `Dépôt de passager${passengersCount > 1 ? 's' : ''}`;
    } else {
      key = `Prise en charge de passager${passengersCount > 1 ? 's' : ''}`;
    }
    details.push({
      key,
      value: passengersCount,
    });
  }
  if (comments) {
    details.push({
      key: 'Commentaire',
      value: comments,
    });
  }
  if (luggage) {
    details.push({
      key: 'Présence de bagages',
      value: luggage,
    });
  }
  return details;
};

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate()
  && date.getMonth() === today.getMonth()
  && date.getFullYear() === today.getFullYear();
};

const generateStep = (ride) => {
  let steps = [];
  if (isToday(DateTime.fromISO(ride.start).toJSDate()) && isToday(DateTime.fromISO(ride.end).toJSDate())) {
    steps = [
      {
        destination: ride.departure.label,
        date: ride.start,
        id: ride.id,
        type: 'departure',
        details: generateDetails(ride, 'departure'),
        phone: ride.phone,
      },
      {
        destination: ride.arrival.label,
        date: ride.end,
        id: ride.id,
        type: 'arrival',
        details: generateDetails(ride, 'arrival'),
        phone: ride.phone,
      },
    ];
  }
  return steps;
};

const sortByDate = (array) => array.sort((a, b) => {
  const startA = DateTime.fromISO(a.start);
  const startB = DateTime.fromISO(b.start);
  if (startA < startB) {
    return -1;
  }
  if (startA > startB) {
    return 1;
  }
  return 0;
});

const generateSteps = (rides) => sortByDate(rides.reduce((acc, ride) => [
  ...acc,
  ...generateStep(ride),
], []));

export const state = () => ({
  rides: [],
});

export const mutations = {
  setRides: (s, rides = null) => {
    s.rides = rides
      .filter(({ id }) => !!id);
  },
  pushRide: (s, { ride, loggedUser }) => {
    if (!ride.id) {
      throw new Error('Id is required');
    }
    const i = s.rides.findIndex(({ id }) => id === ride.id);
    const isToTrack = statesToTrack.includes(ride.status) && loggedUser.id === ride.driver.id;
    if (i === -1) {
      if (isToTrack) {
        s.rides.push(ride);
        // @todo sort inside intervals
        s.rides.sort((a, b) => {
          const startA = DateTime.fromISO(a.start);
          const startB = DateTime.fromISO(b.start);
          if (startA < startB) {
            return -1;
          }
          if (startA > startB) {
            return 1;
          }
          return 0;
        });
      }
    } else if (isToTrack) {
      Object.assign(s.rides[i], ride);
    } else {
      s.rides.splice(i, 1);
    }
  },
};

export const getters = {
  getSteps: (s) => generateSteps(s.rides),
  hasSteps: (s) => generateSteps(s.rides).length > 0,
};

export const actions = {
  async fetchRides({ commit }, campus) {
    try {
      const { data } = await this.$api.rides(
        campus,
        'id,start,end,phone,departure(label),arrival(label),passengersCount,car(id,label,model(label)),status,comments',
      ).getDriverRides(this.$auth.user.id, ...statesToTrack);
      commit('setRides', data);
    } catch (e) {
      throw new Error('Rides fetching failed');
    }
  },
  async startStep({ commit }, rideId) {
    commit('status/toggleDriving', null, { root: true });
    // @todo async calls to API
  },
  async endStep({ commit }, rideId) {
    commit('status/toggleDriving', null, { root: true });
    // @todo async calls to API
  },
};
