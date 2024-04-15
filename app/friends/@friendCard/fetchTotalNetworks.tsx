
const fetchTotalNetworks = async () => {
    const totalNetworks = await fetch(`api/home/networks`);
    return totalNetworks.json();
}

export default fetchTotalNetworks