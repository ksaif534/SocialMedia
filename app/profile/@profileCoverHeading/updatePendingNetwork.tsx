import axios from "axios"

const updatePendingNetwork = async (profileUserId: any, pendingNetwork: any) => {
    const networkToUpdate = await axios.put(`api/home/profiles/${profileUserId}/pendingNetworks/${pendingNetwork.id}`, pendingNetwork ,{ headers: { 'Content-Type': 'application/json' } });
    return networkToUpdate;
}

export default updatePendingNetwork