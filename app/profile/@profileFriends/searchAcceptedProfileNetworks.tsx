
const searchAcceptedProfileNetworks = async (profileUserId: any, searchKey: string) => {
    const srchAcceptedProfNet = await fetch(`api/home/profiles/${profileUserId}/searchAcceptedProfiles/${searchKey}`)
    return srchAcceptedProfNet.json()
}

export default searchAcceptedProfileNetworks