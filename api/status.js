import StateMachine from 'javascript-state-machine';

export const CREATED = 'created';
export const ACCEPTED = 'accepted';
export const DECLINED = 'declined';
export const WAITING = 'waiting';
export const IN_PROGRESS = 'progress';
export const DELIVERED = 'delivered';
export const DONE = 'done';
export const CANCELED = 'canceled';

export const states = {
  CREATED, ACCEPTED, DECLINED, WAITING, IN_PROGRESS, DELIVERED, DONE, CANCELED,
};

export const ACCEPT = 'accept';
export const DECLINE = 'decline';
export const WAIT = 'wait';
export const START = 'progress';
export const DELIVER = 'deliver';
export const END = 'finish';
export const CANCEL = 'cancel';

export const actions = {
  ACCEPT, DECLINE, WAIT, START, DELIVER, END, CANCEL,
};

export default (init = CREATED) => new StateMachine({
  init,
  transitions: [
    { name: ACCEPT, from: CREATED, to: ACCEPTED },
    { name: DECLINE, from: CREATED, to: DECLINED },
    { name: WAIT, from: ACCEPTED, to: WAITING },
    { name: START, from: WAITING, to: IN_PROGRESS },
    { name: DELIVER, from: IN_PROGRESS, to: DELIVERED },
    { name: END, from: DELIVERED, to: DONE },
    { name: CANCEL, from: [ACCEPTED, WAITING, IN_PROGRESS, DELIVERED], to: CANCELED },
  ],
});
