export class RepositoryCLIError extends Error {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(...params: any[]) {
		super(...params);
		Object.setPrototypeOf(this, RepositoryCLIError.prototype);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, RepositoryCLIError);
		}
		this.name = "RepositoryCLIError";
	}
}
