import { Action } from "./types/actions";
import { Reducer } from "./types/reducer";
import { Store, StoreEnhancer } from "./types/store";

const createStore = <S, A extends Action>(
  reducer: Reducer<S, A>,
  initialState: S,
  enhancer?: StoreEnhancer
): Store<S, A> => {
  if (enhancer && typeof enhancer === "function") {
    return enhancer(createStore)(reducer, initialState) as Store<S, A>;
  }

  let state = initialState;
  const listeners: Function[] = [];
  let isDispatch = false;

  //1. getState
  const getState = () => state;

  //2. 发布订阅
  const subscribe = (listener: () => void) => {
    listeners.push(listener);
    const unSubscribe = () => {
      listeners.splice(listeners.indexOf(listener), 1);
    };
    return unSubscribe;
  };

  //3. dispatch
  const dispatch = (action: A) => {
    if (typeof action !== "object" || !("type" in action)) {
      throw new Error(
        'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.'
      );
    }
    if (isDispatch) {
      throw new Error("Reducers may not dispatch actions.");
    }
    isDispatch = true;
    try {
      state = reducer(state, action);
    } finally {
      isDispatch = false;
    }
    const curListeners = [...listeners];
    curListeners.forEach((listen) => {
      listen();
    });
    return action;
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

export { createStore };
