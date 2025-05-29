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
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
