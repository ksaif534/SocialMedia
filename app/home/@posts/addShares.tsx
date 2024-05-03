import axios from "axios"

const addShares = async (shareData: any) => {
    const addShare = await axios.post(`api/home/shares`,shareData, { headers: { 'Content-Type': 'application/json'}});
    return addShare;
}

export default addShares