
const fetchUserMessages = async (user: any,targetUser: any) => {
    const userMessages = await fetch(`api/home/messages/${user}/${targetUser}`);
    return userMessages.json();
}

export default fetchUserMessages