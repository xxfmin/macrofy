"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";


interface User {
    id: string;
    username: string;
}


interface AuthContextType {
    isAuthenticated: boolean;
    user: User; 
    login: (username: string, id: string) => Promise<void>;
    logout: () => void;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: {
        id: "", 
        username: "",
    },
    login: async () => {
        
    },
    logout: () => {
        
    },
});


// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User>({id: "", username: ""});

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = async (username: string, id: string) => {
        try {
            setIsAuthenticated(true);
            setUser({
                username: username,
                id: id
            });
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error("Login failed", error);
            throw error; // Optional: handle the error appropriately
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser({
            id: "", 
            username: "",
        });
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>

    )
}
