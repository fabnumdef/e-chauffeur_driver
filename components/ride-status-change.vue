<template>
  <div class="buttons are-medium">
    <template
      v-for="(transition, i) in transitions"
    >
      <div
        :is="component(transition)"
        :key="`button${i}`"
        :class="getClass(transition)"
        :options="getOptions(transition)"
        @click="emit(transition, $event)"
      >
        {{ getText(transition) }}
      </div>
      <bulma-modal
        v-if="!!modalStatuses[transition]"
        :key="`modal${i}`"
        class="content"
        @close="modalStatuses[transition] = false"
      >
        <h2 class="title">
          Motif de l'annulation/refus
        </h2>
        <p>
          Pour annuler une course, il est nécessaire de contacter le régulateur,
          afin de lui indiquer la raison du refus/annulation, par exemple :
        </p>
        <ul>
          <li>Surnombre de passagers</li>
          <li>Problème technique</li>
          <li>Problème humain</li>
        </ul>
        <div class="field is-grouped">
          <p class="control">
            <button
              type="button"
              class="button is-primary is-inverted"
              @click="modalStatuses[transition] = false"
            >
              Ne pas Annuler
            </button>
          </p>
          <p class="control">
            <a
              type="button"
              class="button is-danger is-inverted"
              :href="`tel:${campus.phone.drivers}`"
            >Contacter le régulateur</a>
          </p>
        </div>
      </bulma-modal>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {
  actions, CREATED, CANCEL, DECLINE,
} from '~/api/status';
import dropdownButton from '~/components/dropdown.vue';
import bulmaModal from '~/components/bulma-modal.vue';

export default {
  components: {
    bulmaModal,
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
    cancelOnly: {
      type: Boolean,
      default: false,
    },
    noCancel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modalStatuses: {
        [DECLINE]: false,
        [CANCEL]: false,
      },
    };
  },
  computed: {
    ...Object.keys(actions)
      .map(a => ({ [a]: () => actions[a] }))
      .reduce((acc, curr) => Object.assign(acc, curr), {}),
    transitions() {
      return this.getTransitions(this.status).filter((t) => {
        if (this.noCancel) {
          return t !== CANCEL;
        } if (this.cancelOnly) {
          return t === CANCEL;
        }
        return true;
      });
    },
    ...mapGetters({ campus: 'context/campus' }),
  },
  methods: {
    emit(transition, id) {
      if (this.hasModalIntercept(transition)) {
        this.modalStatuses[transition] = true;
        return;
      }
      if (Array.isArray(transition)) {
        this.$emit('change', id);
      } else {
        this.$emit('change', transition);
      }
    },
    hasModalIntercept(transition) {
      return [CANCEL, DECLINE].includes(transition);
    },
    getClass(transition) {
      return {
        button: !Array.isArray(transition),
        'is-fullwidth': !!this.fullwidth,
        'is-danger': [actions.DECLINE].includes(transition)
          || [actions.CANCEL].includes(transition),
        'is-success': [actions.ACCEPT].includes(transition),
        'is-outlined': [actions.CANCEL].includes(transition),
      };
    },
    getText(transition) {
      switch (transition) {
        case actions.ACCEPT:
          return 'Accepter la course';
        case actions.DECLINE:
          return 'Refuser la course';
        case actions.CANCEL:
          return 'Annuler la course';
        case actions.START:
          return 'Commencer la course';
        case actions.WAIT:
          return 'Je suis sur place';
        case actions.PROGRESS:
          return 'Passager pris en charge';
        case actions.DELIVER:
          return 'Passager à destination';
        default:
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
