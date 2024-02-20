'use client'
import React from 'react'
import { Badge, Box, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import LogoDevIcon from '@mui/icons-material/LogoDev'
import { AccountCircle } from '@mui/icons-material'
import { menuId, msgMenuId, notifMenuId } from './menu'
import { AppBar, Search, SearchIconWrapper, StyledInputBase } from './style'

export const AppBarComp = (props: any) => {
    const { setAnchorEl, setMsgAnchorEl, setNotifAnchorEl, open, setOpen, auth } = props;

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
                    />
                </Search>
            {
                auth && (
                <>
                    <div>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" aria-controls={msgMenuId} aria-haspopup="true" color="inherit" onClick={handleMsgIconClick}>
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="large" aria-label="show 17 new notifications" aria-controls={notifMenuId} aria-haspopup="true" color="inherit" onClick={handleNotifOnClick}>
                                <Badge badgeContent={17} color="error">
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