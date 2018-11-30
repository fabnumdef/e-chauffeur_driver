import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

export default function (ctx, inject) {
  const socket = new VueSocketIO({
    debug: true,
    connection: ctx.env.apiUrl,
    vuex: {
      store: ctx.store,
      actionPrefix: 'socket/',
      mutationPrefix: 'socket/',
    },
  });
  Vue.use(socket);
  inject('io', socket.io);
}
