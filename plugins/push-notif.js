export default async function ({ app }) {
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i += 1) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const checkSw = () => 'serviceWorker' in navigator;

  const checkPermission = async () => {
    let { permission } = Notification;
    if (permission !== 'granted' || permission !== 'denied') {
      permission = await Notification.requestPermission();
    }
    return permission !== 'denied';
  };

  const handleSubscription = async (subscription) => app.$api.users.subscribeDevice(app.$auth.user.id,
    subscription);

  const checkSubscription = async (registration) => {
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(app.$env.VAPID_PUBLIC_KEY),
      });
    }
    await handleSubscription(subscription);
  };

  const subscribe = async () => {
    const [registration] = await navigator.serviceWorker.getRegistrations();
    checkSubscription(registration);
  };

  const autoSubscribe = (isLogged) => {
    if (isLogged) {
      subscribe();
    }
  };

  try {
    if (process.client) {
      if (checkSw() && checkPermission() && await window.$workbox) {
        autoSubscribe(app.$auth.loggedIn);
        app.$auth.$storage.watchState('loggedIn', autoSubscribe);
      } else {
        console.log('Notifications not available or denied');
      }
    }
  } catch (e) {
    console.error('Service Worker failed: ', e);
  }
}
