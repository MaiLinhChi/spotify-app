import { AntDesign, Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useContext, useLayoutEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Album from "@/components/Album";
import { IAlbum, Iartists } from "@/constants";
import { ACCESS_TOKEN_KEY } from "@/constants/key";
import { GlobalContext } from "@/contexts/GlobalContext/GlobalContext";
import { setLoading } from "@/contexts/GlobalContext/action";

const DetailScreen = () => {
    const params = useLocalSearchParams<{
        id: string;
        image: string;
        type: string;
        artist: string;
        release_date: string;
    }>();
    const [albums, setAlbums] = useState<IAlbum[]>([
        {
            name: "",
            images: [
                {
                    url: "",
                    width: 0,
                    height: 0,
                },
            ],
            artists: [
                {
                    name: "",
                    id: "",
                    images: [
                        {
                            url: "",
                            width: 0,
                            height: 0,
                        },
                    ],
                },
            ],
        },
    ]);
    const [artist, setArtist] = useState<Iartists>({
        id: "",
        name: "",
        images: [
            {
                width: 0,
                height: 0,
                url: "",
            },
        ],
    });
    const { dispatch } = useContext(GlobalContext);

    useLayoutEffect(() => {
        dispatch(setLoading(true));
        (async () => {
            try {
                const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
                const albumRes = await fetch(`https://api.spotify.com/v1/artists/${params.id}/albums`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken?.slice(1).slice(0, -1)}`,
                    },
                });
                const artistRes = await fetch(`https://api.spotify.com/v1/artists/${params.artist}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken?.slice(1).slice(0, -1)}`,
                    },
                });
                const albumResponse = await albumRes.json();
                const artistResponse = await artistRes.json();
                setAlbums(albumResponse.items);
                setArtist(artistResponse);
                dispatch(setLoading(false));
            } catch (error) {
                console.log("Error to get profile with " + error);
                dispatch(setLoading(false));
            }
        })();
    }, []);
    return (
        <LinearGradient colors={["#434343", "#000000"]}>
            <SafeAreaView edges={["bottom", "top"]} className="px-3">
                <View className="h-8">
                    <AntDesign name="arrowleft" size={24} color="white" onPress={() => router.back()} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="flex-row justify-between mt-2" style={{ gap: 8 }}>
                        <View
                            className="flex-row flex-1 items-center rounded-md relative pl-2"
                            style={{ gap: 8, backgroundColor: "rgba(240, 240, 240, 0.1)" }}
                        >
                            <AntDesign name="search1" size={20} color="white" />
                            <TextInput
                                placeholder="Find in play list"
                                placeholderTextColor="white"
                                className="font-bold text-white py-[6px] flex-1 pr-2"
                            />
                        </View>
                        <TouchableOpacity
                            className="items-center justify-center rounded-md"
                            style={{ backgroundColor: "rgba(240, 240, 240, 0.1)" }}
                        >
                            <Text className="text-white font-bold px-4">Sort</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="items-center mt-8">
                        <Image src={params.image} className="w-[200px] h-[200px]" />
                    </View>
                    <View className="flex-row items-center mt-4" style={{ gap: 8 }}>
                        <Image src={artist.images[0].url} className="h-6 w-6 rounded-full bg-cover" />
                        <Text className="text-white font-bold">{artist.name}</Text>
                    </View>
                    <View className="flex-row items-center mt-2" style={{ gap: 4 }}>
                        <Text className="text-text font-medium text-[12px]">
                            {params.type.slice(0, 1).toUpperCase() + params.type.slice(1)}
                        </Text>
                        <Entypo name="controller-record" size={6} color="gray" />
                        <Text className="text-text font-medium text-[12px]">
                            {moment(params.release_date).format("LL")}
                        </Text>
                    </View>
                    <View className="mt-2 flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="border-2 border-white rounded">
                                <View className="border-2 border-dark rounded">
                                    <Image src={params.image} className="h-10 w-7 bg-cover" />
                                </View>
                            </View>
                            <AntDesign name="pluscircleo" size={24} color="gray" style={{ marginLeft: 20 }} />
                            <Feather name="arrow-down-circle" size={24} color="gray" style={{ marginLeft: 20 }} />
                            <Ionicons name="ellipsis-vertical" size={24} color="gray" style={{ marginLeft: 10 }} />
                        </View>

                        <View className="flex-row items-center" style={{ gap: 10 }}>
                            <FontAwesome name="random" size={24} color="#1db954" />
                            <Ionicons name="play-circle-sharp" size={50} color="#1db954" />
                        </View>
                    </View>
                    <View className="mt-6" style={{ gap: 14 }}>
                        {albums.map((item, index) => (
                            <Album data={item} key={index} />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default DetailScreen;
