'use client'
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const menuId = 'primary-search-account-menu';
export const RenderMenu = (props: any) => {
    const { anchorEl, setAnchorEl, setMobileMoreAnchorEl , isMenuOpen } = props;

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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



