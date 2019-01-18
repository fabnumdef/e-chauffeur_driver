import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';


export default function ({ env, store, app }, inject) {
  const ioInstance = io(env.apiUrl, { autoConnect: false });
  Vue.use(VueSocketio, ioInstance, { store });
  inject('io', ioInstance);
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
