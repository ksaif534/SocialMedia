import { useState } from "react"
import { SearchGroupContext } from "../@sidebar/root";

const GroupSearchContextLayout = ({ children } : any) => {
    const [srchGrp,setSrchGrp] = useState([]);
    const [srchGrpKey,setSrchGrpKey] = useState('');

    return (
        <SearchGroupContext.Provider value={{ srchGrp, setSrchGrp, srchGrpKey, setSrchGrpKey }}>
            { children }
        </SearchGroupContext.Provider>
    )
}

export default GroupSearchContextLayout