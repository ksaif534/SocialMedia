import { useState } from "react";
import { SearchGroupPostContext } from "../@navbar/page";

const GroupPostSearchContextLayout = ({children} : any) => {
    const [srchGrpPosts,setSrchGrpPosts] = useState([]);
    const [srchGrpPostKey,setSrchGrpPostKey] = useState('');

    return (
        <SearchGroupPostContext.Provider value={{ srchGrpPosts, setSrchGrpPosts, srchGrpPostKey, setSrchGrpPostKey }}>
            {children}
        </SearchGroupPostContext.Provider>
    )
}

export default GroupPostSearchContextLayout