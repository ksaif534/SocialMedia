'use client'
import NavBar from "../../profile/@navbar/page";
import { createContext } from "react";

interface SearchGroupPostProps {
    srchGrpPosts: Array<any>,
    setSrchGrpPosts: (newSrchGrpPosts: any) => void,
    srchGrpPostKey: string,
    setSrchGrpPostKey: (newSrchGrpKey: any) => void
}

export const SearchGroupPostContext = createContext<SearchGroupPostProps>({
    srchGrpPosts: [],
    setSrchGrpPosts: () => {},
    srchGrpPostKey: '',
    setSrchGrpPostKey: () => {}
})

const GroupNav = () => {
    return (
        <>
            <NavBar></NavBar>
        </>
    )
}

export default GroupNav