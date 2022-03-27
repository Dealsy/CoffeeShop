import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Children, createContext, useReducer } from "react";

interface ContextProps {
  children: any;
}

// @ts-ignore
const StoreContext = createContext();

const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {
        ...state,
        latlong: action.payload.latlong,
      };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return {
        ...state,
        coffeeStores: action.payload.latlong,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function StoreProvider(props: ContextProps) {
  const initialState = {
    latlong: "",
    coffeeStores: [],
  };

  // @ts-ignore
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
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
