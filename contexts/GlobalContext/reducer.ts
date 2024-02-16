import { SET_LOADING, SET_PROFILE } from "./constants";

import { IStateGlbalContext, Iaction } from "@/constants";

export const initialState = {
    loading: false,
    profile: {
        id: "",
        country: "",
        display_name: "",
        email: "",
        followers: {
            href: "",
            total: 0,
        },
        images: [],
    },
};

const globalReducer = (state: IStateGlbalContext, action: Iaction) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        default:
            return state;
    }
};

export default globalReducer;
