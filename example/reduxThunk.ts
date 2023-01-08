export default function ({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      action(dispatch, getState);
    } else {
      return next(action);
    }
  };
}
