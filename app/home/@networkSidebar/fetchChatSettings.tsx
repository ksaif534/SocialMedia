
const fetchChatSettings = async (userId: any) => {
    const chatSettings = await fetch(`api/home/chatSettings/${userId}`);
    return chatSettings.json();
}

export default fetchChatSettings