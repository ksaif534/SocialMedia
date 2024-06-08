import { useState } from "react"
import { SearchGroupPostsTmpDirUserImagesContext } from "../@navbar/page"

const SearchGroupPostsTmpDirUserImagesContextProviderLayout = ({ children }: any) => {
    const [srchGrpPostsTmpDirUserImages,setSrchGrpPostsTmpDirUserImages] = useState([]);
    return (
        <SearchGroupPostsTmpDirUserImagesContext.Provider value={{srchGrpPostsTmpDirUserImages, setSrchGrpPostsTmpDirUserImages }}>
            { children }
        </SearchGroupPostsTmpDirUserImagesContext.Provider>
    )
}

export default SearchGroupPostsTmpDirUserImagesContextProviderLayout