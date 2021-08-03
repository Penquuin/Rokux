# Rokux

An ultra lightweight single-truth state manager inspired by Rodux.

## Motivation

After reading through documents and API references, I found out that Rodux is a straightforward module.
I've always trying to create a simple package that helps people create game.

And because of some personal needs, I realized that without creating my own module, it is not possible
for me to find a module that fulfills my requirements.

## Samples

These are the current objects in the namespace.

```ts
import Rokux from "@rbxts/Rokux";

//Action Definitions
interface IEatCookie extends Rokux.Action<"EatCookie"> {}
type IActions = IEatCookie & Rokux.AnyAction;

//State Definitions
interface IState {
 Cookies: number;
}

const DefaultState: IState = { Cookies: 10 };

//Middleware, it's readonly which means you shouldn't yield inside it.
const createMiddleware = (): Rokux.ReadonlyMiddleware<IState, IActions> => {
 return (nextDispatch, state) => {
  return (action) => {
   print("Action Dispatched!");
   return nextDispatch(action);
  };
 };
};

//A typical reducer, it doesn't take the defaultState argument.
const Reducer = Rokux.CreateReducer<IState, IActions>({
 EatCookie: (state, action) => {
  if (state.Cookies <= 0) {
   return state;
  }
  state.Cookies -= 1;
  return state;
 },
});

const RokuxStore = new Rokux.Store<IState, IActions>(Reducer, DefaultState, createMiddleware());

//Changed now has an action parameter.
RokuxStore.Changed.Connect((actionDispatched, newState, oldState) => {
 print(`Action Has Casted Changes!\nType:${actionDispatched.type}`);
});

//You can connect to a specific action dispatch event
const connectionB = RokuxStore.ConnectToActionInfluencedSignal<IEatCookie>(
 "EatCookie",
 (action, newState, oldState) => {
  print(`Eat cookie has been dispatched!`);
 },
);

```

### FAQ

#### How do you pronounce _"Rokux"_?

Rokux should be pronunced as `ro-coc-s`.

#### Is this a stable module?

~~Definitely not, this is just a module that I made in free-time.~~


This module has become a LTS project, I will regularly review the codes.
I think it is stable for now.
