import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

const authHeaderKey = '_token.local';

export default function ({ env, store, app }, inject) {
  const ioInstance = io(env.apiUrl, { autoConnect: false });
  Vue.use(VueSocketio, ioInstance, { store });
  inject('io', ioInstance);
  ioInstance.on('connect', () => {
    ioInstance.emit('roomJoinDriver', app.$auth.$storage.getUniversal(authHeaderKey));
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
