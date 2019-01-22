<template>
  <main class="container">
    <div class="logo">
      <img alt="E-chauffeur" src="/logo.svg" />
    </div>
    <form @submit.prevent="login(user)">
      <ec-field label="Email" field-id="email" :icon-left="['fas', 'user']">
        <input
          v-model="user.email"
          id="email"
          required="required"
          class="input"
          type="email"
          placeholder="john@doe.com"
          autofocus="autofocus"
        >
      </ec-field>

      <ec-field label="Mot de passe" field-id="password" :icon-left="['fas', 'key']">
        <input
          v-model="user.password"
          required="required"
          class="input"
          type="password"
          id="password"
        >
      </ec-field>

      <div class="field login is-grouped">
        <div class="control">
          <button class="button">
            Me connecter
          </button>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
const DEFAULT_REDIRECT = '/rides';
import ecField from '~/components/form/field';

export default {
  layout: 'not-logged',
  components: {
    ecField
  },
  async asyncData({ query: { redirect } }) {
    return {
      redirectTo: redirect || DEFAULT_REDIRECT,
      user: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
  },
  methods: {
    async login(data) {
      await this.$auth.login({ data });
      this.$toast.success('Bienvenue !');
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  .logo {
    padding: 50px;
    text-align: center;
    display: block;
  }
  .field.login {
    margin-top: 32px;
    .control {
      width: 100%;
    }
    .button {
      max-width: 500px;
      display: block;
      padding: 10px 20px;
      height: auto;
      width: 100%;
      margin: 0 auto;
    }
  }
</style>
