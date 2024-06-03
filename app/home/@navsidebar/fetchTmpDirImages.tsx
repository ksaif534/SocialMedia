
const fetchTmpDirImages = async (fileName: any) => {
    const tmpDirImages = await fetch(`api/tmpDirImages/${fileName}`);
    return tmpDirImages;
}

export default fetchTmpDirImages