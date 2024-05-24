import { useState } from "react"
import { SearchGroupModeratorsContext } from '../@groupDetails/@people/root'

const GroupModeratorSearchContextLayout = ({ children } : any) => {
    const [srchGrpModerators,setSrchGrpModerators] = useState([])
    const [srchGrpModeratorKey,setSrchGrpModeratorKey] = useState('')

    return (
        <SearchGroupModeratorsContext.Provider value={{ srchGrpModerators, setSrchGrpModerators, srchGrpModeratorKey, setSrchGrpModeratorKey }}>
            { children }
        </SearchGroupModeratorsContext.Provider>
    )
}

export default GroupModeratorSearchContextLayout