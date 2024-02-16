import React from "react";

import RootScreen from "./screen";

import GlobalProvider from "@/contexts/GlobalContext/GlobalProvider";

const RootLayout = () => {
    return (
        <>
            <GlobalProvider>
                <RootScreen />
            </GlobalProvider>
        </>
    );
};

export default RootLayout;
