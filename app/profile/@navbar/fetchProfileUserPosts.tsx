
const fetchProfileUserPosts = async (userId: any,searchKey: any) => {
    const profileUserPosts = await fetch(`api/home/search/profileUserPosts/${userId}/${searchKey}`);
    return profileUserPosts.json();
}

export default fetchProfileUserPosts