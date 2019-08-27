const MODULE = 'position';
const DELTA_METERS = 1;

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
      },
      null,
      {
        enableHighAccuracy: true,
      });
    }
  };
  if (process.client && !!navigator && 'geolocation' in navigator) {
    autoGeoloc(app.$auth.loggedIn);
    app.$auth.$storage.watchState('loggedIn', autoGeoloc);
    store.watch((state, getters) => getters['context/campus'] && getters[`${MODULE}/getPosition`], (position) => {
      if (app.$auth.loggedIn && store.getters[`${MODULE}/hasPosition`] && store.getters['context/campus']) {
        const rides = store.state.rides.rides && store.state.rides.rides.length > 0
          ? store.state.rides.rides : [];
        app.$io.emit('positionUpdate', {
          user: app.$auth.user,
          campus: store.getters['context/campus'],
          position,
          rides,
        });
      }
    });
  }
}
