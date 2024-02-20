
const fetchComments = async () => {
    const response = await fetch(`/api/home/posts/comments`);
    const comments = response.json();
    return comments;
}

export default fetchComments