
const fetchPendingRecipientUserNetworks = async (userId: any) => {
    const pendingRecipientUserNetworks = await fetch(`api/home/networks/${userId}`);
    return pendingRecipientUserNetworks.json();
}

export default fetchPendingRecipientUserNetworks