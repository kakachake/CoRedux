export default function ({ getState, dispatch }) {
  return (next) => (action) => {
    console.log("action:", action);
    const res = next(action);
    console.log("log end");
    return res;
  };
}
