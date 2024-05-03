import axios from "axios"

const addLikes = async (addData: any) => {
    const addLk = await axios.post(`api/home/likes`, addData ,{ headers: { 'Content-Type': 'application/json'}});
    return addLk;
}

export default addLikes