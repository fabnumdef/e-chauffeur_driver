<template>
  <main>
    <step-header
      :destination="currentStep.destination"
      :driving="driving"
      @updateStep="updateSteps({ rideId: currentStep.id, campusId: campus.id, driverId })"
    />
    <section>
      <step-current
        :previous="currentStep.previous"
        :destination="currentStep.destination"
      >
        <template #header>
          <h2>Etape en cours</h2>
          <h2>{{ currentStep.date }}</h2>
        </template>
        <template #details>
          <h2>Détails :</h2>
          <ul>
            <li
              v-for="(detail, index) in currentStep.details"
              :key="index"
            >
              {{ detail.key }} : <strong>{{ detail.value }}</strong>
            </li>
          </ul>
        </template>
      </step-current>
      <step-list
        :steps="remainingSteps"
      />
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import stepHeader from '~/components/step/header.vue';
import stepCurrent from '~/components/step/current.vue';
import stepList from '~/components/step/list.vue';

export default {
  components: {
    stepHeader,
    stepCurrent,
    stepList,
  },
  data() {
    return {
      driverId: this.$auth.user.id,
    };
  },
  computed: {
    ...mapGetters({
      steps: 'rides/steps',
      driving: 'status/driving',
      campus: 'context/campus',
    }),
    currentStep() {
      return this.steps[0];
    },
    remainingSteps() {
      return this.steps.slice(1);
    },
  },
  methods: {
    ...mapActions({
      updateSteps: 'rides/updateSteps',
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
