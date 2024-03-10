
const fetchProfileNetworks = async (profileUserId: any) => {
    const networks = await fetch(`/api/home/profiles/${profileUserId}/networks`);
    return networks.json();
}

export default fetchProfileNetworks