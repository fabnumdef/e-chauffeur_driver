<template>
  <section>
    <header class="container">
      <div class="columns">
        <p class="column">
          <sidemenu-button />
        </p>
        <div class="column is-narrow pretitle">
          Mon compte
        </div>
      </div>
    </header>
    <div
      class="notification is-primary"
    >
      <div class="container">
        Modifier mon compte
      </div>
    </div>
    <form
      class="container"
      @submit.prevent="update"
    >
      <ec-field
        label="Identifiant"
        field-id="email"
      >
        <input
          id="email"
          v-model.trim="user.email"
          type="email"
          disabled
          class="input"
        >
      </ec-field>
      <ec-field
        label="Nom"
        field-id="name"
      >
        <input
          id="name"
          v-model.trim="user.name"
          type="text"
          class="input"
        >
      </ec-field>
      <ec-field
        label="Mot de passe"
        field-id="password"
      >
        <ec-password
          id="password"
          v-model="user.password"
        />
      </ec-field>
      <button
        type="submit"
        class="button is-success"
      >
        Sauvegarder
      </button>
    </form>
  </section>
</template>

<script>
import sidemenuButton from '../components/sidemenu-button.vue';
import ecField from '~/components/form/field.vue';
import ecPassword from '~/components/form/password.vue';

const FIELDS = 'id,email,name';

export default {
  components: {
    sidemenuButton,
    ecField,
    ecPassword,
  },
  async asyncData({ $api }) {
    const { data: user } = await $api.jwt.getUser(FIELDS);
    return { user };
  },
  methods: {
    async update() {
      try {
        const { data: user } = await this.$api.users.patchUser(this.user.id, this.user, FIELDS);
        this.user = user;
        this.$toast.success('Votre compte utilisateur a bien été mis à jour.');
      } catch (e) {
        this.$toast.error('Une erreur est survenue, votre compte n\'a pas été mis à jour.');
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";

  header {
    margin-top: 10px;
    margin-bottom: 10px;
    .pretitle {
      text-transform: uppercase;
      color: $dark-gray;
      font-weight: bold;
    }
  }
  .notification {
    z-index: 1;
    box-shadow: 0 10px 20px 0 rgba($black, 0.15);
    color: $white;
    font-size: $size-1;
    line-height: $size-2;
    padding-top: $size-3;
    padding-bottom: $size-3;
    font-weight: bold;
  }
</style>
