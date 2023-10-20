'use client'
import { useState } from 'react'
import { IconButton, Menu, MenuItem, Badge } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'

export const menuId = 'primary-search-account-menu';
export const mobileMenuId = 'primary-search-account-menu-mobile';
export const msgMenuId = 'msg-dropdown-menu';
export const notifMenuId = "notification-dropdown-menu";

export const RenderMenu = (props: any) => {
    const { anchorEl, setAnchorEl } = props;
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    return (
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    )
}

export const RenderMobileMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
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
    )
}

export const RenderMsgMenu = (props: any) => {
    const { msgAnchorEl, setMsgAnchorEl } = props;

    const isMsgMenuOpen = Boolean(msgAnchorEl);

    const handleMsgMenuClose = () => {
        setMsgAnchorEl(null);
    }

    return (
        <Menu anchorEl={msgAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={msgMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMsgMenuOpen} onClose={handleMsgMenuClose}>
            <MenuItem onClick={handleMsgMenuClose}>
                Message 1
            </MenuItem>
            <MenuItem onClick={handleMsgMenuClose}>
                Message 2
            </MenuItem>
        </Menu>
    )
}

export const RenderNotifMenu = (props : any) => {
    const { notifAnchorEl, setNotifAnchorEl } = props;

    const isNotifMenuOpen = Boolean(notifAnchorEl);

    const handleNotifMenuClose = () => {
        setNotifAnchorEl(null);
    }

    return (
        <Menu anchorEl={notifAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={notifMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right'}} open={isNotifMenuOpen} onClose={handleNotifMenuClose}>
            <MenuItem onClick={handleNotifMenuClose}>
                Notification 1
            </MenuItem>
            <MenuItem onClick={handleNotifMenuClose}>
                Notification 2
            </MenuItem>
        </Menu>
    )
}

export const getAnchorState: any = (initValue: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(initValue);
    return [anchorEl,setAnchorEl];
}

export const getMsgAnchorState: any = (initValue: any) => {
    const [msgAnchorEl, setMsgAnchorEl] = useState<null | HTMLElement>(initValue);
    return [msgAnchorEl,setMsgAnchorEl];
}

export const getNotifAnchorState: any = (initValue: any) => {
    const [notifAnchorEl,setNotifAnchorEl] = useState<null | HTMLElement>(initValue);
    return [notifAnchorEl,setNotifAnchorEl];
}