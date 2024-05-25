import axios from "axios"

const postNetworkStatus = async (profileUserId: any, otherProfileUserId: any) => {
    const networkStatus = await axios.post(`api/home/profiles/${profileUserId}/networks/${otherProfileUserId}`,{ headers: { 'Content-Type': 'application/json' } });
    return networkStatus; 
}

export default postNetworkStatus