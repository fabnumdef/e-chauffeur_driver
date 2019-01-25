<template>
  <div class="buttons">
    <div
      :is="component(transition)"
      v-for="transition in transitions"
      :key="transition"
      :class="getClass(transition)"
      :options="getOptions(transition)"
      @click="emit(transition, $event)"
    >
      {{ getText(transition) }}
    </div>
  </div>
</template>
<script>
import { actions, CREATED, isDecline } from '~/api/status';
import dropdownButton from '~/components/dropdown.vue';

export default {
  components: {
    dropdownButton,
  },
  props: {
    status: {
      type: String,
      default: CREATED,
    },
    fullwidth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...Object.keys(actions)
      .map(a => ({ [a]: () => actions[a] }))
      .reduce((acc, curr) => Object.assign(acc, curr), {}),
    transitions() {
      let transitions = this.getTransitions(this.status);

      if (transitions.find(isDecline)) {
        const decline = transitions.filter(isDecline);
        transitions = transitions.filter(t => !isDecline(t));
        transitions.push(decline);
      }
      return transitions;
    },
  },
  methods: {
    emit(transition, id) {
      if (Array.isArray(transition)) {
        this.$emit('change', id);
      } else {
        this.$emit('change', transition);
      }
    },
    getClass(transition) {
      return {
        button: !Array.isArray(transition),
        'is-fullwidth': !!this.fullwidth,
        'is-danger': Array.isArray(transition) && transition.length > 1 && isDecline(transition[0]),
        'is-success': [actions.ACCEPT].includes(transition),
      };
    },
    getText(transition) {
      switch (transition) {
        case actions.ACCEPT:
          return 'Accepter la course';
        case actions.DECLINE_TRAFFIC:
          return 'Problème de circulation';
        case actions.DECLINE_NOBODY:
          return 'Non présentation du passager';
        case actions.DECLINE_DAMAGE:
          return 'Problème de matériel';
        default:
      }
      if (Array.isArray(transition) && transition.length > 1 && isDecline(transition[0])) {
        return 'Refuser la course';
      }
      return transition;
    },

    getOptions(transition) {
      if (!Array.isArray(transition)) {
        return null;
      }
      return {
        ...transition.map(t => ({ [t]: this.getText(t) })).reduce((acc, curr) => Object.assign(acc, curr)),
      };
    },
    component(transition) {
      if (Array.isArray(transition)) {
        return 'dropdown-button';
      }
      return 'button';
    },
  },
};
</script>
<style scoped lang="scss">
  .tag {
    text-transform: uppercase;
  }
</style>
