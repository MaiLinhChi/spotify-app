import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthResponse } from "@/constants";
import { ACCESS_TOKEN_KEY, EXPIRES_IN_KEY, REFRESH_TOKEN_KEY } from "@/constants/key";

export const saveAuth = async ({ access_token, expires_in }: AuthResponse) => {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(access_token));
        await AsyncStorage.setItem(EXPIRES_IN_KEY, JSON.stringify(expires_in));
    } catch (error) {
        console.error("Error saving tokens:", error);
    }
};

export const getAuth = async () => {
    try {
        const access_token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
        const expires_in = await AsyncStorage.getItem(EXPIRES_IN_KEY);
        const accessToken = access_token ? JSON.parse(access_token) : "";
        const expiresIn = expires_in ? JSON.parse(expires_in) : "";
        return { accessToken, expiresIn };
    } catch (error) {
        console.error("Error get tokens:", error);
    }
};

export const clearAuth = async () => {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
        await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
        await AsyncStorage.removeItem(EXPIRES_IN_KEY);
    } catch (error) {
        console.error("Error clearing tokens:", error);
    }
};
