import React from "react";
import { Text } from "react-native";

interface HeadingProps {
    heading: string;
    className?: string;
}

const Heading = ({ heading = "", className = "", ...props }: HeadingProps) => {
    return (
        <Text className={`${className} text-white text-3xl font-extrabold leading-10`} {...props}>
            {heading}
        </Text>
    );
};

export default Heading;
