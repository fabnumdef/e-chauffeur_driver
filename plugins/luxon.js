import Vue from 'vue';
import { DateTime } from 'luxon';

export default () => {
  Vue.filter('format_time', function (value, format = 'simple') {
    if (typeof value === 'string') {
      return DateTime.fromISO(value).toLocaleString(DateTime[`time_${format}`.toUpperCase()]);
    }
    return value;
  })

};
