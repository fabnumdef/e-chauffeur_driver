// We've to disable param reassign, because it's the common behavior of vuex
/* eslint-disable no-param-reassign */
const EARTH_RADIUS = 6378137;

function deg2rad(x) {
  return Math.PI * x / 180;
}

function getDistance([lng1, lat1], [lng2, lat2]) {
  const rlo1 = deg2rad(lng1);
  const rla1 = deg2rad(lat1);
  const rlo2 = deg2rad(lng2);
  const rla2 = deg2rad(lat2);
  const dlo = (rlo2 - rlo1) / 2;
  const dla = (rla2 - rla1) / 2;
  const a = (Math.sin(dla) * Math.sin(dla)) + Math.cos(rla1) * Math.cos(rla2) * (Math.sin(dlo) * Math.sin(dlo));
  const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (EARTH_RADIUS * d);
}

export const state = () => ({
  position: [null, null], // lon, lat
});

export const mutations = {
  setPosition(s, [lon, lat] = [null, null]) { s.position = [lon, lat]; },
};

export const getters = {
  getPosition: s => s.position,
  hasPosition: s => s.position.reduce((a, p) => p && a),
  computeDistance: s => ([lat, lng]) => getDistance(s.position, [lat, lng]),
};
