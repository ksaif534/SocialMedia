const fetchUsers = async () => {
    const response = await fetch(`/api/home/users`);
    const users = response.json();
    return users;
}

export default fetchUsers