import { useState } from "react"
import { SearchProfFriendsTmpDirUserImagesContext } from "../@profileFriends/root"

const SearchProfFriendsTmpDirUserImagesContextProviderLayout = ({ children }: any) => {
    const [srchProfFriendsTmpDirUserImages,setSrchProfFriendsTmpDirUserImages] = useState([]);
    return (
        <SearchProfFriendsTmpDirUserImagesContext.Provider value={{ srchProfFriendsTmpDirUserImages, setSrchProfFriendsTmpDirUserImages }}>
            { children }
        </SearchProfFriendsTmpDirUserImagesContext.Provider>
    )
}

export default SearchProfFriendsTmpDirUserImagesContextProviderLayout