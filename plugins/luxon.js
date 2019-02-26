import Vue from 'vue';
import { DateTime } from 'luxon';

export default () => {
  Vue.filter('format_time', (value, format = 'simple') => {
    if (typeof value === 'string') {
      return DateTime.fromISO(value).setLocale('fr').toLocaleString(DateTime[`time_${format}`.toUpperCase()]);
    }
    return value;
  });
  Vue.filter('format_date', (value, format = 'full') => {
    if (value === 'now') {
      return DateTime.local().setLocale('fr').toLocaleString(DateTime[`date_${format}`.toUpperCase()]);
    }
    return value;
  });
};
