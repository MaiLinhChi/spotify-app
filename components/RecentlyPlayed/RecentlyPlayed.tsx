import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

import { IpropsRecentlyPlayed, ItrackRecentlyPlayed } from "@/constants";

const screenWidth = Dimensions.get("window").width;

const RecentlyPlayed = ({ data }: IpropsRecentlyPlayed) => {
    const render = () => {
        const item = data.track as ItrackRecentlyPlayed;
        if (item.album) {
            return (
                <>
                    <Image src={item.album.images[0].url} className="w-12 h-12 rounded-l-md" />
                    <Text className="text-white text-xs ml-2 w-[100px] font-bold" numberOfLines={2}>
                        {item.name}
                    </Text>
                </>
            );
        } else {
            return (
                <>
                    <LinearGradient
                        colors={["#ee9ca7", "#ffdde1"]}
                        className="w-12 h-12 rounded-l-md items-center justify-center"
                    >
                        <AntDesign name="heart" size={24} color="white" />
                    </LinearGradient>
                    <Text className="text-white text-xs ml-3 font-bold">{item.name}</Text>
                </>
            );
        }
    };
    return (
        <View className="flex-row items-center bg-text rounded-md" style={{ width: screenWidth / 2 - 16 }}>
            {render()}
        </View>
    );
};

export default RecentlyPlayed;
