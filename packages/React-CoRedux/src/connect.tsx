import { reduxContext } from "./index";
import React, { useContext, useEffect } from "react";

export function connect(
  mapStateToProps: (state: any) => any,
  mapDispatchToProps: (dispatch: any) => any
) {
  return function ConnectHOC(Component) {
    return (props: any) => {
      const store = useContext(reduxContext);
      const [state, setState] = React.useState(
        mapStateToProps && mapStateToProps(store.getState())
      );
      const dispatchProps =
        mapDispatchToProps && mapDispatchToProps(store.dispatch);
      useEffect(() => {
        const unSubscribe = store.subscribe(() => {
          const stateProps =
            mapStateToProps && mapStateToProps(store.getState());
          setState(stateProps);
        });

        return () => {
          unSubscribe();
        };
      }, []);
      const combinedProps = { ...props, ...state, ...dispatchProps };
      return <Component {...combinedProps} />;
    };
  };
}
