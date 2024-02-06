import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useContext } from "react";

import Loading from "@/components/Loading";
import { GlobalContext } from "@/contexts/GlobalContext/GlobalContext";

const TabsLayout = () => {
    const { loading } = useContext(GlobalContext);
    return (
        <>
            {loading && <Loading />}
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#232526",
                        borderTopWidth: 0,
                        overflow: "visible",
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
                        title: "Profile",
                        tabBarActiveTintColor: "white",
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome name="user" size={24} color={focused ? "white" : "#9ca3af"} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
