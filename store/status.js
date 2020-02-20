// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
export const statuses = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BREAK: 'break',
};

export const state = () => ({
  workStatus: statuses.INACTIVE,
  statusList: statuses,
  rideStatus: false,
});

export const mutations = {
  setWorkStatus: (s, status) => {
    s.workStatus = status;
  },
  setRideStatus: (s) => {
    s.rideStatus = !s.rideStatus;
  },
};

export const getters = {
  workStatus: (s) => s.workStatus,
  list: (s) => s.statusList,
  rideStatus: (s) => s.rideStatus,
};
