import axios from "axios"

const Update = async (formData: any,profileUserId: any) => {
    const updateProfile = await axios.put(`/api/home/profiles/${profileUserId}`,formData,{ headers: { 'Content-Type': 'multipart/form-data' }})
    return updateProfile;
}

export default Update