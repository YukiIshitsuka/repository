export declare const colors: {
    readonly black: "\u001B[30m";
    readonly red: "\u001B[31m";
    readonly green: "\u001B[32m";
    readonly yellow: "\u001B[33m";
    readonly blue: "\u001B[34m";
    readonly magenta: "\u001B[35m";
    readonly cyan: "\u001B[36m";
    readonly white: "\u001B[37m";
};
export declare type Color = keyof typeof colors;
export declare class ColorConsole {
    static log(color?: Color, ...args: any): void;
    static info(...args: any): void;
    static success(...args: any): void;
    static warn(...args: any): void;
    static error(...args: any): void;
}
