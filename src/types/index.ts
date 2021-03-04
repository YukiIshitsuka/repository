export type FilterFlags<Base, Condition> = {
	[Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

export type MatchNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

export type Phantom<T, U extends string> = T & { [key in U]: never };
