export default ({ store, redirect }) => {
  const hasRides = store.getters('rides/rides').length > 0;
  const isActive = store.getter('context/isActive');
  if (hasRides && isActive) {
    return redirect('_campus/active');
  } else if (hasRides) {
    return redirect('_campus/inactive');
  } else if (!hasRides) {
    return redirect('_campus/break');
  }
};
