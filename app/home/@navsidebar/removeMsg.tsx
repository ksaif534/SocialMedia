import axios from "axios"

const removeMsg = async (msg: any) => {
    const removeMessage = await axios.delete(`api/home/messages/removeMessage/${msg.id}`, { headers: { 'Content-Type': 'application/json'}});
    return removeMessage;
}

export default removeMsg