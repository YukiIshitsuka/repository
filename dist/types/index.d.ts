export declare type FilterFlags<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
export declare type MatchNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
export declare type Phantom<T, U extends string> = T & {
    [key in U]: never;
};
