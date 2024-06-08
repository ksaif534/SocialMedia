'use client'
import { useState } from "react";
import { SearchGroupPostsTmpDirThumbnailsContext } from "../@navbar/page";

const SearchGroupPostsTmpDirThumbnailsContextProviderLayout = ({ children }: any) => {
    const [srchGrpPostsTmpDirThumbnails,setSrchGrpPostsTmpDirThumbnails] = useState([]);

    return (
        <SearchGroupPostsTmpDirThumbnailsContext.Provider value={{ srchGrpPostsTmpDirThumbnails, setSrchGrpPostsTmpDirThumbnails }}>
            { children }
        </SearchGroupPostsTmpDirThumbnailsContext.Provider>
    )
}

export default SearchGroupPostsTmpDirThumbnailsContextProviderLayout