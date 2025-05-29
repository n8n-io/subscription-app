import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import router from './router';
import messages from './i18n';

// Import stylesheets
import './assets/main.scss';

const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages,
	legacy: false,
});

// Create Vue application
const app = createApp(App);

// Register plugins
app.use(createPinia());
app.use(router);
app.use(i18n);

// Mount app
app.mount('#app');
