
const fetchNewMsgNotificationsFromDB = async (userId: any) => {
    const newMsgNotif = await fetch(`api/home/notifications/messageNotifications/${userId}`);
    return newMsgNotif.json();
}

export default fetchNewMsgNotificationsFromDB