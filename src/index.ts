import { Action, AnyAction, ActionWithState, Reducer, ReadonlyMiddleware } from "rokux-types";
import { CreateReducer, Store } from "rokux";

declare namespace Rokux {
	export { Action, AnyAction, ActionWithState, Reducer, ReadonlyMiddleware, CreateReducer, Store };
}

export default Rokux;
