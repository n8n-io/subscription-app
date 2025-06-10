// Declare module for Vue files
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// Additional global types
interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_LICENSE_TENANT_ID: string;
	readonly VITE_PADDLE_ENVIRONMENT: string;
	readonly VITE_PADDLE_CLIENT_SIDE_TOKEN: string;
	readonly VITE_PADDLE_BILLING_PORTAL: string;
	readonly BASE_URL: string;
	readonly MODE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
