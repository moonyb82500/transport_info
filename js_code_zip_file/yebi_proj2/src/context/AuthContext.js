import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const initialAuthState = {
    isLoggedIn: false,
};


export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(initialAuthState.isLoggedIn);

    
    const login = () => setIsLoggedIn(true);

    
    const logout = () => setIsLoggedIn(false);

    // Con
    const contextValue = {
        isLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

