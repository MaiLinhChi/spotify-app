import React, { useState } from "react";

import { GlobalContext } from "./GlobalContext";

import { Props } from "@/constants";

const GlobalProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState(false);
    return <GlobalContext.Provider value={{ loading, setLoading }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
