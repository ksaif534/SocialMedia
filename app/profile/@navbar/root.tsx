'use client'
import { useState } from "react";
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { BoxIconButton, MiddleBox, Search, SearchIconWrapper, StyledInputBase } from "./style";
import { menuId, mobileMenuId, msgMenuId, notifMenuId, RenderMenu, RenderMobileMenu, RenderMsgMenu, RenderNotifMenu } from "./menu";
import { AccountCircle } from '@mui/icons-material';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import GroupsIcon from '@mui/icons-material/Groups';

const RootComp = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorMsgEl,setAnchorMsgEl] = useState<null | HTMLElement>(null);
    const [anchorNotifMenuEl,setAnchorNotifMenuEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isMsgMenuOpen = Boolean(anchorMsgEl);
    const isNotifMenuOpen = Boolean(anchorNotifMenuEl);

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMsgMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorMsgEl(event.currentTarget);
    };

    const handleNotifMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorNotifMenuEl(event.currentTarget);
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ justifyContent: 'center' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <LogoDevIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
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
                        <MiddleBox>
                            <BoxIconButton size="large" aria-label="Home Icon" color="inherit" title="Home">
                            <HomeIcon fontSize="large" />
                            </BoxIconButton>
                            <BoxIconButton size="large" aria-label="Video Icon" color="inherit" title="Videos">
                            <VideoCameraBackIcon fontSize="large" />
                            </BoxIconButton>
                            <BoxIconButton size="large" aria-label="User Groups" color="inherit" title="User Groups">
                            <GroupsIcon fontSize="large" />
                            </BoxIconButton>
                        </MiddleBox>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" aria-controls={msgMenuId} color="inherit" onClick={handleMsgMenuOpen}>
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            aria-controls={notifMenuId}
                            color="inherit"
                            onClick={handleNotifMenuOpen}
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <RenderMobileMenu setAnchorEl={setAnchorEl} mobileMoreAnchorEl={mobileMoreAnchorEl} setMobileMoreAnchorEl={setMobileMoreAnchorEl} isMobileMenuOpen={isMobileMenuOpen} />
                <RenderMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} setMobileMoreAnchorEl={setMobileMoreAnchorEl} isMenuOpen={isMenuOpen} />
                <RenderMsgMenu anchorMsgEl={anchorMsgEl} setAnchorMsgEl={setAnchorMsgEl} isMsgMenuOpen={isMsgMenuOpen} />
                <RenderNotifMenu anchorNotifMenuEl={anchorNotifMenuEl} setAnchorNotifMenuEl={setAnchorNotifMenuEl} isNotifMenuOpen={isNotifMenuOpen} />
            </Box>
        </>
    )
}

export default RootComp