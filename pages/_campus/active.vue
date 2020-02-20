<template>
  <main :class="isWarning ? 'warning' : ''">
    <step-header
      :destination="currentStep.destination"
      :ride-status="rideStatus"
      @updateStep="updateSteps(
        { step: currentStep, campusId: campus.id }
      )"
    />
    <section>
      <step-current
        :previous="currentStep.previous"
        :destination="currentStep.destination"
      >
        <template #header>
          <h2>Etape en cours</h2>
          <h2>{{ stepDate }}</h2>
        </template>
        <template #details>
          <h2>Action :</h2>
          <ul>
            <li>{{ currentStep.passengersCount.key }} : <strong>{{ currentStep.passengersCount.value }}</strong></li>

            <ul
              v-if="currentStep.phone.length > 0"
              class="phone-list"
            >
              <h2>Téléphone :</h2>
              <li
                v-for="(phone, index) in currentStep.phone"
                :key="index"
              >
                {{ phone }}
              </li>
            </ul>

            <h2 v-if="currentStep.details.length > 0">
              Détails :
            </h2>
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
        v-if="!isWarning"
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
  data() {
    return {
      driverId: this.$auth.user.id,
    };
  },
  computed: {
    ...mapGetters({
      steps: 'rides/steps',
      workStatus: 'status/workStatus',
      rideStatus: 'status/rideStatus',
      isWarning: 'rides/alert',
      campus: 'context/campus',
    }),
    currentStep() {
      return this.steps[0];
    },
    stepDate() {
      return DateTime.fromISO(this.currentStep.date).toFormat("HH 'h' mm");
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
  @import "~assets/css/head";

  main {
    &.warning {
      background-color: $red;
      color: $white;
      height: inherit;
      * {
        background-color: inherit;
        color: inherit;
      }
    }
    section {
      padding: 2em;
    }
  }
</style>
