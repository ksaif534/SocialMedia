import axios from "axios";

const createComment = async (formData: any) => {
    const newComment  = axios.post(`/api/home/posts/comments`,formData,{ headers: { 'Content-Type': 'application/json'}});
    return newComment;
}

export default createComment