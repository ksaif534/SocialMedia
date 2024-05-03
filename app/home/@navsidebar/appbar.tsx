'use client'
import React, { useContext, useEffect, useState } from 'react'
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

export const AppBarComp = (props: any) => {
    const { setAnchorEl, setMsgAnchorEl, setNotifAnchorEl, open, setOpen, auth } = props;
    const { srchPosts,setSrchPosts, srchKey, setSrchKey } = useContext(SearchContext);
    const [newNotif,setNewNotif] = useState([]);
    const [newMsgNotif,setNewMsgNotif] = useState([]);

    useEffect(() => {
        fetchNewNotificationsFromDB(sessionStorage.getItem("authUserId")).then((notif: any) => setNewNotif(notif));
        fetchNewMsgNotificationsFromDB(sessionStorage.getItem("authUserId")).then((msgNotif: any) => setNewMsgNotif(msgNotif));
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
        const searchedPosts = await searchPosts(event.target.value);
        setSrchPosts(searchedPosts);
        setSrchKey(event.target.value);
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