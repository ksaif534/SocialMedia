import axios from 'axios';

const createUser = async (formData: any) => {
    const newUser = await axios.post(`/api/home/auth/registration`,formData, {headers: {'Content-Type': 'multipart/form-data'}});
    return newUser;
}

export default createUser