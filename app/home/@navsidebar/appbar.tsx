'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Badge, Box, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import LogoDevIcon from '@mui/icons-material/LogoDev'
import { AccountCircle } from '@mui/icons-material'
import { menuId, msgMenuId, notifMenuId } from './menu'
import { AppBar, Search, SearchIconWrapper, StyledInputBase } from './style'
import fetchNewNotificationsFromDB from './fetchNewNotificationsFromDB'
import fetchNewMsgNotificationsFromDB from './fetchNewMsgNotificationsFromDB'
import searchPosts from './searchPosts'
import { SearchContext } from './root'
import Cookies from 'js-cookie'
import fetchTmpDirImages from './fetchTmpDirImages'
import path from 'path'

interface srchPostsTmpDirUserImagesContextProps{
    srchPostsTmpDirUserImages: any,
    setSrchPostsTmpDirUserImages: (newSrchPostTmpDirUserImages: any) => void
}

export const srchPostsTmpDirUserImagesContext = createContext<srchPostsTmpDirUserImagesContextProps>({
    srchPostsTmpDirUserImages: [],
    setSrchPostsTmpDirUserImages: () => {}
})

interface srchPostsTmpDirFiguresContextProps{
    srchPostsTmpDirFigures: any,
    setSrchPostsTmpDirFigures: (newSrchPostTmpDirFigures: any) => void
}

export const srchPostsTmpDirFiguresContext = createContext<srchPostsTmpDirFiguresContextProps>({
    srchPostsTmpDirFigures: [],
    setSrchPostsTmpDirFigures: () => {}
})

interface srchPostsCommentsTmpDirUserImagesContextProps{
    srchPostsCommentsTmpDirUserImages: any,
    setSrchPostsCommentsTmpDirUserImages: (newSrchPostsCommentsTmpDirUserImages: any) => void
}

export const srchPostsCommentsTmpDirUserImagesContext = createContext<srchPostsCommentsTmpDirUserImagesContextProps>({
    srchPostsCommentsTmpDirUserImages: [],
    setSrchPostsCommentsTmpDirUserImages: () => {}
})

export const AppBarComp = (props: any) => {
    const { setAnchorEl, setMsgAnchorEl, setNotifAnchorEl, open, setOpen, auth } = props;
    const { srchPosts,setSrchPosts, srchKey, setSrchKey } = useContext(SearchContext);
    const { srchPostsTmpDirUserImages, setSrchPostsTmpDirUserImages } = useContext(srchPostsTmpDirUserImagesContext);
    const { srchPostsCommentsTmpDirUserImages, setSrchPostsCommentsTmpDirUserImages } = useContext(srchPostsCommentsTmpDirUserImagesContext);
    const { srchPostsTmpDirFigures, setSrchPostsTmpDirFigures } = useContext(srchPostsTmpDirFiguresContext);
    const authUserId = Cookies.get("authUserId");
    const srchPostsTmpDirUserImagesArr: any = [...srchPostsTmpDirUserImages];
    const srchPostsTmpDirFiguresArr: any = [...srchPostsTmpDirFigures];
    const [newNotif,setNewNotif] = useState([]);
    const [newMsgNotif,setNewMsgNotif] = useState([]);

    useEffect(() => {
        fetchNewNotificationsFromDB(authUserId).then((notif: any) => setNewNotif(notif));
        fetchNewMsgNotificationsFromDB(authUserId).then((msgNotif: any) => setNewMsgNotif(msgNotif));
    },[])

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMsgIconClick = (event: React.MouseEvent<HTMLElement>) => {
        setMsgAnchorEl(event.currentTarget);
    }
    
    const handleNotifOnClick = (event: React.MouseEvent<HTMLElement>) => {
        setNotifAnchorEl(event.currentTarget);
    }

    const searchResults = async (event: any) => {
        setSrchKey(event.target.value);
        if (event.target.value !== '') {
            const searchedPosts = await searchPosts(event.target.value);
            setSrchPosts(searchedPosts);
            searchedPosts.map((srchPost: any) => {
                fetchTmpDirImages(srchPost?.user?.image).then(async (imageBuffer: any) => {
                    const buffer = await imageBuffer.arrayBuffer();
                    const blob1 = new Blob([buffer], { type: `${path.extname(srchPost?.user?.image).substring(1)}` });
                    srchPostsTmpDirUserImagesArr.push(URL.createObjectURL(blob1));
                });
                fetchTmpDirImages(srchPost?.figure).then(async (imageBuffer: any) => {
                    const buffer = await imageBuffer.arrayBuffer();
                    const blob1 = new Blob([buffer], { type: `${path.extname(srchPost?.figure).substring(1)}` });
                    srchPostsTmpDirFiguresArr.push(URL.createObjectURL(blob1));
                })
            });
            const tempCommentUserImages: any = [];
            for(const searchPost of searchedPosts){
                const postImageUrls: any = [];
                for(const searchComment of searchPost.comments){
                    fetchTmpDirImages(searchComment?.user?.image).then(async (imageBuffer: any) => {
                        const buffer = await imageBuffer.arrayBuffer();
                        const blob = new Blob([buffer], { type: `${path.extname(searchComment?.user?.image).substring(1)}` });
                        postImageUrls.push({
                            comment: searchComment,
                            blobUrl: URL.createObjectURL(blob)
                        });
                    });
                }
                tempCommentUserImages.push({
                    postId: searchPost?.id,
                    commentUserImages: postImageUrls
                });
            }
            setSrchPostsTmpDirUserImages(srchPostsTmpDirUserImagesArr);   
            setSrchPostsTmpDirFigures(srchPostsTmpDirFiguresArr);
            setSrchPostsCommentsTmpDirUserImages(tempCommentUserImages);
        }
    }
    
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                    }}
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <LogoDevIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    SkSocial
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    name="search"
                    onChange={searchResults}
                    />
                </Search>
            {
                auth && (
                <>
                    <div>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label={`show ${newMsgNotif?.length} new mails`} aria-controls={msgMenuId} aria-haspopup="true" color="inherit" onClick={handleMsgIconClick}>
                                <Badge badgeContent={Number(newMsgNotif?.length)} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="large" aria-label={`show ${newNotif?.length} new notifications`} aria-controls={notifMenuId} aria-haspopup="true" color="inherit" onClick={handleNotifOnClick}>
                                <Badge badgeContent={Number(newNotif?.length)} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    </div>
                </>
                )
            }
            </Toolbar>
        </AppBar>
    )
}

export default AppBarComp