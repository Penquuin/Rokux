import {
	Action as action,
	AnyAction as anyAction,
	ActionWithState as actionWithState,
	Reducer as reducer,
	ReadonlyMiddleware as readonlyMiddleware,
} from "rokux-types";

import { CreateReducer as createReducer, Store as store } from "rokux";

namespace Rokux {
	export const CreateReducer: typeof createReducer = createReducer;
	export const Store: typeof store = store;

	export type Action = action;
	export type AnyAction = anyAction;
	export type ActionWithState<S, A extends Action> = actionWithState<S, A>;
	export type ReducerM<S, A extends Action> = reducer<S, A>;
	export type ReadonlyMiddleware<S, A extends Action> = readonlyMiddleware<S, A>;
}

export default Rokux;
