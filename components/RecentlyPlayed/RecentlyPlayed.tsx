import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, Image, Dimensions, View } from "react-native";

import { IrecentlyPlayed } from "@/constants";
import { ACCESS_TOKEN_KEY } from "@/constants/key";

const screenWidth = Dimensions.get("window").width;

const RecentlyPlayed = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState<IrecentlyPlayed[]>([
        {
            played_at: "",
            track: {
                album: {
                    images: [
                        {
                            url: "",
                            height: 0,
                            width: 0,
                        },
                    ],
                    name: "",
                    type: "",
                    release_date: "",
                },
                artists: [
                    {
                        name: "",
                        id: "",
                        images: [
                            {
                                url: "",
                                height: 0,
                                width: 0,
                            },
                        ],
                    },
                ],
                duration_ms: 0,
                name: "",
            },
        },
    ]);

    const getRecentlyPlayed = async () => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
            const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=6", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken?.slice(1).slice(0, -1)}`,
                },
            });

            const recentlyPlayedResponse = await res.json();
            setRecentlyPlayed(recentlyPlayedResponse.items);
        } catch (error) {
            console.log("Error to get profile with " + error);
        }
    };
    useEffect(() => {
        getRecentlyPlayed();
    }, []);
    return (
        <>
            {recentlyPlayed.map((item, index) => (
                <Link
                    push
                    href={{
                        pathname: "/detail",
                        params: {
                            id: item.track.artists[0].id,
                            image: item.track.album.images[0].url,
                            type: item.track.album.type,
                            release_date: item.track.album.release_date,
                            artist: item.track.artists[0].id,
                        },
                    }}
                    key={index}
                >
                    <View className="flex-row items-center bg-text rounded-md" style={{ width: screenWidth / 2 - 16 }}>
                        <Image src={item.track.album.images[0].url} className="w-12 h-12 rounded-l-md" />
                        <Text className="text-white text-xs ml-2 w-[100px]" numberOfLines={2}>
                            {item.track.name}
                        </Text>
                    </View>
                </Link>
            ))}
        </>
    );
};

export default RecentlyPlayed;
