export function isNumber(str: unknown): boolean {
	return typeof str === 'string'
		? !isNaN(parseInt(str))
		: typeof str === 'number';
}
