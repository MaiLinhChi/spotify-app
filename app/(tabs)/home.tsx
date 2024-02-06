import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";

import PlayList from "@/components/PlayList";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import { IrecentlyPlayed, IprofileResponse } from "@/constants";
import { ACCESS_TOKEN_KEY } from "@/constants/key";
import { GlobalContext } from "@/contexts/GlobalContext/GlobalContext";

const HomeScreen = () => {
    const [profile, setProfile] = useState<IprofileResponse>({
        id: "",
        country: "",
        display_name: "",
        email: "",
        followers: {
            href: "",
            total: 0,
        },
        images: [
            {
                url: "",
                height: 0,
                width: 0,
            },
        ],
    });
    const [recentlyPlayed, setRecentlyPlayed] = useState<IrecentlyPlayed[]>([]);
    const { setLoading } = useContext(GlobalContext);

    const getProfile = async () => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
            const res = await fetch("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken?.slice(1).slice(0, -1)}`,
                },
            });
            const profileResponse = await res.json();
            setProfile(profileResponse);
        } catch (error) {
            console.log("Error to get profile with " + error);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        switch (true) {
            case hour < 12: {
                return "Good morning";
            }
            case hour >= 12 && hour <= 18: {
                return "Good afternoon";
            }
            case hour > 18: {
                return "Good evening";
            }
        }
    };

    const getRecentlyPlayed = async () => {
        try {
            const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
            const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=3", {
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

    const start = async () => {
        await getProfile();
        await getRecentlyPlayed();
        setLoading(false);
    };

    useEffect(() => {
        start();
    }, []);

    return (
        <LinearGradient className="h-full" colors={["#000000", "#434343"]}>
            <View className="mt-[10%] mb-[13%] px-3">
                <View className="flex-row justify-between items-center pb-3">
                    <View className="flex-row items-center gap-3">
                        <Image
                            src={
                                profile.images?.[0]?.url ||
                                "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
                            }
                            className="w-8 h-8 rounded-full"
                        />
                        <Text className="text-white font-bold text-2xl">{getGreeting()}</Text>
                    </View>
                    <AntDesign name="setting" size={24} color="white" />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="flex flex-row flex-wrap justify-between items-center mt-4" style={{ gap: 8 }}>
                        <RecentlyPlayed data={{ track: { name: "Liked songs", type: "Liked" } }} />
                        {recentlyPlayed.map((item, index) => (
                            <RecentlyPlayed key={index} data={item} />
                        ))}
                    </View>
                    <PlayList category_id="0JQ5DAqbMKFz6FAsUtgAab" />
                    <PlayList category_id="0JQ5DAudkNjCgYMM0TZXDw" />
                    <PlayList category_id="0JQ5DAqbMKFEC4WFtoNRpw" />
                    <PlayList category_id="0JQ5DAqbMKFGvOw3O4nLAf" />
                    <PlayList category_id="0JQ5DAqbMKFHOzuVTgTizF" />
                </ScrollView>
            </View>
        </LinearGradient>
    );
};

export default HomeScreen;
