import { createContext } from "react";

import { IGlobalContext } from "@/constants";

export const GlobalContext = createContext<IGlobalContext>({
    state: {
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
    },
    dispatch: () => {},
});
