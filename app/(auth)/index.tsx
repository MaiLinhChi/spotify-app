import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, View } from "react-native";

import Button from "@/components/Button";
import Heading from "@/components/Heading";

const LoginScreen = () => {
    return (
        <LinearGradient className="h-full items-center justify-center" colors={["#000000", "#2D3436"]}>
            <View className="items-center mt-10">
                <Entypo name="spotify" size={60} color="white" />
                <Heading heading="Millions of songs." className="mt-3" />
                <Heading heading="Free on Spotify." />
            </View>

            <View className="items-stretch gap-3 mt-20 w-full px-5">
                <Button title="Sign up free" type="primary" />
                <Button
                    title="Continue with Google"
                    icon={<Image style={{ width: 24, height: 24 }} source={require("@/assets/images/google.png")} />}
                    type="border"
                />
                <Button
                    title="Continue with Facebook"
                    icon={<Image style={{ width: 24, height: 24 }} source={require("@/assets/images/facebook.png")} />}
                    type="border"
                />
            </View>
        </LinearGradient>
    );
};

export default LoginScreen;
