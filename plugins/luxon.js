import Vue from 'vue';
import { DateTime, Settings } from 'luxon';

Settings.defaultLocale = 'fr';

export default () => {
  Vue.filter('format_time', (value, format = 'simple') => {
    if (typeof value === 'string') {
      return DateTime.fromISO(value).toLocaleString(DateTime[`time_${format}`.toUpperCase()]);
    }
    return value;
  });
  Vue.filter('format_date', (value, format = 'full') => {
    if (value === 'now') {
      return DateTime.local().toLocaleString(DateTime[`date_${format}`.toUpperCase()]);
    }
    return value;
  });
};
