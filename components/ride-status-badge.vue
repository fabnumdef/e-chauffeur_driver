<template>
  <span
    v-if="STARTED === status"
    class="tag is-rounded"
  >
    En approche
  </span>
  <span
    v-else-if="WAITING === status"
    class="tag is-rounded"
  >
    En attente
  </span>
  <span
    v-else-if="IN_PROGRESS === status"
    class="tag is-rounded"
  >
    En cours
  </span>
  <span
    v-else-if="DELIVERED === status"
    class="tag is-rounded"
  >
    À destination
  </span>
  <span
    v-else
    class="tag is-rounded"
  >
    Planifiée
  </span>
</template>
<script>
import * as states from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';

export default {
  props: {
    status: {
      type: String,
      default: states.CREATED,
    },
  },
  computed: {
    ...Object.keys(states)
      .map((a) => ({ [a]: () => states[a] }))
      .reduce((acc, curr) => Object.assign(acc, curr), {}),
  },
};
</script>
<style scoped lang="scss">
  .tag {
    text-transform: uppercase;
  }
</style>
