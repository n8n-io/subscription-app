/**
 * Environment utilities for Paddle configuration and development helpers
 */

export type PaddleEnvironment = 'sandbox' | 'production';

/**
 * Get the current Paddle environment
 */
export function getPaddleEnvironment(): PaddleEnvironment {
	const env = import.meta.env.VITE_PADDLE_ENVIRONMENT;
	return env === 'production' ? 'production' : 'sandbox';
}

/**
 * Check if we're running in sandbox mode
 */
export function isSandboxMode(): boolean {
	return getPaddleEnvironment() === 'sandbox';
}

/**
 * Check if we're running in production mode
 */
export function isProductionMode(): boolean {
	return getPaddleEnvironment() === 'production';
}

/**
 * Check if we're in development mode
 */
export function isDevelopmentMode(): boolean {
	return import.meta.env.MODE === 'development';
}

/**
 * Get environment display name for UI
 */
export function getEnvironmentDisplayName(): string {
	const env = getPaddleEnvironment();
	return env === 'sandbox' ? 'Sandbox' : 'Production';
}

/**
 * Get environment-specific configuration
 */
export function getEnvironmentConfig() {
	return {
		environment: getPaddleEnvironment(),
		displayName: getEnvironmentDisplayName(),
		isSandbox: isSandboxMode(),
		isProduction: isProductionMode(),
		isDevelopment: isDevelopmentMode(),
		clientToken: import.meta.env.VITE_PADDLE_CLIENT_SIDE_TOKEN || '',
	};
}

/**
 * Validate environment configuration
 */
export function validateEnvironmentConfig(): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];
	const config = getEnvironmentConfig();

	if (!config.clientToken) {
		errors.push('VITE_PADDLE_CLIENT_SIDE_TOKEN is required');
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}
