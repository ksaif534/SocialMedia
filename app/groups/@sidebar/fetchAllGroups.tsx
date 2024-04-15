
const fetchAllGroups = async () => {
    const allGroups = await fetch(`api/home/groups`);
    return allGroups.json();
}

export default fetchAllGroups