import { Reducer } from "./types/reducer";

const combineReducer = (reducers: Record<string, Reducer<any>>) => {
  const combineReducers = Object.keys(reducers).reduce(
    (prev: Record<string, Reducer<any>>, key: string) => {
      const reducer = reducers[key];
      if (typeof reducer === "function") {
        prev[key] = reducer;
      }
      return prev;
    },
    {}
  );
  return (state, action) => {
    let isChanged = false;
    // 新的store
    const store = {};
    Object.keys(combineReducers).forEach((key) => {
      const reducer = combineReducers[key];
      store[key] = reducer(state[key], action);
      isChanged = isChanged || store[key] !== state[key];
    });
    return isChanged ? store : state;
  };
};

export { combineReducer };
