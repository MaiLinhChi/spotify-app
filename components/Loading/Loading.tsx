import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator } from "react-native";

const Loading = () => {
    return <ActivityIndicator size="large" color="#1db954" className="h-screen bg-dark" />;
};

export default Loading;
