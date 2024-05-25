
const searchGroup = async (srchGrpKey: any) => {
    const srchGrp = await fetch(`api/home/search/groups/${srchGrpKey}`);
    return srchGrp.json();
}

export default searchGroup;