import {
  IN_PROGRESS, STARTED, VALIDATED, WAITING,
} from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import {
  DELIVER, PROGRESS, START, WAIT,
} from '@fabnumdef/e-chauffeur_lib-vue/api/status/transitions';

export default (s) => {
  let status;
  switch (s) {
    case VALIDATED:
      status = START;
      break;
    case WAITING:
      status = PROGRESS;
      break;
    case STARTED:
      status = WAIT;
      break;
    case IN_PROGRESS:
      status = DELIVER;
      break;
    default:
      break;
  }
  return status;
};
