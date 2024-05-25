import { useState } from "react"
import { ProfileSearchContext } from '../@navbar/root'

const ProfileSearchContextLayout = ({children} : any) => {
    const [srchProfilePosts,setSrchProfilePosts] = useState([]);
    const [srchProfileKey,setSrchProfileKey] = useState('');

    return (
        <ProfileSearchContext.Provider value={{  srchProfilePosts, setSrchProfilePosts, srchProfileKey, setSrchProfileKey }}>
            { children }
        </ProfileSearchContext.Provider>    
    )
}

export default ProfileSearchContextLayout