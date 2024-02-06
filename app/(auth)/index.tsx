import { Entypo } from "@expo/vector-icons";
import { useAuthRequest } from "expo-auth-session";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, View } from "react-native";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { clearAuth, getAuth, saveAuth } from "@/utils/functions";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const LoginScreen = () => {
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: "c16e16999953459fb3aba24d7d50a28d",
            clientSecret: "611859dc466e447fa7118767a85304d1",
            scopes: [
                "user-read-email",
                "playlist-modify-public",
                "user-read-private",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public",
            ],
            usePKCE: false,
            redirectUri: "exp://192.168.123.86:8081/--/spotify-auth-callback",
            // redirectUri: "exp://192.168.1.102:8081/--/spotify-auth-callback",
        },
        discovery,
    );

    const Login = async () => {
        if (response?.type === "success") {
            // Exchange authorization code for access token
            try {
                const tokenEndpointResponse = await fetch(discovery.tokenEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        code: response.params.code,
                        grant_type: "authorization_code",
                        redirect_uri: "exp://192.168.123.86:8081/--/spotify-auth-callback",
                        // redirect_uri: "exp://192.168.1.102:8081/--/spotify-auth-callback",
                        client_id: "c16e16999953459fb3aba24d7d50a28d",
                        client_secret: "611859dc466e447fa7118767a85304d1",
                        // Add any other necessary parameters
                    }).toString(),
                });

                const tokenData = await tokenEndpointResponse.json();
                const access_token = tokenData.access_token ? tokenData.access_token : "";
                const expires_in = tokenData.expires_in ? Date.now() + tokenData.expires_in * 1000 : "";
                await saveAuth({ access_token, expires_in });
                router.navigate("/home");
            } catch (error) {
                console.log("Login was failure with error " + error);
            }
        }
    };

    const checkUserLogin = async () => {
        const auth = await getAuth();
        const timeNow = Date.now();
        if (auth?.accessToken && auth.expiresIn > timeNow) {
            router.navigate("/home");
        } else {
            await clearAuth();
        }
    };

    React.useEffect(() => {
        checkUserLogin();
        Login();
    }, [response]);
    return (
        <LinearGradient className="h-full items-center justify-center" colors={["#000000", "#2D3436"]}>
            <View className="items-center mt-10">
                <Entypo name="spotify" size={60} color="white" />
                <Heading heading="Millions of songs." className="mt-3" />
                <Heading heading="Free on Spotify." />
            </View>

            <View className="mt-20 w-full px-5">
                <Button
                    title="Sign in with Spotify"
                    type="primary"
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}
                />
                <Button
                    title="Continue with Google"
                    icon={<Image style={{ width: 24, height: 24 }} source={require("@/assets/images/google.png")} />}
                    type="border"
                    disabled={true}
                />
                <Button
                    disabled={true}
                    title="Continue with Facebook"
                    icon={<Image style={{ width: 24, height: 24 }} source={require("@/assets/images/facebook.png")} />}
                    type="border"
                />
            </View>
        </LinearGradient>
    );
};

export default LoginScreen;
