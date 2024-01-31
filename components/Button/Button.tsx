import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
    title: string;
    icon?: ReactNode;
    type?: string;
    className?: string;
}

const Button = ({ title, icon, type, className, ...props }: ButtonProps) => {
    let classes = "";
    switch (type) {
        case "primary": {
            classes = "bg-primary justify-center";
            break;
        }
        case "border": {
            classes = "border border-text flex-row gap-x-3 bg-transparent";
            break;
        }
    }
    return (
        <TouchableOpacity className={`items-center rounded-3xl p-3 ${classes}`} {...props}>
            <View className="absolute">{icon ? icon : null}</View>
            <Text className="text-sm font-bold text-white w-full text-center">{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
