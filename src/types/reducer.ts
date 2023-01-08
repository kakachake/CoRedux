import { Action, AnyAction } from "./actions";

export type Reducer<S, A extends Action = AnyAction> = (
  state: S,
  action: A
) => S;
