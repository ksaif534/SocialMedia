
const fetchAcceptedProfileNetworks = async (profileUserId: any) => {
    const acceptedProfileNetworks = await fetch(`api/home/profiles/${profileUserId}/acceptedNetworks`);
    return acceptedProfileNetworks.json();
}

export default fetchAcceptedProfileNetworks