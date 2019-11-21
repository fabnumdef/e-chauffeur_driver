/* eslint-disable no-restricted-globals */

self.addEventListener('push', (e) => {
  let message = 'Nouvelle course';
  let body = '';

  if (e.data) {
    ({
      message,
      body,
    } = JSON.parse(e.data.text()));
  }

  const options = {
    icon: '/icon.png',
    badge: '/icon-bw.png',
    body,
  };
  e.waitUntil(
    self.registration.showNotification(message, options),
  );
});
