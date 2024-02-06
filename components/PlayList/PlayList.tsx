import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";

import { IplayList, IpropsPlayList } from "@/constants";
import { ACCESS_TOKEN_KEY } from "@/constants/key";
import { GlobalContext } from "@/contexts/GlobalContext/GlobalContext";

const PlayList: React.FC<IpropsPlayList> = ({ category_id }) => {
    const { setLoading } = useContext(GlobalContext);
    const [playlist, setPlaylist] = useState<IplayList>({
        message: "",
        playlists: {
            items: [],
        },
    });

    const getPlaylist = async (category_id: string) => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
            const res = await fetch(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken?.slice(1).slice(0, -1)}`,
                },
            });

            const playListResponse = await res.json();
            setPlaylist(playListResponse);
        } catch (error) {
            console.log("Error to get play list with " + error);
        }
    };

    useEffect(() => {
        setLoading(true);
        getPlaylist(category_id);
    }, [category_id]);
    return (
        <View className="mt-5">
            <Text className="text-white font-bold text-xl mb-3" numberOfLines={1}>
                {playlist.message}
            </Text>
            <ScrollView horizontal className="gap-4">
                {playlist.playlists.items.map((item, index) => (
                    <View key={index} className="w-[140px]">
                        <Image src={item.images[0].url} className="w-full h-[140px] bg-cover" />
                        <Text className="text-white font-extrabold mt-3 leading-6" numberOfLines={1}>
                            {item.name}
                        </Text>
                        <Text className="text-text leading-6 font-semibold text-sm" numberOfLines={2}>
                            {item.description.split(".")[0]}.
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default PlayList;
