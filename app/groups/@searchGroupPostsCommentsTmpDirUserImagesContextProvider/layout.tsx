import { useState } from "react";
import { SearchGroupPostsCommentsTmpDirUserImagesContext } from "../@navbar/page";

const SearchGroupPostsCommentsTmpDirUserImagesContextProviderLayout = ({ children }: any) => {
    const [srchGrpPostsCommentsTmpDirUserImages,setSrchGrpPostsCommentsTmpDirUserImages] = useState([]);
    return (
        <SearchGroupPostsCommentsTmpDirUserImagesContext.Provider value={{ srchGrpPostsCommentsTmpDirUserImages, setSrchGrpPostsCommentsTmpDirUserImages }}>
            { children }
        </SearchGroupPostsCommentsTmpDirUserImagesContext.Provider>
    )
}

export default SearchGroupPostsCommentsTmpDirUserImagesContextProviderLayout