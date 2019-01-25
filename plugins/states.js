import Vue from 'vue';
import StateMachine from '../api/status';

export default () => {
  Vue.mixin({
    methods: {
      stateCanChange(current, projection) {
        return StateMachine(current).can(projection);
      },
      getTransitions(status) {
        return StateMachine(status).transitions();
      },
    },
  });
};
