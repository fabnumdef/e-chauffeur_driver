const pkg = require('./package');

module.exports = {
  mode: 'spa',

  head: {
    title: 'e-Chauffeur - Chauffeur',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' },
    ],
  },

  loading: { color: '#fff' },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/jwt/generate?mask=token', method: 'post', propertyName: 'token' },
          user: { url: '/jwt/user?mask=id,email', method: 'get', propertyName: false },
          logout: null,
        },
      },
    },
    plugins: [
      '~/plugins/geolocation.js',
      '~/plugins/socket.js',
    ],
    scopeKey: pkg.name,
  },

  router: {
    middleware: ['auth'],
  },

  env: {
    apiUrl: process.env.API_URL,
  },

  css: [
    'swiper/dist/css/swiper.css',
    { src: '~assets/css/main.scss', lang: 'scss' },
  ],

  plugins: [
    '~/api',
    '~/plugins/states.js',
    { src: '~/plugins/swiper.js', ssr: false },
  ],

  modules: [
    '@nuxtjs/auth',
    [
      '@fabnumdef/e-chauffeur_lib-vue',
      {
        components: {
          ecButton: 'atoms/button.vue',
        },
      },
    ],
    ['qonfucius-nuxt-bulma', { css: false, postcss: false }],
    'qonfucius-nuxt-fontawesome',
  ],

  fontAwesome: {
    packs: [
      {
        package: '@fortawesome/free-solid-svg-icons',
        icons: ['faUser', 'faKey', 'faPhone', 'faFlagCheckered', 'faMapMarkerAlt', 'faAngleDown', 'faHeadset'],
      },
    ],
  },

  toast: {
    position: 'bottom-right',
    duration: 15000,
  },

  manifest: {
    name: 'e-Chauffeur - Chauffeur',
    short_name: 'e-Chauffeur',
    description: 'Application chauffeur',
    lang: 'fr',
  },
};
