import  { createContext, useState } from "react"

export let UserContext = createContext();

export default function UserContextProvider(probs){
   
    const [userToken, setuserToken] = useState(null);
    return (
        <UserContext.Provider value = {{userToken, setuserToken}}>
            {probs.children}

        </UserContext.Provider>
    )

}