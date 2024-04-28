export function isPromise<T>(value: T) {
	return value instanceof Promise;
}
