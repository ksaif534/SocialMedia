import axios from "axios"

const leaveGroup = async (groupId: any, userId: any) => {
    const groupLeave = await axios.delete(`api/home/groupMembers/${groupId}/${userId}`);
    return groupLeave;
}

export default leaveGroup