
const fetchProfilePosts = async (profileUserId: any) => {
    const profilePosts = await fetch(`api/home/profiles/${profileUserId}/posts`);
    return profilePosts.json();
}

export default fetchProfilePosts