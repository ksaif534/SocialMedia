
const fetchSpecificGroupModerators = async (groupId: any) => {
    const specificGroupMods = await fetch(`api/home/groupModerators/${groupId}`);
    return specificGroupMods.json();
}

export default fetchSpecificGroupModerators