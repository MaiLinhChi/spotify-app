import { Stack } from "expo-router";
import React from "react";

import GlobalProvider from "@/contexts/GlobalContext/GlobalProvider";

const RootLayout = () => {
    return (
        <GlobalProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)/index" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </GlobalProvider>
    );
};

export default RootLayout;
