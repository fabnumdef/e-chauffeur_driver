// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
export const state = () => ({
  current: 'inactive',
  statusList: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BREAK: 'break',
  },
  driving: false,
});

export const mutations = {
  setStatus: (s, status = s.statusList.INACTIVE) => {
    s.current = status;
  },
  toggleDriving: (s) => {
    s.driving = !s.driving;
  },
};

export const getters = {
  current: (s) => s.current,
  list: (s) => s.statusList,
  driving: (s) => s.driving,
};
