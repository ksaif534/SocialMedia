import axios from "axios"

const sendMsgNotification = async (notifData: any) => {
    const newMsgNotif = await axios.post(`api/home/notifications/messageNotifications`,notifData, { headers: { 'Content-Type': 'application/json' }});
    return newMsgNotif;
}

export default sendMsgNotification