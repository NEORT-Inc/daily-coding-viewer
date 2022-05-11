// @ts-ignore
import { ENV_PRD } from './configs/env.production'
const environment = process.env.PROJECT_ENV || 'production'
const ENV =
  environment === 'local'
    ? require(`./configs/env.local.ts`).ENV_LOCAL
    : ENV_PRD
export default {
  mode: 'universal',
  srcDir: 'web/',
  head: {
    title: 'tiny-sketches-viewer',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['@/assets/style/common.styl', '@mdi/font/css/materialdesignicons.css'],
  plugins: [],
  components: true,
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios', '@nuxtjs/device'],
  axios: {},
  build: {},
  env: ENV,
}
