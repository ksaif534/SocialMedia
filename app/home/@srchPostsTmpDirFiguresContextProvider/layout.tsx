'use client'
import { useState } from "react";
import { srchPostsTmpDirFiguresContext } from "../@navsidebar/appbar";

const SrchPostsTmpDirFiguresContextProviderLayout = ({ children }: any) => {
    const [srchPostsTmpDirFigures,setSrchPostsTmpDirFigures] = useState([]);
    
    return (
        <srchPostsTmpDirFiguresContext.Provider value={{ srchPostsTmpDirFigures,setSrchPostsTmpDirFigures }}>
            { children }
        </srchPostsTmpDirFiguresContext.Provider>
    )
}

export default SrchPostsTmpDirFiguresContextProviderLayout