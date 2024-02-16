import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";

import PlayList from "@/components/PlayList";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import { IprofileResponse } from "@/constants";
import { ACCESS_TOKEN_KEY } from "@/constants/key";
import { GlobalContext } from "@/contexts/GlobalContext/GlobalContext";
import { setLoading, setProfile } from "@/contexts/GlobalContext/action";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    const [profileState, setProfileState] = useState<IprofileResponse>({
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
    const { dispatch } = useContext(GlobalContext);

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
            setProfileState(profileResponse);
            dispatch(setProfile(profileResponse));
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

    const start = async () => {
        await getProfile();
        dispatch(setLoading(false));
    };

    useEffect(() => {
        start();
    }, []);
    return (
        <SafeAreaView edges={["top", "bottom"]}>
            <View className="px-3 pb-24">
                <View className="flex-row justify-between items-center pb-3">
                    <View className="flex-row items-center gap-3">
                        <Image
                            src={
                                profileState.images?.[0]?.url ||
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
                        <RecentlyPlayed />
                    </View>
                    <PlayList category_id="0JQ5DAqbMKFz6FAsUtgAab" />
                    <PlayList category_id="0JQ5DAudkNjCgYMM0TZXDw" />
                    <PlayList category_id="0JQ5DAqbMKFEC4WFtoNRpw" />
                    <PlayList category_id="0JQ5DAqbMKFGvOw3O4nLAf" />
                    <PlayList category_id="0JQ5DAqbMKFHOzuVTgTizF" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
