import qs from 'qs';

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    // We have to change config
    // eslint-disable-next-line no-param-reassign
    config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'brackets' });
    return config;
  });
}
