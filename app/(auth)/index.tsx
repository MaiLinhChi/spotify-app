import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const LoginScreen = () => {
    return (
        <LinearGradient className="h-full" colors={["rgba(0,0,0,0.8)", "transparent"]}>
            <View className="flex items-center justify-center">
                <Text>LoginScreen</Text>
            </View>
        </LinearGradient>
    );
};

export default LoginScreen;
