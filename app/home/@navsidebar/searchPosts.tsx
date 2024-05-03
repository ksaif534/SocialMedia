
const searchPosts = async (searchKey: any) => {
    const searchedPosts = await fetch(`api/home/search/posts/${searchKey}`);
    return searchedPosts.json();
}

export default searchPosts