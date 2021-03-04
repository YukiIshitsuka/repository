export const colors = {
	black: "\u001b[30m",
	red: "\u001b[31m",
	green: "\u001b[32m",
	yellow: "\u001b[33m",
	blue: "\u001b[34m",
	magenta: "\u001b[35m",
	cyan: "\u001b[36m",
	white: "\u001b[37m",
} as const;
export type Color = keyof typeof colors;

const reset = "\u001b[0m";

export class ColorConsole {
	public static log(color: Color = "black", ...args: any): void {
		console.log(`${colors[color]}${args}${reset}`);
	}
	public static info(...args: any): void {
		console.log(`${colors.green}${args}${reset}`);
	}

	public static success(...args: any): void {
		console.log(`${colors.blue}${args}${reset}`);
	}
	public static warn(...args: any): void {
		console.warn(`${colors.yellow}${args}${reset}`);
	}
	public static error(...args: any): void {
		console.error(`${colors.red}${args}${reset}`);
	}
}
