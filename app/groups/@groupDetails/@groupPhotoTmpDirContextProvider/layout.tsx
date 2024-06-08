import { useState } from "react"
import { GroupPhotoTmpDirContext } from "../root";

const GroupPhotoTmpDirContextProviderLayout = ({ children }: any) => {
    const [grpPhotoTmpDir,setGrpPhotoTmpDir] = useState('');
    return (
        <GroupPhotoTmpDirContext.Provider value={{ grpPhotoTmpDir, setGrpPhotoTmpDir }}>
            { children }
        </GroupPhotoTmpDirContext.Provider>
    )
}

export default GroupPhotoTmpDirContextProviderLayout