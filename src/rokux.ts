import Signal from "@rbxts/signal";
import Rokux from "index";
import { Action, ActionFromType, ActionWithState, AnyAction, ReadonlyMiddleware, Reducer } from "rokux-types";

export function CreateReducer<S, A extends Action>(reducerTable: ActionWithState<S, A>): Reducer<S, A> {
	return (state: S, action: A) => {
		const found = reducerTable[action.type as A["type"]];
		if (found) {
			return found(state, action as ActionFromType<A, typeof action["type"]>);
		}
		return state;
	};
}

export class Store<S, A extends Action> {
	private Reducer: Reducer<S, A>;
	private CurrentState: S;
	private ReadonlyMiddleware: ReadonlyMiddleware<S, A> | undefined;

	public Changed = new Signal<(ActionDispatched: A, NewState: S, OldState: S) => void>();

	constructor(Reducer: Reducer<S, A>, DefaultState: S, ReadonlyMiddleware?: ReadonlyMiddleware<S, A>) {
		this.Reducer = Reducer;
		this.CurrentState = DefaultState;
		if (ReadonlyMiddleware) {
			this.ReadonlyMiddleware = ReadonlyMiddleware;
		}
	}
	private SecretDispatch(State: S, ActionDispatched: A) {
		const OldOne = this.CurrentState;
		const NewOne = this.Reducer(State, ActionDispatched);
		this.CurrentState = NewOne;
		this.Changed.Fire(ActionDispatched, NewOne, OldOne);
	}

	/**
	 * GetState
	 */
	public GetState(): S {
		return this.CurrentState;
	}

	public Dispatch(ActionDispatched: A): void {
		if (this.ReadonlyMiddleware) {
			const OldOne = this.CurrentState;
			const NewOne = this.ReadonlyMiddleware((action) => {
				return this.Reducer(this.CurrentState, action);
			}, this.CurrentState)(ActionDispatched);

			this.CurrentState = NewOne;
			this.Changed.Fire(ActionDispatched, NewOne, OldOne);
		} else {
			this.SecretDispatch(this.CurrentState, ActionDispatched);
		}
	}

	/**
	 * This
	 */
	public ConnectToActionInfluencedSignal<T extends Rokux.Action>(
		typeName: T["type"],
		callback: (action: T, newState: S, oldState: S) => void,
	): RBXScriptConnection {
		return this.Changed.Connect((a, n, o) => {
			if (a["type"] !== typeName) {
				return;
			}
			callback(a as unknown as T, n, o);
		});
	}
}
