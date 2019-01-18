const TOKEN_KEY = 'token';
export default axios => ({
  async renewJWT() {
    const { data } = await axios.post(
      '/jwt/renew',
      {},
      {
        params: { mask: TOKEN_KEY },
      },
    );
    return data[TOKEN_KEY];
  },

  async getCampuses(mask) {
    return axios.get(
      '/jwt/user/campuses',
      {
        params: { mask },
      },
    );
  },
});
