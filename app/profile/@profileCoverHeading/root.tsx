'use client'
import { useEffect, useState } from "react";
import { Box, CardMedia, Divider, Grid, Tab, Typography } from "@mui/material"
import { MoreIconButtons, ProfileCoverHeadingCard, ProfileCoverHeadingGrid, ProfileEditIconButton, ProfileGrid, ProfileHeadersGrid, ProfileImageGridItem, ProfileSubTitleTG, ProfileTabBox, ProfileTabs, ProfileTitleGrid, ProfileTitleTG, RoundedAvatar, RoundedFirstSmallAvatar, RoundedSmallAvatar } from "./style"
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import DoneIcon from '@mui/icons-material/Done';
import { useRouter } from "next/navigation";
import fetchProfile from "./fetchProfile";
import fetchUser from './fetchUser';
import ProfileBody from "../@profileBody/page";
import fetchOtherProfiles from "./fetchOtherProfiles";
import fetchProfilePosts from "./fetchProfilePosts";
import fetchProfileVideoPosts from "./fetchProfileVideoPosts";
import fetchProfileNetworks from "./fetchProfileNetworks";
import updateNetworkStatus from "./updateNetworkStatus";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomProfileTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value != index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {
                value == index && (
                    <Box sx={{ p:3 }}>
                        {children}
                    </Box>
                )
            }
        </div>
    )
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

const RootComp = () => {
    const router = useRouter();
    const [user,setUser] = useState({ id: 0, email: '', password: '', image: null, is_active: 0, name: '', phone: 0 });
    const [profile,setProfile] = useState({ id: 0, user_id: 0, firstname: '', lastname: '', marital_status: 1, gender: 1, birthDate: null, education_level: 1, occupation: 0, country: '', city: '', address: '', profile_photo: null, user: null })
    const [otherProfiles,setOtherProfiles] = useState([]);
    const [otherProfile,setOtherProfile] = useState({ user_id: 0, firstname: '', lastname: '', marital_status: 1, gender: 1, birthDate: null, education_level: 1, occupation: 0, country: '', city: '', address: '', profile_photo: null, user: null });
    const [profilePosts,setProfilePosts] = useState([]);
    const [profileVideoPosts,setProfileVideoPosts] = useState([]);
    const [profileNetworks,setProfileNetworks] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        fetchProfile(sessionStorage.getItem("authUserId")).then((profile: any) => setProfile(profile)); 
        fetchUser(sessionStorage.getItem("authUserId")).then((user: any) => setUser(user));
        fetchOtherProfiles(sessionStorage.getItem("authUserId")).then((profiles: any) => setOtherProfiles(profiles))
        fetchProfilePosts(sessionStorage.getItem("authUserId")).then((posts: any) => setProfilePosts(posts));
        fetchProfileVideoPosts(sessionStorage.getItem("authUserId")).then((posts: any) => setProfileVideoPosts(posts));
        fetchProfileNetworks(sessionStorage.getItem("authUserId")).then((profileNetworks: any) => setProfileNetworks(profileNetworks));
    },[])

    const handleProfileTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const handleProfileUpdate = () => {
        router.push(`/updateProfile/${profile.user_id}`);
    }
    
    const handleProfileCreate = () => {
        router.push(`/createProfile`);
    }

    const handleAddFriendClick = (otherProfileUserId: any) => {
        updateNetworkStatus(sessionStorage.getItem("authUserId"),otherProfileUserId);
    }

    const handleOtherProfiles = async (otherProfile: any) => {
        setOtherProfile(otherProfile);
        fetchOtherProfiles(otherProfile.user_id).then((profiles: any) => setOtherProfiles(profiles));
        fetchProfilePosts(otherProfile?.user_id).then((posts: any) => setProfilePosts(posts));
        fetchProfileVideoPosts(otherProfile?.user_id).then((videoPosts: any) => setProfileVideoPosts(videoPosts));
        fetchProfileNetworks(otherProfile.user_id).then((profileNetworks: any) => setProfileNetworks(profileNetworks));
    }

    return (
        <>
            <ProfileCoverHeadingGrid container spacing={2}>
                <Grid item md={1} sm={1} xs={12}></Grid>
                {
                    (otherProfile.user_id == 0) ? (
                        <Grid item md={10} sm={10} xs={12}>
                            <ProfileCoverHeadingCard>
                                <CardMedia image={`images/` + profile?.profile_photo} title="Beautiful Background" sx={{ height: 250, objectFit: 'cover' }} />
                            </ProfileCoverHeadingCard>
                            <ProfileGrid container spacing={2}>
                                <Grid item md={1} sm={1} xs={12}></Grid>
                                <ProfileImageGridItem item md={1} sm={1} xs={12}>
                                    <RoundedAvatar alt="Profile Image" src={`images/`+user.image} />
                                </ProfileImageGridItem>
                                <Grid item md={10} sm={10} xs={12}>
                                    <ProfileHeadersGrid container spacing={2}>
                                        <Grid item md={1} sm={12} xs={12}></Grid>
                                        <ProfileTitleGrid item md={3} sm={12} xs={12}>
                                            <ProfileTitleTG variant="h4">
                                                <strong>{profile?.firstname + " " + profile?.lastname}</strong>
                                            </ProfileTitleTG>
                                        </ProfileTitleGrid>
                                        <Grid item md={2} sm={2} xs={12}>
                                            <ProfileSubTitleTG variant="h6">
                                                { otherProfiles?.length } Friend(s)
                                            </ProfileSubTitleTG>
                                            <span style={{ display:'flex', justifyContent: 'center'}}>
                                                {
                                                    otherProfiles.map((otherProfile: any) => (
                                                        <RoundedFirstSmallAvatar alt="Profile Image" src={`images/${otherProfile.user.image}`} onClick={() => handleOtherProfiles(otherProfile)} key={otherProfile.id}>

                                                        </RoundedFirstSmallAvatar>       
                                                    ))
                                                }
                                            </span>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={12}>
                                            {
                                                (Number(profile?.user_id) == Number(user.id)) ? (
                                                    <>
                                                        <ProfileEditIconButton aria-label="Edit Profile" title="Edit Profile (Heading)" onClick={handleProfileUpdate}>
                                                            <Typography variant="h6">
                                                                Edit Profile
                                                            </Typography>
                                                            <EditIcon fontSize="large" />
                                                        </ProfileEditIconButton>        
                                                    </>
                                                ) : (
                                                    <>
                                                        <ProfileEditIconButton aria-label="Create Profile" title="Edit Profile (Heading)" onClick={handleProfileCreate}>
                                                            <Typography variant="h6">
                                                                Create Profile
                                                            </Typography>
                                                            <EditIcon fontSize="large" />
                                                        </ProfileEditIconButton> 
                                                    </>
                                                )
                                            }
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={12}>
                                            {
                                                (profileNetworks.length == 0) && (
                                                    <>
                                                        <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" onClick={() => handleAddFriendClick(otherProfile?.user_id)}>
                                                            <Typography variant="h6">
                                                                Add Friend
                                                            </Typography>
                                                            <AddIcon fontSize="large" />
                                                        </ProfileEditIconButton>
                                                    </>
                                                )
                                            }
                                        </Grid>
                                    </ProfileHeadersGrid>
                                </Grid>
                            </ProfileGrid>
                            <Box sx={{ width: '100%' }}>
                                <ProfileTabBox>
                                    <ProfileTabs value={value} onChange={handleProfileTabChange} aria-label="basic profile tabs">
                                        <Tab label="Posts" {...a11yProps(0)} />
                                        <Tab label="Friends" {...a11yProps(1)} />
                                        <Tab label="Photos" {...a11yProps(2)} />
                                        <Tab label="Videos" {...a11yProps(3)} />
                                        <Tab label={<MoreHorizIcon fontSize="large" />} {...a11yProps(4)} />
                                    </ProfileTabs>
                                </ProfileTabBox>
                                <CustomProfileTabPanel value={value} index={0}>
                                    <ProfileBody profilePosts={profilePosts} profileNetworks={profileNetworks} />
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={1}>
                                    <Typography variant="h6">
                                        Item 2
                                    </Typography>
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={2}>
                                    <Typography variant="h6">
                                        Item 3
                                    </Typography>
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={3}>
                                    <ProfileBody videoPosts={profileVideoPosts} />
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={4}>
                                    <Grid container spacing={2}>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <MoreIconButtons aria-label="Search Profile" title="Search Profile Data">
                                                <SearchIcon fontSize="large" />
                                                <Typography variant="h6">
                                                    Search Profile
                                                </Typography>
                                            </MoreIconButtons>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <MoreIconButtons aria-label="Profile Settings" title="Configure Profile">
                                                <SettingsIcon fontSize="large" />
                                                <Typography variant="h6">
                                                    Profile Settings
                                                </Typography>
                                            </MoreIconButtons>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <MoreIconButtons aria-label="Like" title="Like Profile Data">
                                                <ThumbUpIcon fontSize="large" />
                                                <Typography variant="h6">
                                                    Like Profile
                                                </Typography>
                                            </MoreIconButtons>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <MoreIconButtons aria-label="Groups" title="Groups Profile Data">
                                                <GroupsIcon fontSize="large" />
                                                <Typography variant="h6">
                                                    Groups
                                                </Typography>
                                            </MoreIconButtons>
                                        </Grid>
                                    </Grid>
                                </CustomProfileTabPanel>
                                <Divider color="text.secondary" />
                            </Box>
                        </Grid>
                    ) : (
                        <Grid item md={10} sm={12} xs={12}>
                            <ProfileCoverHeadingCard>
                                <CardMedia image={`images/` + otherProfile?.profile_photo} title="Beautiful Background" sx={{ height: 250, objectFit: 'cover' }} />
                            </ProfileCoverHeadingCard>
                            <ProfileGrid container spacing={2}>
                                <Grid item md={1} sm={12} xs={12}></Grid>
                                <ProfileImageGridItem item md={1} sm={12} xs={12}>
                                    <RoundedAvatar alt="Profile Image" src={`images/`+ otherProfile.profile_photo} />
                                </ProfileImageGridItem>
                                <Grid item md={10} sm={12} xs={12}>
                                    <ProfileHeadersGrid container spacing={2}>
                                        <Grid item md={1} sm={12} xs={12}></Grid>
                                        <ProfileTitleGrid item md={3} sm={12} xs={12}>
                                            <ProfileTitleTG variant="h4">
                                                <strong>{otherProfile?.firstname + " " + otherProfile?.lastname}</strong>
                                            </ProfileTitleTG>
                                        </ProfileTitleGrid>
                                        <Grid item md={3} sm={12} xs={12}>
                                            <ProfileSubTitleTG variant="h6">
                                                { otherProfiles?.length } Friends
                                            </ProfileSubTitleTG>
                                            <span style={{ display:'flex', justifyContent: 'center'}}>
                                                {
                                                    otherProfiles.map((otherPfl: any) => (
                                                        <RoundedFirstSmallAvatar alt="Profile Image" src={`images/${otherPfl.user.image}`} onClick={() => handleOtherProfiles(otherPfl)} key={otherPfl.user_id}>

                                                        </RoundedFirstSmallAvatar>       
                                                    ))
                                                }
                                            </span>
                                        </Grid>
                                        <Grid item md={1} sm={12} xs={12}></Grid>
                                        <Grid item md={4} sm={12} xs={12}>
                                            {
                                                (profileNetworks.length == 0) ? (
                                                    <>
                                                        <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" onClick={() => handleAddFriendClick(profile?.user_id)}>
                                                            <Typography variant="h6">
                                                                Add Friend
                                                            </Typography>
                                                            <AddIcon fontSize="large" />
                                                        </ProfileEditIconButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        {
                                                            profileNetworks.map((profileNetwork: any) => {
                                                                if (profileNetwork.status == 2) {
                                                                    if (profileNetwork.user_id_from == sessionStorage.getItem("authUserId")) {
                                                                        return (
                                                                            <ProfileEditIconButton aria-label="Add Friend" title="Add Friend">
                                                                                <Typography variant="h6">
                                                                                    Friend Request Sent
                                                                                </Typography>
                                                                                <PresentToAllIcon />
                                                                            </ProfileEditIconButton>
                                                                        )
                                                                    }
                                                                    if (profileNetwork.user_id_to == sessionStorage.getItem("authUserId")) {
                                                                        return (
                                                                            <ProfileEditIconButton aria-label="Add Friend" title="Add Friend">
                                                                                <Typography variant="h6">
                                                                                    Accept Friend Request
                                                                                </Typography>
                                                                                <SwipeRightIcon />
                                                                            </ProfileEditIconButton>
                                                                        )
                                                                    }
                                                                }else{
                                                                    if (profileNetwork.status == 1) {
                                                                        return (
                                                                            <ProfileEditIconButton aria-label="Add Friend" title="Add Friend">
                                                                                <Typography variant="h6">
                                                                                    Friends
                                                                                </Typography>
                                                                                <DoneIcon />
                                                                            </ProfileEditIconButton>
                                                                        )
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    </>
                                                )
                                            }
                                        </Grid>
                                    </ProfileHeadersGrid>
                                </Grid>
                            </ProfileGrid>
                            <Box sx={{ width: '100%' }}>
                                <ProfileTabBox>
                                    <ProfileTabs value={value} onChange={handleProfileTabChange} aria-label="basic profile tabs">
                                        <Tab label="Posts" {...a11yProps(0)} />
                                        <Tab label="Friends" {...a11yProps(1)} />
                                        <Tab label="Photos" {...a11yProps(2)} />
                                        <Tab label="Videos" {...a11yProps(3)} />
                                        <Tab label={<MoreHorizIcon fontSize="large" />} {...a11yProps(4)} />
                                    </ProfileTabs>
                                </ProfileTabBox>
                                <CustomProfileTabPanel value={value} index={0}>
                                    <ProfileBody profilePosts={profilePosts} otherProfile={otherProfile} profileNetworks={profileNetworks} />
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={1}>
                                    <Typography variant="h6">
                                        Item 2
                                    </Typography>
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={2}>
                                    <Typography variant="h6">
                                        Item 3
                                    </Typography>
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={3}>
                                    <ProfileBody videoPosts={profileVideoPosts} />
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={4}>
                                    <Grid container spacing={2}>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <MoreIconButtons aria-label="Search Profile" title="Search Profile Data">
                                                <SearchIcon fontSize="large" />
                                                <Typography variant="h6">
                                                    Search Profile
                                                </Typography>
                                            </MoreIconButtons>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <MoreIconButtons aria-label="Profile Settings" title="Configure Profile">
                                                <SettingsIcon fontSize="large" />
                                                <Typography variant="h6">
                                                    Profile Settings
                                                </Typography>
                                            </MoreIconButtons>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <MoreIconButtons aria-label="Like" title="Like Profile Data">
                                                <ThumbUpIcon fontSize="large" />
                                                <Typography variant="h6">
                                                    Like Profile
                                                </Typography>
                                            </MoreIconButtons>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <MoreIconButtons aria-label="Groups" title="Groups Profile Data">
                                                <GroupsIcon fontSize="large" />
                                                <Typography variant="h6">
                                                    Groups
                                                </Typography>
                                            </MoreIconButtons>
                                        </Grid>
                                    </Grid>
                                </CustomProfileTabPanel>
                                <Divider color="text.secondary" />
                            </Box>
                        </Grid>
                    )
                }
                <Grid item md={1} sm={12} xs={12}></Grid>
            </ProfileCoverHeadingGrid>
        </>
    )
}

export default RootComp