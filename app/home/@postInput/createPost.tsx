import axios from 'axios'

const createPost = async (formData: any) => {
    const newPost = await axios.post('/api/home/posts', formData, { headers: { 'Content-Type': 'multipart/form-data'} } );
    return newPost;
}

export default createPost