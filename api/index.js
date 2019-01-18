import rides from './rides';
import campuses from './campuses';
import jwt from './jwt';
import status from './status';

export default function (ctx, inject) {
  const api = {
    campuses: campuses(ctx.$axios),
    rides: rides(ctx.$axios),
    jwt: jwt(ctx.$axios),
    status,
  };
  ctx.$api = api;
  inject('api', api);
}
