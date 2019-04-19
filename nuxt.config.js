const pkg = require('./package');

module.exports = {
  mode: 'spa',

  head: {
    title: 'e-Chauffeur - Chauffeur',
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' },
    ],
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
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
    { src: '~/plugins/swiper.js', ssr: false },
  ],

  modules: [
    [
      '@fabnumdef/e-chauffeur_lib-vue',
      {
        components: {
          ecButton: 'atoms/button.vue',
        },
        api: {
          jwt: 'jwt',
          rides: 'rides',
          campuses: 'campuses',
        },
        withAuth: true,
      },
    ],
  ],

  fontAwesome: {
    packs: [
      {
        package: '@fortawesome/free-solid-svg-icons',
        icons: [
          'faUser',
          'faKey',
          'faPhone',
          'faFlagCheckered',
          'faMapMarkerAlt',
          'faAngleDown',
          'faHeadset',
          'faSpinner',
        ],
      },
    ],
  },

  manifest: {
    name: 'e-Chauffeur - Chauffeur',
    short_name: 'e-Chauffeur',
    description: 'Application chauffeur',
  },
};
