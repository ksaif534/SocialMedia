'use client'
import { useState } from "react"
import { GroupUserImageContext } from "../root";

const GroupUserImageContextProviderLayout = ({ children }: any) => {
    const [grpUserImage,setGrpUserImage] = useState('');
    return (
        <GroupUserImageContext.Provider value={{ grpUserImage,setGrpUserImage }}>
            { children }
        </GroupUserImageContext.Provider>
    )
}

export default GroupUserImageContextProviderLayout