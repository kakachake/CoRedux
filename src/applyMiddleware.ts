import { StoreEnhancer, StoreEnhancerStoreCreator } from "./types/store";
import type { AnyAction } from "./types/actions";
import { Reducer } from "./types/reducer";
import { Dispatch, MiddlewareApi } from "./types/dispatch";
import compose from "./compose";

const applyMiddleware =
  (...middlewares): StoreEnhancer =>
  (createStore: StoreEnhancerStoreCreator) =>
  <S, A extends AnyAction>(reducer: Reducer<S, A>, initialState: S) => {
    const store = createStore(reducer, initialState);
    let dispatch: Dispatch = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed. " +
          "Other middleware would not be applied to this dispatch."
      );
    };
    const middlewareApi: MiddlewareApi = {
      getState: store.getState,
      // 之所以要在dispatch外包一层，是为了形成闭包，让dispatch改变时该函数能获取到新的dispatch
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    const middlewareChain = middlewares.map((middleware) =>
      middleware(middlewareApi)
    );

    // 这里更改的同时，上面middlewareApi的dispatch也随之更改了
    dispatch = compose<typeof dispatch>(...middlewareChain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };

export { applyMiddleware };
