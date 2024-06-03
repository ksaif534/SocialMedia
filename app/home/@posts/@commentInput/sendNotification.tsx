import axios from "axios"

const sendNotification = async (authUser: any,post: any) => {
    const dataObj = {
        authUser: authUser,
        post: post
    }
    const sendNotif = await axios.post(`api/home/pusher/beams`,dataObj,{ headers: { 'Content-Type': 'application/json'}});
    return JSON.parse(sendNotif.config.data);
}

export default sendNotification