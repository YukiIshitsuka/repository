export const randNumber = (num = 100): number => {
	return Math.floor(Math.random() * num);
};
export const generateMoji = (): string => {
	return Math.random().toString(32).substring(2);
};
export const deepCopy = <T>(data: T): T => {
	return JSON.parse(JSON.stringify(data));
};
