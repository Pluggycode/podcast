"use client"
 
import  React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../configs/firebaseConfig"
import { AuthContext } from "./_context/AuthContext"
import { useState,useEffect } from "react";
import { api } from "../convex/_generated/api"
import { useMutation } from "convex/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

function Provider({children}) {
    const [user,setUser] = useState();
    const CreateUser = useMutation(api.users.CreateNewUser);

    useEffect(()=>{
        const unSubcribe = onAuthStateChanged(auth,async (user) =>{
            console.log(user);
            if(user)
            {
            const  result = await CreateUser({
                name:user?.displayName,
                email:user?.email,
                userImageUrl:user.photoURL

            })
            console.log(result);
            setUser(result);
        }
        })
        return () => unSubcribe();
    },[])
  return (
    <div>
        <AuthContext.Provider value={{user,setUser}}>
        <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}}>
        <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >{children}</NextThemesProvider>
        </PayPalScriptProvider>
        </AuthContext.Provider>
        </div>
  )
}

export const userAuthContext = () => {
    const context = React.useContext(AuthContext);
    return context;
}

export default Provider