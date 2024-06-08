import { useState } from "react";
import { SearchGroupModTmpDirUserImagesContext } from "../root";

const SearchGroupModTmpDirUserImagesProviderLayout = ({ children }: any) => {
    const [srchGrpModTmpDirUserImages,setSrchGrpModTmpDirUserImages] = useState([]);
    return (
        <SearchGroupModTmpDirUserImagesContext.Provider value={{ srchGrpModTmpDirUserImages, setSrchGrpModTmpDirUserImages }}>
            { children }
        </SearchGroupModTmpDirUserImagesContext.Provider>
    )
}

export default SearchGroupModTmpDirUserImagesProviderLayout