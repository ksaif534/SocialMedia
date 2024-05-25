const fetchPosts = async () => {
    const response = await fetch('/api/home/posts');
    const posts = response.json();
    return posts;
}

export default fetchPosts