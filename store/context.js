// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */

export const state = () => ({
  campus: null,
  accessibleCampuses: null,
});

export const mutations = {
  setCampus: (s, campus = null) => {
    s.campus = campus;
  },
  setAccessibleCampuses: (s, campuses) => {
    s.accessibleCampuses = campuses;
  },
};

export const getters = {
  hasCampus: s => s.campus !== null,
  campus: s => s.campus,
  accessibleCampuses: s => s.accessibleCampuses,
};

export const actions = {
  async setCampus({ commit }, campus) {
    try {
      const { data } = await this.$api.campuses.getCampus(campus, 'id,name');
      commit('setCampus', data);
    } catch (e) {
      throw new Error('Campus not fond');
    }
  },

  async fetchAccessibleCampuses({ commit, getters: g }) {
    if (!g.accessibleCampuses) {
      const { data: campuses } = await this.$api.jwt.getCampuses('id,name');
      commit('setAccessibleCampuses', campuses);
    }
    return g.accessibleCampuses;
  },
};
