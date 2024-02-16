import React, { useReducer } from "react";

import { GlobalContext } from "./GlobalContext";
import globalReducer, { initialState } from "./reducer";

import { Props } from "@/constants";

const GlobalProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);
    return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
