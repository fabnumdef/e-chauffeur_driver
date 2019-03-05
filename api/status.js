import StateMachine from 'javascript-state-machine';

export const CREATED = 'created';
export const VALIDATED = 'validated'; // Regulation validation
export const REJECTED_BOUNDARY = 'rejected_boundary'; // Regulation validation
export const REJECTED_CAPACITY = 'rejected_capacity'; // Regulation validation
export const ACCEPTED = 'accepted'; // Driver acceptance
export const DECLINED = 'declined';
export const STARTED = 'started';
export const WAITING = 'waiting';
export const IN_PROGRESS = 'progress';
export const DELIVERED = 'delivered';
export const CANCELED = 'canceled';

export const states = {
  CREATED,
  VALIDATED,
  REJECTED_BOUNDARY,
  REJECTED_CAPACITY,
  ACCEPTED,
  DECLINED,
  STARTED,
  WAITING,
  IN_PROGRESS,
  DELIVERED,
  CANCELED,
};

export const VALIDATE = 'validation';
export const REJECT_BOUNDARY = 'rejection_boundary';
export const REJECT_CAPACITY = 'rejection_capacity';
export const ACCEPT = 'accept';
export const DECLINE = 'decline';
export const START = 'start-up';
export const WAIT = 'stay';
export const PROGRESS = 'progress';
export const DELIVER = 'deliver';
export const CANCEL = 'void';

export const actions = {
  VALIDATE,
  REJECT_BOUNDARY,
  REJECT_CAPACITY,
  ACCEPT,
  DECLINE,
  START,
  WAIT,
  PROGRESS,
  DELIVER,
  CANCEL,
};

export default (init = CREATED) => new StateMachine({
  init,
  transitions: [
    { name: VALIDATE, from: CREATED, to: VALIDATED },
    { name: REJECT_BOUNDARY, from: CREATED, to: REJECTED_BOUNDARY },
    { name: REJECT_CAPACITY, from: CREATED, to: REJECTED_CAPACITY },
    { name: ACCEPT, from: VALIDATED, to: ACCEPTED },
    { name: DECLINE, from: VALIDATED, to: DECLINED },
    { name: START, from: ACCEPTED, to: STARTED },
    { name: WAIT, from: STARTED, to: WAITING },
    { name: PROGRESS, from: WAITING, to: IN_PROGRESS },
    { name: DELIVER, from: IN_PROGRESS, to: DELIVERED },
    { name: CANCEL, from: [ACCEPTED, STARTED, WAITING, IN_PROGRESS, DELIVERED], to: CANCELED },
  ],
});
