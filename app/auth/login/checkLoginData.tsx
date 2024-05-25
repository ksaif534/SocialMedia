import axios from 'axios'

const checkLoginData = async (loginFormData: any, users: any) => {
    const jsonData = {
        loginFormData: loginFormData,
        users: users
    };
    const response = await axios.post(`/api/home/auth/login`, jsonData , { headers: { 'Content-Type': 'application/json'} });
    return response;
}

export default checkLoginData