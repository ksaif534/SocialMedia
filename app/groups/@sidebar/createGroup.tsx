import axios from "axios"

const createGroup = async (formData: any,authUserId: any) => {
    const createGroupRecord = await axios.post(`api/home/groups`,formData, { headers: { 'Content-Type': 'application/form-data' }});
    return createGroupRecord;
}

export default createGroup