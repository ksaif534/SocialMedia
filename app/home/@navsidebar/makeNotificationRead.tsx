import axios from "axios"

const makeNotificationRead = async (userId: any, notif: any) => {
    const notifRead = await axios.put(`api/home/notifications/${userId}`, notif , {headers: {'Content-Type': 'application/json'}});
    return notifRead;
}

export default makeNotificationRead