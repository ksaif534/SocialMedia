import axios from "axios"

const updateChatSettings = async (userId: any, isActive: boolean) => {
    const addOrUpdate = await axios.put(`api/home/chatSettings/${userId}`, { activeOrNot: isActive} ,{ headers: { 'Content-Type': 'application/json'}});
    return addOrUpdate;
}

export default updateChatSettings