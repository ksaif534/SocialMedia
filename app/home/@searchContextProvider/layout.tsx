import { useState } from "react"
import { SearchContext } from "../@navsidebar/root";

const SearchContextLayout = ( {children}: any ) => {
    const [srchPosts,setSrchPosts] = useState([]);
    const [srchKey,setSrchKey] = useState('');

    return (
        <SearchContext.Provider value={{ srchPosts,setSrchPosts, srchKey, setSrchKey }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextLayout