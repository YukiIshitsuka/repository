export class RepositoryInvalidError extends Error {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(...params: any[]) {
		super(...params);
		Object.setPrototypeOf(this, RepositoryInvalidError.prototype);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, RepositoryInvalidError);
		}
		this.name = "RepositoryInvalidError";
	}
}
