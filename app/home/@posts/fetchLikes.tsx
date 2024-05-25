
const fetchLikes = async () => {
    const likes = await fetch(`api/home/likes`);
    return likes.json();
}

export default fetchLikes