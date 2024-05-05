'use client'
import { useState, useEffect, createContext, useContext } from "react";
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
import GroupsIcon from '@mui/icons-material/Groups';
import { useRouter } from "next/navigation";
import fetchProfileUserPosts from "./fetchProfileUserPosts";
import { SearchGroupPostContext } from "@/app/groups/@navbar/page";
import fetchGroupPosts from "./fetchGroupPosts";
import fetchNewMsgNotificationsFromDB from "@/app/home/@navsidebar/fetchNewMsgNotificationsFromDB";
import fetchNewNotificationsFromDB from "@/app/home/@navsidebar/fetchNewNotificationsFromDB";

interface ProfileSearchProps {
    srchProfilePosts: Array<any>,
    setSrchProfilePosts: (newSearchProfilePosts: any) => void,
    srchProfileKey: string,
    setSrchProfileKey: (newSearchKey: any) => void
}

export const ProfileSearchContext = createContext<ProfileSearchProps>({
    srchProfilePosts: [],
    setSrchProfilePosts: () => {},
    srchProfileKey: '',
    setSrchProfileKey: () => {}
})

const RootComp = () => {
    const router = useRouter();
    const { setSrchProfilePosts, setSrchProfileKey } = useContext(ProfileSearchContext);
    const {  setSrchGrpPosts, setSrchGrpPostKey } = useContext(SearchGroupPostContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorMsgEl,setAnchorMsgEl] = useState<null | HTMLElement>(null);
    const [anchorNotifMenuEl,setAnchorNotifMenuEl] = useState<null | HTMLElement>(null);
    const [newMsgNotif,setNewMsgNotif] = useState([]);
    const [newNotif,setNewNotif] = useState([]);

    useEffect(() => {
        if (sessionStorage.length > 0) {
            if (sessionStorage.getItem("authUser") == "" || sessionStorage.getItem("sessionToken") == "") {
                router.push(`/auth/login`);
            }
        }else{
            router.push(`/auth/login`);
        }
        fetchNewMsgNotificationsFromDB(sessionStorage.getItem("authUserId")).then((newMsgNotif: any) => setNewMsgNotif(newMsgNotif));
        fetchNewNotificationsFromDB(sessionStorage.getItem("authUserId")).then((newNotif: any) => setNewNotif(newNotif));
    },[])

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

    const handleGoToHome = () => {
        router.push(`/home`);
    }

    const handleGoToGroups = () => {
        router.push(`/groups`);
    }

    const searchProfilePosts = async (event: any) => {
        const currentUrl = window.location.href;
        if (currentUrl == 'http://localhost:3000/profile') {
            setSrchProfileKey(event.target.value);
            const searchProfilePosts = await fetchProfileUserPosts(sessionStorage.getItem("authUserId"),event.target.value);
            setSrchProfilePosts(searchProfilePosts);    
        }
        if (currentUrl == 'http://localhost:3000/groups') {
            setSrchGrpPostKey(event.target.value);
            const searchGrpPosts = await fetchGroupPosts(event.target.value);
            setSrchGrpPosts(searchGrpPosts);
        }
    }
    
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
                            onChange={searchProfilePosts}
                            />
                        </Search>
                        <MiddleBox>
                            <BoxIconButton size="large" aria-label="Home Icon" color="inherit" title="Home" onClick={handleGoToHome}>
                                <HomeIcon fontSize="large" />
                            </BoxIconButton>
                            <BoxIconButton size="large" aria-label="User Groups" color="inherit" title="User Groups" onClick={handleGoToGroups}>
                                <GroupsIcon fontSize="large" />
                            </BoxIconButton>
                        </MiddleBox>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" aria-controls={msgMenuId} color="inherit" onClick={handleMsgMenuOpen}>
                                <Badge badgeContent={Number(newMsgNotif.length)} color="error">
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
                                <Badge badgeContent={Number(newNotif.length)} color="error">
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