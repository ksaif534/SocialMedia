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

interface SearchGroupPostsTmpDirThumbnailsContextProps{
    srchGrpPostsTmpDirThumbnails: Array<any>,
    setSrchGrpPostsTmpDirThumbnails: (newSrchGrpPostsThumbnails: any) => void
}

export const SearchGroupPostsTmpDirThumbnailsContext = createContext<SearchGroupPostsTmpDirThumbnailsContextProps>({
    srchGrpPostsTmpDirThumbnails: [],
    setSrchGrpPostsTmpDirThumbnails: () => {}
})

interface SearchGroupPostsTmpDirFiguresContextProps{
    srchGrpPostsTmpDirFigures: Array<any>,
    setSrchGrpPostsTmpDirFigures: (newSrchGrpPostsTmpDirFigures: any) => void
}

export const SearchGroupPostsTmpDirFiguresContext = createContext<SearchGroupPostsTmpDirFiguresContextProps>({
    srchGrpPostsTmpDirFigures: [],
    setSrchGrpPostsTmpDirFigures: () => {}
})

interface SearchGroupPostsTmpDirUserImagesContextProps{
    srchGrpPostsTmpDirUserImages: Array<any>,
    setSrchGrpPostsTmpDirUserImages: (newSrchGrpPostsTmpDirUserImages: any) => void
}

export const SearchGroupPostsTmpDirUserImagesContext = createContext<SearchGroupPostsTmpDirUserImagesContextProps>({
    srchGrpPostsTmpDirUserImages: [],
    setSrchGrpPostsTmpDirUserImages: () => {}
})

interface SearchGroupPostsCommentsTmpDirUserImagesContextProps{
    srchGrpPostsCommentsTmpDirUserImages: Array<any>,
    setSrchGrpPostsCommentsTmpDirUserImages: (newSrchGrpPostsCommentsTmpDirUserImages: any) => void
}

export const SearchGroupPostsCommentsTmpDirUserImagesContext = createContext<SearchGroupPostsCommentsTmpDirUserImagesContextProps>({
    srchGrpPostsCommentsTmpDirUserImages: [],
    setSrchGrpPostsCommentsTmpDirUserImages: () => {}
})

const GroupNav = () => {
    return (
        <>
            <NavBar></NavBar>
        </>
    )
}

export default GroupNav