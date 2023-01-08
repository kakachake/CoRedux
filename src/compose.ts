export default function compose(): <R>(a: R) => R;

export default function compose<F extends Function>(f: F): F;

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R;

export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return <T>(arg: T) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  // 本项目里...args实际上就是dispatch
  return funcs.reduce((a, b) => {
    return (...args) => a(b(...args));
  });
}
