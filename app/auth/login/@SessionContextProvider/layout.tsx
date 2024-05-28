'use client'
import { useState } from "react"
import { SessionDataContext } from "../@custom/root";

const SessionDataContextLayout = ({ children }: any) => {
    const [authUser,setAuthUser] = useState('');
    const [authUserId,setAuthUserId] = useState('');
    const [sessionToken,setSessionToken] = useState('');

    return (
        <SessionDataContext.Provider value={{ authUser, setAuthUser , authUserId, setAuthUserId , sessionToken, setSessionToken }}>
            { children }
        </SessionDataContext.Provider>
    )
}

export default SessionDataContextLayout