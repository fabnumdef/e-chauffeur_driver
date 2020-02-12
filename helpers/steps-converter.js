import { DateTime } from 'luxon';
import {
  IN_PROGRESS, STARTED, VALIDATED, WAITING,
} from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import {
  DELIVER, PROGRESS, START, WAIT,
} from '@fabnumdef/e-chauffeur_lib-vue/api/status/transitions';
import { sortByDate, isToday } from '~/helpers/date-helpers';

const statesToTrack = [
  VALIDATED,
  STARTED,
  IN_PROGRESS,
  WAITING,
];

const generateDetails = ({ passengersCount, comments, luggage }, type) => {
  const details = [];
  if (passengersCount) {
    let key;
    if (type === 'arrival') {
      key = `Dépôt de passager${passengersCount > 1 ? 's' : ''}`;
    } else {
      key = `Prise en charge de passager${passengersCount > 1 ? 's' : ''}`;
    }
    details.push({
      key,
      value: passengersCount,
    });
  }
  if (comments) {
    details.push({
      key: 'Commentaire',
      value: comments,
    });
  }
  if (luggage) {
    details.push({
      key: 'Présence de bagages',
      value: 'Oui',
    });
  }
  return details;
};

export const generateStep = (ride) => {
  const steps = [];
  if (
    isToday(DateTime.fromISO(ride.start).toJSDate())
    && statesToTrack.filter((state) => state === ride.status).length > 0
  ) {
    if ((ride.status === VALIDATED || ride.status === STARTED)) {
      steps.push({
        destination: ride.departure.label,
        date: ride.start,
        id: ride.id,
        type: 'departure',
        details: generateDetails(ride, 'departure'),
        phone: ride.phone,
      });
    }
    steps.push({
      destination: ride.arrival.label,
      date: ride.end,
      id: ride.id,
      type: 'arrival',
      details: generateDetails(ride, 'arrival'),
      phone: ride.phone,
    });
  }
  return steps;
};

export const mutateStep = (rides, rideId) => {
  const [ride] = rides.filter((r) => r.id === rideId);
  let status;
  switch (ride.status) {
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
  return { ride, status };
};

export default (rides) => sortByDate(rides.reduce((acc, ride) => [
  ...acc,
  ...generateStep(ride),
], []));
