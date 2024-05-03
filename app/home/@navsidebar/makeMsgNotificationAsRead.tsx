import axios from "axios"

const makeMsgNotificationAsRead = async (userId: any, msgNotif: any) => {
    const msgNotifRead = await axios.put(`api/home/notifications/messageNotifications/${userId}`, msgNotif , { headers: { 'Content-Type': 'application/json'}});
    return msgNotifRead;
}

export default makeMsgNotificationAsRead