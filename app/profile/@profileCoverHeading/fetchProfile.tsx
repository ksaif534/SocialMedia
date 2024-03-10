
const fetchProfile = async (profileUserId: any) => {
    const response = await fetch(`/api/home/profiles/${profileUserId}`);
    const profile = response.json();
    return profile;
}

export default fetchProfile