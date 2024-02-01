import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
    title: string;
    icon?: ReactNode;
    type?: string;
    disabled?: boolean;
    onPress?: () => void;
}

const Button = ({ title, icon, type, onPress, disabled }: ButtonProps) => {
    let classes = "";
    switch (type) {
        case "primary": {
            classes = "bg-primary justify-center";
            break;
        }
        case "border": {
            classes = "border border-text flex-row bg-transparent";
            break;
        }
    }
    return (
        <TouchableOpacity
            className={`w-full items-center rounded-3xl p-3 mt-4 ${classes}`}
            onPress={onPress}
            disabled={disabled}
        >
            <View className="absolute ml-5">{icon ? icon : null}</View>
            <Text className="text-sm font-bold text-white w-full text-center">{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
