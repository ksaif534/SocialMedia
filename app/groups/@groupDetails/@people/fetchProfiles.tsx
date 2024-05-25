
const fetchProfiles = async () => {
    const profiles = await fetch(`api/home/profiles`);
    return profiles.json();
}

export default fetchProfiles