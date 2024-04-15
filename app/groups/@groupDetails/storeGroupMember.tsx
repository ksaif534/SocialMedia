import axios from "axios"

const storeGroupMember = async (formData: any) => {
    const groupMember = await axios.post(`api/home/groupMembers`,formData, { headers: { 'Content-Type': 'application/json' } });
    return groupMember;
}

export default storeGroupMember