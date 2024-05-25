
const fetchGroupPosts = async () => {
    const groupPosts = await fetch(`api/home/groups/posts`);
    return groupPosts.json();
}

export default fetchGroupPosts