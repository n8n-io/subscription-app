import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import messages from './i18n';

import './assets/main.css';

const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
