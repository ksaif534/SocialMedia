import axios from "axios"

const sendMessage = async (msgData: any) => {
    const msg = await axios.post(`api/home/messages`, msgData, { headers: { 'Content-Type': 'application/json' } });
    const returnData = {
        configData: JSON.parse(msg.config.data),
        newMsg: msg.data.newMsg
    }
    return returnData;
}

export default sendMessage