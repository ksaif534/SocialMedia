
const searchGroupModerators = async (groupUserId: number, searchKey: string) => {
    const srchGrpMembers = await fetch(`api/home/groupModerators/groups/${groupUserId}/search/${searchKey}`);
    return srchGrpMembers.json();
}

export default searchGroupModerators