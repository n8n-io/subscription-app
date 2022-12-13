export function isNumber(str: unknown): boolean {
	return typeof str === 'string'
		? !isNaN(parseInt(str))
		: typeof str === 'number';
}

export function getColor(color: 'primary' | 'secondary' | 'tritiary') {
	const style = getComputedStyle(document.body);

	return style.getPropertyValue(`--color-${color}`);
}
