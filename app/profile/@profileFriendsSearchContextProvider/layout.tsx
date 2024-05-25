import { useState } from "react"
import { ProfileFriendsSearchContext } from "../@profileFriends/root"

const ProfileFriendsSearchContextLayout = ({ children }: any) => {
    const [srchProfFriends,setSrchProfFriends] = useState([])
    const [srchProfFriendsKey,setSrchProfFriendsKey] = useState('')

    return (
        <ProfileFriendsSearchContext.Provider value={{ srchProfFriends, setSrchProfFriends, srchProfFriendsKey, setSrchProfFriendsKey }}>
            { children }
        </ProfileFriendsSearchContext.Provider>
    )
}

export default ProfileFriendsSearchContextLayout