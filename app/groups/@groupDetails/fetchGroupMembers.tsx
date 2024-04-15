
const fetchGroupMembers = async () => {
    const groupMembers = await fetch(`api/home/groupMembers`);
    return groupMembers.json();
}

export default fetchGroupMembers