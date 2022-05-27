import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import 'vuetify/styles';
import router from './router';

loadFonts();

export const app = createApp(App).use(vuetify).use(router).mount('#app');

