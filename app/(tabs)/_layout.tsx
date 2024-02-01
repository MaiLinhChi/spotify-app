import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#596164",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarActiveTintColor: "white",
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome name="home" size={24} color={focused ? "white" : "#9ca3af"} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "profile",
                    tabBarActiveTintColor: "white",
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome name="user" size={24} color={focused ? "white" : "#9ca3af"} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
