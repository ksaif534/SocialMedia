import axios from "axios"

const unfriendProfile = async (profileUserId: any, profileNetworkUserIdTo: any) => {
    const unfriendProf = await axios.delete(`api/home/profiles/${profileUserId}/unfriendNetwork/${profileNetworkUserIdTo}`, { headers: { 'Content-Type': 'application/json' }})
    return unfriendProf
}

export default unfriendProfile