import { createContext } from "react";
import { Store } from "CoRedux";

const reduxContext = createContext<Store>(null);

const Provider = reduxContext.Provider;

export { Provider, reduxContext };
