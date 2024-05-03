
const fetchLikesByPost = async (postId: any) => {
    const likes = await fetch(`api/home/likes/${postId}`);
    return likes.json();
}

export default fetchLikesByPost