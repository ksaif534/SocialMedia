'use client'
import { useContext, useEffect, useState } from 'react'
import { IconButton, Menu, MenuItem, Badge, Avatar, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import fetchUser from '../../profile/@profileCoverHeading/fetchUser'
import ModalMessageChats from './msgModal'
import fetchUsers from '../../auth/login/fetchUsers'
import fetchNewNotificationsFromDB from './fetchNewNotificationsFromDB'
import fetchNewMsgNotificationsFromDB from './fetchNewMsgNotificationsFromDB'
import makeNotificationRead from './makeNotificationRead'
import Swal from 'sweetalert2'
import makeMsgNotificationAsRead from './makeMsgNotificationAsRead'
import Cookies from 'js-cookie'
import fetchTmpDirImages from './fetchTmpDirImages'
import Image from 'next/image'
import path from 'path'

export const menuId = 'primary-search-account-menu';
export const mobileMenuId = 'primary-search-account-menu-mobile';
export const msgMenuId = 'msg-dropdown-menu';
export const notifMenuId = "notification-dropdown-menu";

export const RenderMenu = (props: any) => {
    const { anchorEl, setAnchorEl } = props;
    const authUserId = Cookies.get("authUserId");
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [currentUser,setCurrentUser] = useState({ id: 0, email: '', password: '', image: null, is_active: 0, name: '', phone: 0 })
    const [tmpDirImage,setTmpDirImage] = useState('');

    useEffect(() => {
        fetchUser(authUserId).then((cUser: any) => {
            setCurrentUser(cUser);
            fetchTmpDirImages(cUser?.image).then(async (imageBuffer: any) => {
                const buffer = await imageBuffer.arrayBuffer();
                const blob = new Blob([buffer], { type: `${path.extname(cUser?.image).substring(1)}` });
                setTmpDirImage(URL.createObjectURL(blob));
            });
        });
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
        Cookies.set("sessionToken","");
        Cookies.set("authUser","");
        Cookies.set("authUserId","");
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
                    <Avatar src={tmpDirImage} />
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
    const authUserId = Cookies.get("authUserId");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [newNotif,setNewNotif] = useState([]);
    const [newMsgNotif,setNewMsgNotif] = useState([]);

    useEffect(() => {
        fetchNewNotificationsFromDB(authUserId).then((notif: any) => setNewNotif(notif));
        fetchNewMsgNotificationsFromDB(authUserId).then((msgNotif: any) => setNewMsgNotif(msgNotif));
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
    const authUserId = Cookies.get("authUserId");
    const [user,setUser] = useState({ id: 0, name: '', email: '', password: '', image: null, phone: 0, is_active: 0 });
    const [newMsgNotif,setNewMsgNotif] = useState([]);
    const [users,setUsers] = useState([]);

    useEffect(() => {
        fetchUser(authUserId).then((user: any) => setUser(user));
        fetchUsers().then((users: any) => setUsers(users));
        fetchNewMsgNotificationsFromDB(authUserId).then((newMsgNotif: any) => setNewMsgNotif(newMsgNotif));
    },[])

    const isMsgMenuOpen = Boolean(msgAnchorEl);

    const handleMsgMenuClose = () => {
        setMsgAnchorEl(null);
    }

    const makeMsgNotifRead = async (msgNotif: any) => {
        const updateMsgNotifAsRead = await makeMsgNotificationAsRead(authUserId,msgNotif);
    }

    return (
        <Menu anchorEl={msgAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={msgMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMsgMenuOpen} onClose={handleMsgMenuClose}>
            {
                users.map((user: any) => {
                    if (user.id != authUserId) {
                        let counter = 0;
                        if (newMsgNotif.length > 0) {
                            return newMsgNotif.map((msgNotif: any) => {
                                if (user.id == msgNotif.message.user_id) {
                                    counter++;
                                    return (
                                        <div key={user.id}>
                                            <MenuItem sx={{ backgroundColor: 'rgba(123,123,123,0.5)' }} onClick={() => makeMsgNotifRead(msgNotif)}>
                                                <ModalMessageChats user={user} />
                                            </MenuItem>
                                        </div>
                                    )
                                }
                                if (counter == 0) {
                                    return (
                                        <div key={user.id}>
                                            <MenuItem>
                                                <ModalMessageChats user={user} />
                                            </MenuItem>
                                        </div>
                                    )
                                }
                            })   
                        }else{
                            return (
                                <div key={user.id}>
                                    <MenuItem>
                                        <ModalMessageChats user={user} />
                                    </MenuItem>
                                </div>
                            )
                        }   
                    }
                })
            }
        </Menu>
    )
}

export const RenderNotifMenu = (props : any) => {
    const { notifAnchorEl, setNotifAnchorEl } = props;
    const authUserId = Cookies.get("authUserId");
    const [newNotif,setNewNotif] = useState([]);

    useEffect(() => {
        fetchNewNotificationsFromDB(authUserId).then((notif: any) => setNewNotif(notif));
    },[])

    const isNotifMenuOpen = Boolean(notifAnchorEl);

    const handleNotifMenuClose = () => {
        setNotifAnchorEl(null);
    }

    const handleNotificationMenuItemClick = (notif: any) => {
        const notifUpdate = makeNotificationRead(authUserId,notif);
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

export const useAnchorState: any = (initValue: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(initValue);
    return [anchorEl,setAnchorEl];
}

export const useMsgAnchorState: any = (initValue: any) => {
    const [msgAnchorEl, setMsgAnchorEl] = useState<null | HTMLElement>(initValue);
    return [msgAnchorEl,setMsgAnchorEl];
}

export const useNotifAnchorState: any = (initValue: any) => {
    const [notifAnchorEl,setNotifAnchorEl] = useState<null | HTMLElement>(initValue);
    return [notifAnchorEl,setNotifAnchorEl];
}

export const useUsersState: any = (initValue: any) => {
    const [users,setUsers] = useState(initValue);
    return [users,setUsers];
}

export const useAuthUserState: any = (initValue: any) => {
    const [authUser,setAuthUser] = useState(initValue);
    return [authUser,setAuthUser];
}