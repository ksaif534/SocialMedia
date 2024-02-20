import axios from "axios"

const deletePost = async (post: any) => {
    const deletePostBool = await axios.delete(`/api/home/posts/${post.id}`,post);
    return deletePostBool;
}

export default deletePost