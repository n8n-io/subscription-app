import type { OpenApiError } from './Interface';

export function hasErrorMessage(value: unknown): value is OpenApiError {
	return (
		typeof value === 'object' && !!value && value.hasOwnProperty('message')
	);
}
