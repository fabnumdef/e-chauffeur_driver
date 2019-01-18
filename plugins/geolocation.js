const MODULE = 'position';
const DELTA_METERS = 10;

export default function ({ app, store }) {
  let watchID;
  const autoGeoloc = (isLogged) => {
    if (!isLogged && watchID) {
      navigator.geolocation.clearWatch(watchID);
    } else if (navigator && navigator.geolocation) {
      watchID = navigator.geolocation.watchPosition(({ coords: { latitude, longitude } }) => {
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
  };
  autoGeoloc(app.$auth.loggedIn);
  app.$auth.$storage.watchState('loggedIn', autoGeoloc);
  store.watch((state, getters) => getters[`${MODULE}/getPosition`], (position) => {
    if (app.$auth.loggedIn && store.getters[`${MODULE}/hasPosition`]) {
      app.$io.emit('positionUpdate', {
        user: app.$auth.user,
        position,
      });
    }
  });
}
