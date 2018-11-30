const MODULE = 'position';
const DELTA_METERS = 10;

export default function ({ app, store }) {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.watchPosition(({ coords: { latitude, longitude } }) => {
      const coord = [longitude, latitude];
      if (
        app.$auth.loggedIn
        && (
          !store.getters[`${MODULE}/hasPosition`]
          || store.getters[`${MODULE}/computeDistance`](coord) > DELTA_METERS
        )
      ) {
        store.commit(`${MODULE}/setPosition`, coord);
      }
    });
  }
  store.watch((state, getters) => getters[`${MODULE}/getPosition`], (position) => {
    if (app.$auth.loggedIn && store.getters[`${MODULE}/hasPosition`]) {
      app.$io.emit('update_position', {
        user: app.$auth.user,
        position,
      });
    }
  });
}
