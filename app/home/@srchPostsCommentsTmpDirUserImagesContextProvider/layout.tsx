'use client'
import { useState } from "react";
import { srchPostsCommentsTmpDirUserImagesContext } from "../@navsidebar/appbar";

const SrchPostsCommentsTmpDirUserImagesContextProviderLayout = ({ children }: any) => {
    const [srchPostsCommentsTmpDirUserImages,setSrchPostsCommentsTmpDirUserImages] = useState([]);
    
    return (
        <srchPostsCommentsTmpDirUserImagesContext.Provider value={{ srchPostsCommentsTmpDirUserImages, setSrchPostsCommentsTmpDirUserImages }}>
            { children }
        </srchPostsCommentsTmpDirUserImagesContext.Provider>
    )
}

export default SrchPostsCommentsTmpDirUserImagesContextProviderLayout