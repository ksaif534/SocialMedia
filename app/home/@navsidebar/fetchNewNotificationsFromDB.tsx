
const fetchNewNotificationsFromDB = async (userId: any) => {
    const newNotifDB = await fetch(`api/home/notifications/${userId}`);
    return newNotifDB.json();
}

export default fetchNewNotificationsFromDB