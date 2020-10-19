import React from "react";

/**
 * Context de l'authentification.
 */
export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => {}
})