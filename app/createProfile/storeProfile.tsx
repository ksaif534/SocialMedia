import axios from "axios"

const storeProfile = async (profileFormData: any) => {
    const storeProfile = axios.post(`api/home/profiles/create`,profileFormData, { headers: { 'Content-Type': 'multipart/form-data' }});
    return storeProfile;
}

export default storeProfile