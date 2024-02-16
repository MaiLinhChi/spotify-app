import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image } from "react-native";

import { IpropsAlbum } from "@/constants";

const Album: React.FC<IpropsAlbum> = ({ data }) => {
    return (
        <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1" style={{ gap: 10 }}>
                <Image src={data.images[0].url} className="h-10 w-10" />
                <View className="flex-1">
                    <Text className="font-bold text-white mb-2" numberOfLines={1}>
                        {data.name}
                    </Text>
                    <View className="flex-row" style={{ gap: 6 }}>
                        <View className="bg-text px-1 rounded">
                            <Text className="text-xs font-bold">LYRICS</Text>
                        </View>
                        <Text className="text-text font-medium text-xs flex-1" numberOfLines={1}>
                            {data.artists.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.name}
                                    {index < data.artists.length - 1 ? ", " : ""}
                                </React.Fragment>
                            ))}
                        </Text>
                    </View>
                </View>
            </View>
            <Ionicons name="ellipsis-vertical-sharp" size={24} color="white" />
        </View>
    );
};

export default Album;
