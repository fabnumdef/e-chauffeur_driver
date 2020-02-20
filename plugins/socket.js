import { AUTH_HEADER_KEY } from '@fabnumdef/e-chauffeur_lib-vue/plugins/socket';

export default function ({ app, store }) {
  const ioInstance = app.$io;
  if (ioInstance) {
    ioInstance.on('connect', () => {
      ioInstance.emit('roomJoinDriver', app.$auth.$storage.getUniversal(AUTH_HEADER_KEY));
      store.dispatch('reconnecting', false);
    });
    ioInstance.on('reconnecting', () => {
      store.dispatch('reconnecting', true);
    });
    ioInstance.on('deleteStep', (rideId) => {
      store.dispatch('socket_deleteStep', rideId);
    });

    const autoConnect = (isLogged) => {
      if (isLogged) {
        ioInstance.open();
      } else {
        ioInstance.close();
      }
    };
    autoConnect(app.$auth.loggedIn);
    app.$auth.$storage.watchState('loggedIn', autoConnect);
  }
}
