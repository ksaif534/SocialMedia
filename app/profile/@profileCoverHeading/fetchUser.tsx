
const fetchUser = async (userId: any) => {
    const response = await fetch(`/api/home/users/${userId}`);
    const getUser = response.json();
    return getUser;
}

export default fetchUser
