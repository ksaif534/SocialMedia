
const fetchOtherProfiles = async (profileUserId: any) => {
    const otherProfiles = await fetch(`api/home/profiles/otherProfiles/${profileUserId}`);
    return otherProfiles.json();
}

export default fetchOtherProfiles