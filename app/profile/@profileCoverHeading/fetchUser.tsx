
const fetchUser = async (userId: any) => {
    const response = await fetch(`/api/home/users/${userId}`);
    return response.json();
}

export default fetchUser
