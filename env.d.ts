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

// Paddle v2 TypeScript definitions
interface PaddleEventData {
	name: string;
	data: any;
}

interface PaddleInitializeOptions {
	token: string;
	eventCallback?: (data: PaddleEventData) => void;
	pwCustomer?: {
		id?: string;
	};
	settings?: {
		allowLogout?: boolean;
		locale?: string;
		theme?: string;
		variant?: string;
	};
}

interface PaddleCheckoutItem {
	priceId: string;
	quantity: number;
}

interface PaddleCheckoutSettings {
	allowLogout?: boolean;
	successUrl?: string;
	locale?: string;
	theme?: string;
	variant?: string;
	displayMode?: string;
	frameTarget?: string;
	frameInitialHeight?: number;
	frameStyle?: string;
}

interface PaddleCheckoutOptions {
	items: PaddleCheckoutItem[];
	settings?: PaddleCheckoutSettings;
	customer?: {
		email?: string;
		id?: string;
	};
	address?: {
		countryCode?: string;
		postcode?: string;
	};
	customData?: Record<string, any>;
}

interface Paddle {
	Initialize: (options: PaddleInitializeOptions) => void;
	Environment: {
		set: (environment: string) => void;
	};
	Checkout: {
		open: (options: PaddleCheckoutOptions) => void;
		close: () => void;
	};
	Update: (options: Partial<PaddleInitializeOptions>) => void;
}

declare global {
	interface Window {
		Paddle?: Paddle;
	}
}
