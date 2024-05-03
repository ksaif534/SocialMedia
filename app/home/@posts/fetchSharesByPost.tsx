
const fetchSharesByPost = async (postId: any) => {
    const sharesByPost = await fetch(`api/home/shares/${postId}`);
    return sharesByPost.json();
}

export default fetchSharesByPost