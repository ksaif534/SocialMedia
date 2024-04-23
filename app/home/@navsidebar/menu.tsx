'use client'
import { useEffect, useState } from 'react'
import { IconButton, Menu, MenuItem, Badge, Avatar, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import fetchUser from '@/app/profile/@profileCoverHeading/fetchUser'
import ModalMessageChats from './msgModal'
import fetchUsers from '@/app/auth/login/fetchUsers'
import fetchNewNotificationsFromDB from './fetchNewNotificationsFromDB'
import fetchNewMsgNotificationsFromDB from './fetchNewMsgNotificationsFromDB'
import makeNotificationRead from './makeNotificationRead'
import Swal from 'sweetalert2'

export const menuId = 'primary-search-account-menu';
export const mobileMenuId = 'primary-search-account-menu-mobile';
export const msgMenuId = 'msg-dropdown-menu';
export const notifMenuId = "notification-dropdown-menu";

export const RenderMenu = (props: any) => {
    const { anchorEl, setAnchorEl } = props;
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [currentUser,setCurrentUser] = useState({ id: 0, email: '', password: '', image: null, is_active: 0, name: '', phone: 0 })

    useEffect(() => {
        fetchUser(sessionStorage.getItem("authUserId")).then((currentUser: any) => setCurrentUser(currentUser));
    },[])

    const router = useRouter();

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const goToProfilePage = () => {
        router.push(`/profile`);
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleLogout = () => {
        sessionStorage.setItem("sessionToken","");
        sessionStorage.setItem("authUser","");
        sessionStorage.setItem("authUserId","");
        router.push(`/auth/login`);
    }

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
            <MenuItem onClick={goToProfilePage}>
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
    )
}

export const RenderMobileMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [newNotif,setNewNotif] = useState([]);
    const [newMsgNotif,setNewMsgNotif] = useState([]);

    useEffect(() => {
        fetchNewNotificationsFromDB(sessionStorage.getItem("authUserId")).then((notif: any) => setNewNotif(notif));
        fetchNewMsgNotificationsFromDB(sessionStorage.getItem("authUserId")).then((msgNotif: any) => setNewMsgNotif(msgNotif));
    },[])

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
                <IconButton size="large" aria-label={`show ${Number(newMsgNotif?.length)} new mails`} color="inherit">
                <Badge badgeContent={Number(newMsgNotif?.length)} color="error">
                    <MailIcon />
                </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                size="large"
                aria-label={`show ${newNotif?.length} new notifications`}
                color="inherit"
                >
                <Badge badgeContent={newNotif?.length} color="error">
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
    const [user,setUser] = useState({ id: 0, name: '', email: '', password: '', image: null, phone: 0, is_active: 0 });
    const [users,setUsers] = useState([]);

    useEffect(() => {
        fetchUser(sessionStorage.getItem("authUserId")).then((user: any) => setUser(user));
        fetchUsers().then((users: any) => setUsers(users));
    },[])

    const isMsgMenuOpen = Boolean(msgAnchorEl);

    const handleMsgMenuClose = () => {
        setMsgAnchorEl(null);
    }

    return (
        <Menu anchorEl={msgAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={msgMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMsgMenuOpen} onClose={handleMsgMenuClose}>
            {
                users.map((user: any) => {
                    if (user.id != sessionStorage.getItem("authUserId")) {
                        return (
                            <div key={user.id}>
                                <MenuItem>
                                    <ModalMessageChats user={user} />
                                </MenuItem>
                            </div>
                        )   
                    }
                })
            }
        </Menu>
    )
}

export const RenderNotifMenu = (props : any) => {
    const { notifAnchorEl, setNotifAnchorEl } = props;
    const [newNotif,setNewNotif] = useState([]);

    useEffect(() => {
        fetchNewNotificationsFromDB(sessionStorage.getItem("authUserId")).then((notif: any) => setNewNotif(notif));
        //sendNotificationFromBeams();
    },[])

    const isNotifMenuOpen = Boolean(notifAnchorEl);

    const handleNotifMenuClose = () => {
        setNotifAnchorEl(null);
    }

    const handleNotificationMenuItemClick = (notif: any) => {
        const notifUpdate = makeNotificationRead(sessionStorage.getItem("authUserId"),notif);
        if (Boolean(notifUpdate)) {
            Swal.fire({
                title: `Success`,
                text: `Marked Notification as read`,
                icon: `success`
            });
        }else{
            Swal.fire({
                title: `Failure`,
                text: `Sorry, couldn't mark notification as read`,
                icon: `error`
            });
        }
    }

    return (
        <Menu anchorEl={notifAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={notifMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right'}} open={isNotifMenuOpen} onClose={handleNotifMenuClose}>
            {
                newNotif?.map((notif: any) => {
                    return (
                        <div key={notif.id}>
                            <MenuItem onClick={() => handleNotificationMenuItemClick(notif)}>
                                <Typography variant="body2">
                                    {notif.data}
                                </Typography>
                            </MenuItem>
                        </div>
                    )
                })
            }
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

export const getUsersState: any = (initValue: any) => {
    const [users,setUsers] = useState(initValue);
    return [users,setUsers];
}

export const getAuthUserState: any = (initValue: any) => {
    const [authUser,setAuthUser] = useState(initValue);
    return [authUser,setAuthUser];
}