export interface Action<T = string> {
	type: T;
}

export interface AnyAction extends Action {
	[k: string]: unknown;
}

export type ActionFromType<A, T extends string> = A extends {
	type: T;
}
	? A
	: never;

export type ActionWithState<S, A extends Action> = {
	[Type in A["type"] as string]: (state: S, action: ActionFromType<A, Type>) => S;
};

export type Reducer<S, A extends Action> = (state: S, action: A) => S;

export type ReadonlyMiddleware<S, A extends Action> = (nextDispatch: (action: A) => S, state: S) => (action: A) => S;
