<template>
  <main>
    <step-header
      :destination="currentStep.destination"
      :driving="driving"
      @startStep="startStep(currentStep.id)"
      @endStep="endStep(currentStep.id)"
    />
    <section>
      <step-current
        :date="currentStep.date"
        :previous="currentStep.previous"
        :destination="currentStep.destination"
        :details="currentStep.details"
      />
      <step-list
        :steps="remainingSteps"
      />
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { DateTime } from 'luxon';
import stepHeader from '~/components/step/header.vue';
import stepCurrent from '~/components/step/current.vue';
import stepList from '~/components/step/list.vue';

export default {
  components: {
    stepHeader,
    stepCurrent,
    stepList,
  },
  computed: {
    ...mapGetters({
      steps: 'rides/getSteps',
      driving: 'status/driving',
    }),
    currentStep() {
      const [previous, current] = this.steps;
      return {
        ...current,
        date: DateTime.fromISO(current.date).toFormat("HH 'h' mm"),
        previous: previous.destination,
      };
    },
    remainingSteps() {
      return this.steps.slice(2);
    },
  },
  methods: {
    ...mapActions({
      startStep: 'rides/startStep',
      endStep: 'rides/endStep',
    }),
  },
};
</script>

<style lang="scss" scoped>
  main {
    section {
      padding: 2em;
    }
  }
</style>
