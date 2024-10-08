import { createContext, useEffect, useState } from "react";
import conf from "../conf";
import axios from "axios";

export const AuthContext =createContext();

export const AuthContextProvider =({children})=>{
    const [currentUser, setCurrentUser]=useState(JSON.parse(localStorage.getItem("user"))||null);
    
    const login =async(inputs)=>{
        const res=await axios.post(conf.apiUrl+"/auth/login",inputs,{
            withCredentials:true,
        });
        setCurrentUser(res.data);
    }

    const logout=async ()=>{
        await axios.post(conf.apiUrl+"/auth/logout",{},{
            withCredentials:true,
        });
        setCurrentUser(null);
        localStorage.removeItem("user");
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])
    


    return(
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}