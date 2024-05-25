
const fetchPendingNetworks = async (profileUserId: any) => {
    const pendingNetworks = await fetch(`api/home/profiles/${profileUserId}/pendingNetworks`);
    return pendingNetworks.json();
}

export default fetchPendingNetworks