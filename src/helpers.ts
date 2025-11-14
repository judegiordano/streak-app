export function cleanNumber(n: number | string): string {
	return Number(n).toLocaleString('en-US')
}
