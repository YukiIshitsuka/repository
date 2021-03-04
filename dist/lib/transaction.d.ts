import { ClientSession } from "mongodb";
export declare function transaction(): (target: any, name: string, descriptor: PropertyDescriptor) => void;
export declare const wrapTransaction: <T>(func: (session: ClientSession) => Promise<T>) => Promise<T>;
