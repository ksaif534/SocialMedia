import axios from 'axios';

const updateComment = async (editFormData: any,comment: any) => {
    const editCommentBool = await axios.put(`/api/home/posts/comments/${comment.id}`,editFormData, { headers: { 'Content-Type': 'application/json' } });
    return editCommentBool;
}

export default updateComment