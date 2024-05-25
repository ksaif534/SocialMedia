import axios from "axios"

const updateShowContacts = async (userId: any, isShown: boolean) => {
    const updateSC = await axios.put(`api/home/chatSettings/${userId}/showContacts`, { showContact: isShown}, { headers: { 'Content-Type': 'application/json'}});
    return updateSC;
}

export default updateShowContacts