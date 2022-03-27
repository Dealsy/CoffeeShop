import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Children, createContext } from "react";

interface ContextProps {
  children: any;
}

// @ts-ignore
const StoreContext = createContext();
const initialState = {
  latlong: "",
  coffeeStores: [],
};
function StoreProvider(props: ContextProps) {
  return (
    <StoreContext.Provider value={{ state: initialState }}>
      {props.children}
    </StoreContext.Provider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />{" "}
    </StoreProvider>
  );
}

export default MyApp;
