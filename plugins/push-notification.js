import { DateTime } from 'luxon';
import { VALIDATED } from '../api/status';

function isNewRide(ride, currentRides) {
  if (!ride || ride.status !== VALIDATED) {
    return false;
  }
  if (!currentRides || currentRides.length === 0) {
    return true;
  }
  return !currentRides.some(r => r.id === ride.id);
}

export default async function pushNotification(ride, currentRides) {
  if ('serviceWorker' in navigator) {
    const [serviceWorker] = await navigator.serviceWorker.getRegistrations();
    if (!serviceWorker || !isNewRide(ride, currentRides)) {
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
    await serviceWorker.showNotification(message, {
      body,
      icon: '/icon.png',
      badge: '/icon-bw.png',
    });
    const [notif] = await serviceWorker.getNotifications();
    setTimeout(() => {
      notif.close();
    }, 15000);
  }
}
