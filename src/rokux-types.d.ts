export interface Action<T = string> {
	type: T;
}

export interface AnyAction extends Action {
	[k: string]: unknown;
}

export type ActionWithState<S, A extends Action> = {
	[Type in A["type"] as string]: (state: S, action: A) => S;
};

export type Reducer<S, A extends Action> = (state: S, action: A) => S;

export type ReadonlyMiddleware<S, A extends Action> = (nextDispatch: (action: A) => void, state: S) => (action: A) => S;
