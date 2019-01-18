export const ENTITY = 'campus';
export const ENTITY_PLURAL = 'campuses';

export default axios => ({
  getCampus(id, mask) {
    return axios.get(
      `/${ENTITY_PLURAL}/${id}`,
      {
        params: { mask },
      },
    );
  },
});
