import { Stack } from "expo-router";
import React, { useContext } from "react";

import Loading from "@/components/Loading";
import { GlobalContext } from "@/contexts/GlobalContext/GlobalContext";

const RootScreen = () => {
    const { state } = useContext(GlobalContext);

    return (
        <>
            {state.loading && <Loading />}
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)/index" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="detail" />
            </Stack>
        </>
    );
};

export default RootScreen;
