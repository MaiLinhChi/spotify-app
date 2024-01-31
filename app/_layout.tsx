import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)/index" />
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
};

export default RootLayout;
