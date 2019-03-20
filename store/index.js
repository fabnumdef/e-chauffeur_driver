import { DateTime } from 'luxon';

async function pushNotification(ride) {
  if (!window.$sw || !ride || ride.status !== 'validated') {
    return;
  }
  let { permission } = Notification;
  if (permission !== 'granted' || permission !== 'denied') {
    permission = await Notification.requestPermission();
  }
  if (permission === 'denied') {
    return;
  }
  const message = `Nouvelle course à ${DateTime.fromISO(ride.start).setLocale('fr').toFormat('HH\'h\'mm')}`;
  const body = `De ${ride.departure.label} à ${ride.arrival.label}`;
  await window.$sw.showNotification(message, { body });
  const [notif] = await window.$sw.getNotifications();
  setTimeout(() => { notif.close(); }, 15000);
}


export const state = () => ({});

export const mutations = {};

export const actions = {
  // eslint-disable-next-line no-shadow
  socket_rideUpdate({ commit, state }, payload) {
    pushNotification(payload);
    commit('rides/pushRide', { ride: payload, loggedUser: state.auth.user });
  },
};
