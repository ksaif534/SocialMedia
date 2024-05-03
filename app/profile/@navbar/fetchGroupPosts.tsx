
const fetchGroupPosts = async (grpPostSrchKey: any) => {
    const groupPosts = await fetch(`api/home/search/groupPosts/${grpPostSrchKey}`);
    return groupPosts.json();
}

export default fetchGroupPosts