import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();


export const useAuth=()=>useContext(AuthContext);

export const AuthProvider =({children})=>{
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(null);


    useEffect(()=>{
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        if(savedToken && savedUser){
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
    },[]);

    const login =(userData,authToken)=>{
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user',JSON.stringify(userData));
        localStorage.setItem('token',authToken);
    }
    const logout =()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    const value ={
        user,
        token,
        isAuthenticated: !!user && !!token,
        login,
        logout,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}