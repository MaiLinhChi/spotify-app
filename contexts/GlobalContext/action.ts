import { SET_LOADING, SET_PROFILE } from "./constants";

export const setLoading = (payload: any) => ({
    type: SET_LOADING,
    payload,
});

export const setProfile = (payload: any) => ({
    type: SET_PROFILE,
    payload,
});
