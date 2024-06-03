'use client'
import { Avatar, Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from "next/navigation";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from "react";
import fetchUser from "../@profileCoverHeading/fetchUser";
import Cookies from "js-cookie";

export const menuId = 'primary-search-account-menu';
export const RenderMenu = (props: any) => {
    const router = useRouter();
    const authUserId = Cookies.get("authUserId");
    const { anchorEl, setAnchorEl, setMobileMoreAnchorEl , isMenuOpen } = props;
    const [currentUser,setCurrentUser] = useState({ id: 0, email: '', password: '', image: null, is_active: 0, name: '', phone: 0 })

    useEffect(() => {
        fetchUser(authUserId).then((currentUser: any) => setCurrentUser(currentUser));
    },[])

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMyProfile = () => {
        router.push(`/profile`);
        handleMenuClose();
    }

    const handleLogout = () => {
        Cookies.set("authUserId","");
        Cookies.set("authUser","");
        Cookies.set("sessionToken","");
        router.push(`/auth/login`);
    }

    const renderMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMyProfile}>
                <IconButton
                size="small"
                aria-label="logout from current user"
                aria-haspopup="true"
                color="inherit"
                >
                    <Avatar src={`images/${currentUser?.image}`} />
                    My Profile
                </IconButton>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <IconButton
                size="small"
                aria-label="logout from current user"
                aria-controls="logout-menu"
                aria-haspopup="true"
                color="inherit"
                >
                    <LogoutIcon />
                    Logout
                </IconButton>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            {renderMenu}
        </>
    )
}

export const mobileMenuId = 'primary-search-account-menu-mobile';
export const RenderMobileMenu = (props: any) => {
    const { setAnchorEl, mobileMoreAnchorEl, setMobileMoreAnchorEl, isMobileMenuOpen } = props;

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            {renderMobileMenu}
        </>
    )
}

export const msgMenuId = 'message-notifications-menu';
export const RenderMsgMenu = (props: any) => {
    const { anchorMsgEl, setAnchorMsgEl, isMsgMenuOpen } = props;

    const handleMsgMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorMsgEl(null);
    }

    const renderMsgMenu = (
        <Menu
          anchorEl={anchorMsgEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
          id={msgMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right'}}
          open={isMsgMenuOpen}
          onClose={handleMsgMenuClose}
        >
            <MenuItem onClick={handleMsgMenuClose}>Message 1</MenuItem>
            <MenuItem onClick={handleMsgMenuClose}>Message 2</MenuItem>
        </Menu>
    );

    return (
        <>
            {renderMsgMenu}
        </>
    )
}

export const notifMenuId = 'event-notifications-menu';
export const RenderNotifMenu = (props: any) => {
    const { anchorNotifMenuEl, setAnchorNotifMenuEl, isNotifMenuOpen } = props;

    const handleNotifMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorNotifMenuEl(null);
    }

    const renderNotifMenu = (
        <Menu
          anchorEl={anchorNotifMenuEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
          id={notifMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right'}}
          open={isNotifMenuOpen}
          onClose={handleNotifMenuClose}
        >
            <MenuItem onClick={handleNotifMenuClose}>Notification 1</MenuItem>
            <MenuItem onClick={handleNotifMenuClose}>Notification 2</MenuItem>
        </Menu>
    );

    return (
        <>
            {renderNotifMenu}
        </>
    )
}



