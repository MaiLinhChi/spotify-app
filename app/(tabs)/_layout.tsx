import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
};

export default TabsLayout;
