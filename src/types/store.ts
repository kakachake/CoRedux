import { Action, AnyAction } from "./actions";
import { Reducer } from "./reducer";
export interface Unsubscribe {
  (): void;
}
export interface Store<S = any, A extends Action = AnyAction> {
  getState(): S;
  dispatch(action: A): A;
  subscribe(listener: () => void): Unsubscribe;
}

// 接收一个createStore，返回一个增强的createStore
export type StoreEnhancer = (
  next: StoreEnhancerStoreCreator
) => StoreEnhancerStoreCreator;

export type StoreEnhancerStoreCreator = <S = any, A extends Action = AnyAction>(
  reducer: Reducer<S, A>,
  initialState?: S
) => Store<S, A>;
