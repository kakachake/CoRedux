import {
  createStore,
  combineReducer,
  applyMiddleware,
} from "../dist/esm/index.js";
import log from "./log.js";
import reduxThunk from "./reduxThunk.js";
const mainReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        a: state.a + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        a: state.a - 1,
      };
    default:
      return state;
  }
};

interface State {
  main: {
    a: number;
  };
}

const store = createStore<
  State,
  {
    type: string;
  }
>(
  combineReducer({
    main: mainReducer,
  }),
  {
    main: {
      a: 1,
    },
  },
  applyMiddleware(log, reduxThunk)
);

store.getState();

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "INCREMENT",
});

function incrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: "INCREMENT",
      });
    }, 1000);
  };
}

store.dispatch(incrementAsync() as any);
