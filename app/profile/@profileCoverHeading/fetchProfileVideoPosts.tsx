
const fetchProfileVideoPosts = async (profileUserId: any) => {
    const profileVideoPosts = await fetch(`/api/home/profiles/${profileUserId}/videoPosts`);
    return profileVideoPosts.json();
}

export default fetchProfileVideoPosts