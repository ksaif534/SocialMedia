
const fetchShares = async () => {
    const shares = await fetch(`api/home/shares`);
    return shares.json();
}

export default fetchShares