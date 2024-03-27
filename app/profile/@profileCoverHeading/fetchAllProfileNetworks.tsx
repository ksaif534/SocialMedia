
const fetchAllProfileNetworks = async (profileUserId: any) => {
    const acceptedNetworks = await fetch(`api/home/profiles/${profileUserId}/allNetworks`);
    return acceptedNetworks.json();
}

export default fetchAllProfileNetworks