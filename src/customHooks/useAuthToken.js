import { useState } from "react";

export const useAuthToken = () => {
    const getToken = () => {
        return localStorage.getItem("token") || null;
    };

    const [token, setTokenState] = useState(getToken());

    const setToken = (newToken) => {
        localStorage.setItem("token", newToken);
        setTokenState(newToken);
    };

    const removeToken = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setTokenState(null);
    };

    return { token, setToken, getToken, removeToken };
};
