
const fetchProfileNetworks = async (profileUserId: any) => {
    const profileNetworks = await fetch(`api/home/profiles/${profileUserId}/networks`);
    return profileNetworks.json();
}

export default fetchProfileNetworks