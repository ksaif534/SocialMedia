'use client'
import { useState } from "react";
import { srchPostsTmpDirUserImagesContext } from "../@navsidebar/appbar";

const SrchPostsTmpDirUserImagesContextProviderLayout = ({ children }: any) => {
    const [srchPostsTmpDirUserImages,setSrchPostsTmpDirUserImages] = useState([]);

    return (
        <srchPostsTmpDirUserImagesContext.Provider value={{ srchPostsTmpDirUserImages, setSrchPostsTmpDirUserImages }}>
            { children }
        </srchPostsTmpDirUserImagesContext.Provider>
    )
}

export default SrchPostsTmpDirUserImagesContextProviderLayout