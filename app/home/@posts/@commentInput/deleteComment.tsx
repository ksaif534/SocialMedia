import axios from "axios"

const deleteComment = async (comment: any) => {
    const deleteCommentBool = await axios.delete(`/api/home/posts/comments/${comment.id}`,comment);
    return deleteCommentBool;
}

export default deleteComment