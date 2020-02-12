<template>
  <main class="full-screen">
    <header>
      <h1>
        Modifier mon compte
      </h1>
    </header>
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
  </main>
</template>

<script>
import ecField from '~/components/form/field.vue';
import ecPassword from '~/components/form/password.vue';

const FIELDS = 'id,email,name';

export default {
  components: {
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
    background-color: $primary;
    width: 100%;
    h1 {
      color: $white;
      font-size: 2em;
      font-weight: 700;
      margin: 1em;
    }
  }
  form {
    width: 100%;
    padding: 2em;
    div {
      width: 100%;
    }
  }
</style>
