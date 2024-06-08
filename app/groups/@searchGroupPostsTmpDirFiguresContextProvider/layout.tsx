import { useState } from "react"
import { SearchGroupPostsTmpDirFiguresContext } from "../@navbar/page";

const SearchGroupPostsTmpDirFiguresContextProviderLayout = ({ children }: any) => {
    const [srchGrpPostsTmpDirFigures,setSrchGrpPostsTmpDirFigures] = useState([]);
    return (
        <SearchGroupPostsTmpDirFiguresContext.Provider value={{ srchGrpPostsTmpDirFigures, setSrchGrpPostsTmpDirFigures }}>
            { children }
        </SearchGroupPostsTmpDirFiguresContext.Provider>
    )
}

export default SearchGroupPostsTmpDirFiguresContextProviderLayout