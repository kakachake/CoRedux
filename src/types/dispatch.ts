import { Action, AnyAction } from "./actions";

export type Dispatch = <A extends Action = AnyAction>(
  type: A,
  ...extraArgs: any[]
) => A;

export interface MiddlewareApi<D extends Dispatch = Dispatch, S = any> {
  getState(): S;
  dispatch: D;
}
