import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import router from './router';
import messages from './i18n';
import {
	getEnvironmentConfig,
	validateEnvironmentConfig,
	isDevelopmentMode,
} from './utils/environment';

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

// Validate Paddle configuration in development mode
if (isDevelopmentMode()) {
	const envConfig = getEnvironmentConfig();
	const validation = validateEnvironmentConfig();

	console.log(
		`🔧 Environment: ${envConfig.displayName} (${envConfig.environment})`
	);
	console.log('🔍 Configuration details:', {
		hasToken: !!envConfig.clientToken,
		tokenLength: envConfig.clientToken.length,
		tokenPrefix: envConfig.clientToken
			? envConfig.clientToken.substring(0, 10) + '...'
			: 'none',
		environment: envConfig.environment,
	});

	if (!validation.isValid) {
		console.warn('⚠️  Paddle Configuration Issues:');
		validation.errors.forEach((error) => console.warn(`   - ${error}`));
		console.warn(
			'   Check your .env file and update with proper Paddle tokens'
		);
		console.warn(
			'   Current token starts with:',
			envConfig.clientToken
				? envConfig.clientToken.substring(0, 5) + '...'
				: 'none'
		);
	} else {
		console.log('✅ Paddle configuration is valid');
	}
}

// Mount app
app.mount('#app');
