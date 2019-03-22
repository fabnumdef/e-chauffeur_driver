import { DateTime } from 'luxon';

export default async function pushNotification(ride) {
  if ('serviceWorker' in navigator) {
    const [serviceWorker] = await navigator.serviceWorker.getRegistrations();
    if (!serviceWorker || !ride || ride.status !== 'validated') {
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
