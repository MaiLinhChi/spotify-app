import { SetStateAction, createContext, Dispatch } from "react";

interface IMenuContext {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}
export const GlobalContext = createContext<IMenuContext>({
    loading: false,
    setLoading: () => {},
});
