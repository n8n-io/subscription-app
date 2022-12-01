import type { OpenApiError } from './Interface';

export function isOpenApiError(value: unknown): value is OpenApiError {
	return (
		typeof value === 'object' &&
		!!value &&
		value.hasOwnProperty('code') &&
		value.hasOwnProperty('message')
	);
}
