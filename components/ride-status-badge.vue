<template>
  <span
    v-if="STARTED === status"
    class="tag is-rounded"
  >
    En approche
  </span>
  <span
    v-else
    class="tag is-rounded"
  >
    Planifiée
  </span>
</template>
<script>
import {
  states,
  CREATED,
} from '~/api/status';

export default {
  props: {
    status: {
      type: String,
      default: CREATED,
    },
  },
  computed: {
    ...Object.keys(states)
      .map(a => ({ [a]: () => states[a] }))
      .reduce((acc, curr) => Object.assign(acc, curr), {}),
  },
};
</script>
<style scoped lang="scss">
  .tag {
    text-transform: uppercase;
  }
</style>
