import axios from "axios"

const updatePost = async (formData: any, post: any) => {
    const postToUpdateBool = await axios.put(`/api/home/posts/${post.id}`,formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return postToUpdateBool;
}

export default updatePost