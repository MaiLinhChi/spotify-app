import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#232526",
                        borderTopWidth: 0,
                    },
                }}
                sceneContainerStyle={{ backgroundColor: "#000000e6" }}
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
                    name="your_library"
                    options={{
                        title: "Your Library",
                        tabBarActiveTintColor: "white",
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="library" size={24} color={focused ? "white" : "#9ca3af"} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
