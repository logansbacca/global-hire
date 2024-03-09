import React, { useState,createContext } from "react";

export const authContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        "admin": null,
        "token": null,
        "id": null
    });
    const [isAuth, setAuth] = useState(false);

    const value = {
        user,
        setUser,
        isAuth,
        setAuth
    };

    return (
        <authContext.Provider value={value}>
            {children} 
        </authContext.Provider>
    );
};
