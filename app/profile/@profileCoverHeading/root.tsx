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
import postNetworkStatus from "./postNetworkStatus";
import Swal from "sweetalert2";
import fetchPendingNetworks from "./fetchPendingNetworks";
import updatePendingNetwork from "./updatePendingNetwork";
import fetchProfileNetworks from "./fetchProfileNetworks";
import ProfileFriends from "../@profileFriends/page";
import fetchAllProfileNetworks from "./fetchAllProfileNetworks";
import fetchAcceptedProfileNetworks from "./fetchAcceptedProfileNetworks";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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
    const [profilePosts,setProfilePosts] = useState([]);
    const [profileVideoPosts,setProfileVideoPosts] = useState([]);
    const [profileNetworks,setProfileNetworks] = useState([]);
    const [pendingNetworks,setPendingNetworks] = useState([]);
    const [allProfileNetworks,setAllProfileNetworks] = useState([]);
    const [acceptedProfileNetworks,setAcceptedProfileNetworks] = useState([]);
    const [toggleProfile,setToggleProfile] = useState(false);
    const [initProfileState,setInitProfileState] = useState(true);
    const [value, setValue] = useState(0);
    const [recipientUser,setRecipientUser] = useState({ id: 0, email: '', password: '', image: null, is_active: 0, name: '', phone: 0, profile: null });
    const sessionStorageValue: string | null = (typeof window !== undefined) ? sessionStorage.getItem("authUserId") : '';
    let indexCounterArr: any = [];
    let indexCounterArr2: any = [];
    let profileCounterArr: any = [];

    useEffect(() => {
        fetchProfile(sessionStorageValue).then((profile: any) => setProfile(profile)); 
        fetchUser(sessionStorageValue).then((user: any) => setUser(user));
        fetchOtherProfiles(sessionStorageValue).then((otherProfiles: any) => setOtherProfiles(otherProfiles));
        fetchProfilePosts(sessionStorageValue).then((posts: any) => setProfilePosts(posts));
        fetchProfileVideoPosts(sessionStorageValue).then((posts: any) => setProfileVideoPosts(posts));
        fetchPendingNetworks(sessionStorageValue).then((pendingNetworks: any) => setPendingNetworks(pendingNetworks));
        fetchProfileNetworks(sessionStorageValue).then((profileNetworks: any) => setProfileNetworks(profileNetworks));
        fetchAllProfileNetworks(sessionStorageValue).then((allProfileNetworks: any) => setAllProfileNetworks(allProfileNetworks));
        fetchAcceptedProfileNetworks(sessionStorageValue).then((result: any) => {
            setAcceptedProfileNetworks(result.acceptedNetworks);
            setRecipientUser(result.recipientUser);
        });
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

    const handleAddFriendClick = async (otherProfileUserId: any) => {
        const networkStatus = await postNetworkStatus(sessionStorageValue,otherProfileUserId);
        if (Boolean(networkStatus)) {
            Swal.fire({
                title: `Success`,
                text: `Friend Added Successfully`,
                icon: `success`
            });
        }else{
            Swal.fire({
                title: `Failure`,
                text: `Sorry, couldn't add ${user.name} in your friend network`,
                icon: `error`
            });
        }
    }

    const handleOtherProfiles = async (otherProfile: any) => {
        fetchProfile(otherProfile?.user_id).then((otherPfl: any) => setProfile(otherPfl));
        fetchUser(otherProfile?.user_id).then((otherUser: any) => setUser(otherUser));
        fetchOtherProfiles(otherProfile?.user_id).then((otherProfiles: any) => setOtherProfiles(otherProfiles));
        fetchProfilePosts(otherProfile?.user_id).then((posts: any) => setProfilePosts(posts));
        fetchProfileVideoPosts(otherProfile?.user_id).then((videoPosts: any) => setProfileVideoPosts(videoPosts));
        fetchProfileNetworks(otherProfile?.user_id).then((profileNetworks: any) => setProfileNetworks(profileNetworks));
        fetchAllProfileNetworks(otherProfile?.user_id).then((allProfileNetworks: any) => setAllProfileNetworks(allProfileNetworks));
        fetchAcceptedProfileNetworks(otherProfile?.user_id).then((result: any) => {
            setAcceptedProfileNetworks(result.acceptedNetworks);
            setRecipientUser(result.recipientUser);
        });
        setToggleProfile(!toggleProfile);
        setInitProfileState(false);
        indexCounterArr = [];
        indexCounterArr2 = [];
    }

    const handleFriendRequestAcceptance = async (pendingNetwork: any) => {
        Swal.fire({
            title: `Friend Confirmation`,
            text: `Do you want to add ${pendingNetwork.user?.name} to your friend network?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedNetwork = await updatePendingNetwork(sessionStorageValue,pendingNetwork);
                if (Boolean(updatedNetwork)) {
                    Swal.fire(`Friend Network Updated Successfully`);
                }else{
                    Swal.fire(`Friend Network Not Updated`);
                }
            }else{
                Swal.fire(`You decided to reject the invitation to connect for now`);
            }
        });
    }

    const updateProfile = (newValue: any) => {
        setProfile(newValue);
        fetchUser(newValue?.user_id).then((otherUser: any) => setUser(otherUser));
        fetchOtherProfiles(newValue?.user_id).then((otherProfiles: any) => setOtherProfiles(otherProfiles));
        fetchProfilePosts(newValue?.user_id).then((posts: any) => setProfilePosts(posts));
        fetchProfileVideoPosts(newValue?.user_id).then((videoPosts: any) => setProfileVideoPosts(videoPosts));
        fetchProfileNetworks(newValue?.user_id).then((profileNetworks: any) => setProfileNetworks(profileNetworks));
        fetchAllProfileNetworks(newValue?.user_id).then((allProfileNetworks: any) => setAllProfileNetworks(allProfileNetworks));
        fetchAcceptedProfileNetworks(newValue?.user_id).then((result: any) => {
            setAcceptedProfileNetworks(result.acceptedNetworks);
            setRecipientUser(result.recipientUser);
        });
        setToggleProfile(!toggleProfile);
        setInitProfileState(false);
        indexCounterArr = [];
        indexCounterArr2 = [];
    }

    const handleAllFriendsGeneration = () => {
        setValue(1);
        a11yProps(1);
    }

    return (
        <>
            <ProfileCoverHeadingGrid container spacing={2}>
                <Grid item md={1} sm={1} xs={12}></Grid>
                {
                    (toggleProfile == false) ? (
                        <Grid item md={10} sm={10} xs={12}>
                            <ProfileCoverHeadingCard>
                                <CardMedia image={`images/` + profile?.profile_photo} title="Beautiful Background" sx={{ height: 250, objectFit: 'cover' }} />
                            </ProfileCoverHeadingCard>
                            <ProfileGrid container spacing={2}>
                                <Grid item md={1} sm={1} xs={12}></Grid>
                                <ProfileImageGridItem item md={1} sm={1} xs={12}>
                                    <RoundedAvatar alt="Profile Image" src={`images/`+user?.image} />
                                </ProfileImageGridItem>
                                <Grid item md={10} sm={10} xs={12}>
                                    <ProfileHeadersGrid container spacing={2}>
                                        <Grid item md={1} sm={1} xs={12}></Grid>
                                        <ProfileTitleGrid item md={3} sm={3} xs={12}>
                                            <ProfileTitleTG variant="h4">
                                                <strong>{profile?.firstname + " " + profile?.lastname}</strong>
                                            </ProfileTitleTG>
                                        </ProfileTitleGrid>
                                        <Grid item md={4} sm={4} xs={12}>
                                            <ProfileSubTitleTG variant="h6">
                                                { acceptedProfileNetworks?.length } Friend(s)
                                            </ProfileSubTitleTG>
                                            <span style={{ display:'flex', justifyContent: 'center'}}>
                                                {
                                                    acceptedProfileNetworks.map((acceptedProfileNetwork: any,acceptedProfileNetworkIndex: number) => {
                                                        if (acceptedProfileNetwork.user_id_from == profile?.user_id) {
                                                            profileCounterArr.push(acceptedProfileNetworkIndex);
                                                            if (profileCounterArr.length < 4) {
                                                                return (
                                                                    <RoundedFirstSmallAvatar alt="Profile Image" src={`images/${acceptedProfileNetwork.user?.image}`} onClick={() => handleOtherProfiles(acceptedProfileNetwork.profile)} key={acceptedProfileNetwork.id}>
        
                                                                    </RoundedFirstSmallAvatar>
                                                                )   
                                                            }
                                                            if (profileCounterArr.length == 4) {
                                                                return (
                                                                    <ArrowRightIcon fontSize="large" key={acceptedProfileNetwork.id} onClick={handleAllFriendsGeneration} />
                                                                )
                                                            }
                                                        }else{
                                                            if (acceptedProfileNetwork.user_id_to == profile?.user_id) {
                                                                if (JSON.stringify(recipientUser) == '{}') {
                                                                    
                                                                }else{
                                                                    if (recipientUser?.id == acceptedProfileNetwork.user_id_from) {
                                                                        profileCounterArr.push(acceptedProfileNetworkIndex);
                                                                        if (profileCounterArr.length < 4) {
                                                                            return (
                                                                                <RoundedFirstSmallAvatar alt="Profile Image" src={`images/${recipientUser.image}`} onClick={() => handleOtherProfiles(recipientUser?.profile)} key={acceptedProfileNetwork.id}>
                    
                                                                                </RoundedFirstSmallAvatar>
                                                                            )   
                                                                        }
                                                                        if (profileCounterArr.length == 4) {
                                                                            return (
                                                                                <ArrowRightIcon fontSize="large" key={acceptedProfileNetwork.id} onClick={handleAllFriendsGeneration} />
                                                                            )
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    })
                                                }
                                            </span>
                                        </Grid>
                                        <Grid item md={2} sm={2} xs={12}>
                                            {
                                                (Number(profile?.user_id) == Number(sessionStorageValue)) ? (
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
                                                        {
                                                            (initProfileState) ? (
                                                                <ProfileEditIconButton aria-label="Create Profile" title="Edit Profile (Heading)" onClick={handleProfileCreate}>
                                                                    <Typography variant="h6">
                                                                        Create Profile
                                                                    </Typography>
                                                                    <EditIcon fontSize="large" />
                                                                </ProfileEditIconButton>       
                                                            ) : (
                                                                <>
                                                                    
                                                                </>
                                                            )
                                                        }        
                                                    </>
                                                )
                                            }
                                        </Grid>
                                        <Grid item md={2} sm={2} xs={12}>
                                            {
                                                (pendingNetworks.length == 1) && (
                                                    <>
                                                        {
                                                            pendingNetworks?.map((pendingNetwork: any) => {
                                                                return (
                                                                    <ProfileEditIconButton aria-label="Accept Friend Request" title="Accept Friend Request" key={pendingNetwork.id} onClick={() => handleFriendRequestAcceptance(pendingNetwork)}>
                                                                        <Typography variant="h6">
                                                                            Accept Friend Request
                                                                        </Typography>
                                                                        <SwipeRightIcon />
                                                                    </ProfileEditIconButton>
                                                                )
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
                                    <ProfileBody profilePosts={profilePosts} profile={profile} acceptedProfileNetworks={acceptedProfileNetworks} recipientUser={recipientUser} />
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={1}>
                                    <ProfileFriends profileNetworks={profileNetworks} acceptedProfileNetworks={acceptedProfileNetworks} updateProfile={updateProfile} allProfileNetworks={allProfileNetworks} profile={profile} recipientUser={recipientUser} />
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={2}>
                                    <Typography variant="h6">
                                        Item 3
                                    </Typography>
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={3}>
                                    <ProfileBody videoPosts={profileVideoPosts} profile={profile} profileNetworks={profileNetworks} />
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
                                <CardMedia image={`images/` + profile?.profile_photo} title="Beautiful Background" sx={{ height: 250, objectFit: 'cover' }} />
                            </ProfileCoverHeadingCard>
                            <ProfileGrid container spacing={2}>
                                <Grid item md={1} sm={12} xs={12}></Grid>
                                <ProfileImageGridItem item md={1} sm={12} xs={12}>
                                    <RoundedAvatar alt="Profile Image" src={`images/`+ user?.image} />
                                </ProfileImageGridItem>
                                <Grid item md={10} sm={12} xs={12}>
                                    <ProfileHeadersGrid container spacing={2}>
                                        <Grid item md={1} sm={1} xs={12}></Grid>
                                        <ProfileTitleGrid item md={3} sm={3} xs={12}>
                                            <ProfileTitleTG variant="h4">
                                                <strong>{profile?.firstname + " " + profile?.lastname}</strong>
                                            </ProfileTitleTG>
                                        </ProfileTitleGrid>
                                        <Grid item md={3} sm={3} xs={12}>
                                            <ProfileSubTitleTG variant="h6">
                                                { acceptedProfileNetworks?.length } Friend(s)
                                            </ProfileSubTitleTG>
                                            <span style={{ display:'flex', justifyContent: 'center'}}>
                                                {
                                                    acceptedProfileNetworks.map((acceptedProfileNetwork: any,acceptedProfileNetworkIndex: number) => {
                                                        if (acceptedProfileNetwork.user_id_from == profile?.user_id) {
                                                            profileCounterArr.push(acceptedProfileNetworkIndex);
                                                            if (profileCounterArr.length < 4) {
                                                                return (
                                                                    <RoundedFirstSmallAvatar alt="Profile Image" src={`images/${acceptedProfileNetwork.user?.image}`} onClick={() => handleOtherProfiles(acceptedProfileNetwork.profile)} key={acceptedProfileNetwork.id}>
        
                                                                    </RoundedFirstSmallAvatar>
                                                                )   
                                                            }
                                                            if (profileCounterArr.length == 4) {
                                                                return (
                                                                    <ArrowRightIcon fontSize="large" key={acceptedProfileNetwork.id} onClick={handleAllFriendsGeneration} />
                                                                )
                                                            }
                                                        }else{
                                                            if (acceptedProfileNetwork.user_id_to == profile?.user_id) {
                                                                if (JSON.stringify(recipientUser) == '{}') {
                                                                    
                                                                }else{
                                                                    if (recipientUser?.id == acceptedProfileNetwork.user_id_from) {
                                                                        profileCounterArr.push(acceptedProfileNetworkIndex);
                                                                        if (profileCounterArr.length < 4) {
                                                                            return (
                                                                                <RoundedFirstSmallAvatar alt="Profile Image" src={`images/${recipientUser.image}`} onClick={() => handleOtherProfiles(recipientUser?.profile)} key={acceptedProfileNetwork.id}>
                    
                                                                                </RoundedFirstSmallAvatar>
                                                                            )   
                                                                        }
                                                                        if (profileCounterArr.length == 4) {
                                                                            return (
                                                                                <ArrowRightIcon fontSize="large" key={acceptedProfileNetwork.id} onClick={handleAllFriendsGeneration} />
                                                                            )
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    })
                                                }
                                            </span>
                                        </Grid>
                                        <Grid item md={1} sm={12} xs={12}></Grid>
                                        <Grid item md={4} sm={12} xs={12}>
                                            {
                                                (profileNetworks.length == 0) ? (
                                                    <>
                                                        {
                                                            allProfileNetworks?.map((allProfileNetwork: any,index: number) => {
                                                                if ((allProfileNetwork.user_id_from == sessionStorageValue || allProfileNetwork.user_id_from == profile.user_id) && (allProfileNetwork.user_id_to == sessionStorageValue || allProfileNetwork.user_id_to == profile.user_id)) {
                                                                    indexCounterArr.push(index);
                                                                    if (allProfileNetwork.status == 2) {
                                                                        if (allProfileNetwork.user_id_from == sessionStorageValue) {
                                                                            return (
                                                                                <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" key={allProfileNetwork.id}>
                                                                                    <Typography variant="h6">
                                                                                        Friend Request Sent
                                                                                    </Typography>
                                                                                    <PresentToAllIcon />
                                                                                </ProfileEditIconButton>
                                                                            )
                                                                        }else{
                                                                            if (allProfileNetwork.user_id_to == sessionStorageValue) {
                                                                                return (
                                                                                    <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" key={allProfileNetwork.id} onClick={() => handleFriendRequestAcceptance(allProfileNetwork)}>
                                                                                        <Typography variant="h6">
                                                                                            Accept Friend Request
                                                                                        </Typography>
                                                                                        <SwipeRightIcon />
                                                                                    </ProfileEditIconButton>
                                                                                )
                                                                            }else{
                                                                                return (
                                                                                    <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" onClick={() => handleAddFriendClick(profile?.user_id)} key={allProfileNetwork.id}>
                                                                                        <Typography variant="h6">
                                                                                            Add Friend
                                                                                        </Typography>
                                                                                        <AddIcon fontSize="large" />
                                                                                    </ProfileEditIconButton>
                                                                                )
                                                                            }
                                                                        }
                                                                    }else{
                                                                        if (allProfileNetwork.status == 1) {
                                                                            if (allProfileNetwork.user_id_from == sessionStorageValue || allProfileNetwork.user_id_to == sessionStorageValue) {
                                                                                return (
                                                                                    <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" key={allProfileNetwork.id}>
                                                                                        <Typography variant="h6">
                                                                                            Friends
                                                                                        </Typography>
                                                                                        <DoneIcon />
                                                                                    </ProfileEditIconButton>
                                                                                ) 
                                                                            }else{

                                                                            }
                                                                        }else{
                                                                            return (
                                                                                <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" onClick={() => handleAddFriendClick(profile?.user_id)} key={allProfileNetwork.id}>
                                                                                    <Typography variant="h6">
                                                                                        Add Friend
                                                                                    </Typography>
                                                                                    <AddIcon fontSize="large" />
                                                                                </ProfileEditIconButton>
                                                                            )
                                                                        }
                                                                    }
                                                                }else{
                                                                    indexCounterArr2.push(index);
                                                                    if (indexCounterArr2.length < 2 && indexCounterArr.length == 0 && index == allProfileNetworks.length - 1) {
                                                                        return (
                                                                            <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" onClick={() => handleAddFriendClick(profile?.user_id)} key={allProfileNetwork.id}>
                                                                                <Typography variant="h6">
                                                                                    Add Friend
                                                                                </Typography>
                                                                                <AddIcon fontSize="large" />
                                                                            </ProfileEditIconButton>
                                                                        )    
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        {
                                                            profileNetworks?.map((profileNetwork: any,index: number) => {
                                                                const acceptedNetworks = allProfileNetworks.filter((allProfileNetwork: any) => ((allProfileNetwork.user_id_from == sessionStorageValue || allProfileNetwork.user_id_from == profile.user_id) && (allProfileNetwork.user_id_to == sessionStorageValue || allProfileNetwork.user_id_to == profile.user_id)));
                                                                if (acceptedNetworks.length > 0) {
                                                                    return acceptedNetworks?.map((allProfileNetwork: any) => {
                                                                        if (allProfileNetwork.status == 2) {
                                                                            if (allProfileNetwork.user_id_from == sessionStorageValue) {
                                                                                return (
                                                                                    <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" key={allProfileNetwork.id}>
                                                                                        <Typography variant="h6">
                                                                                            Friend Request Sent
                                                                                        </Typography>
                                                                                        <PresentToAllIcon />
                                                                                    </ProfileEditIconButton>
                                                                                )
                                                                            }
                                                                            if (allProfileNetwork.user_id_to == sessionStorageValue) {
                                                                                return (
                                                                                    <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" key={allProfileNetwork.id} onClick={() => handleFriendRequestAcceptance(allProfileNetwork)}>
                                                                                        <Typography variant="h6">
                                                                                            Accept Friend Request
                                                                                        </Typography>
                                                                                        <SwipeRightIcon />
                                                                                    </ProfileEditIconButton>
                                                                                )
                                                                            }else{
                                                                                return (
                                                                                    <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" onClick={() => handleAddFriendClick(profile?.user_id)} key={allProfileNetwork.id}>
                                                                                        <Typography variant="h6">
                                                                                            Add Friend
                                                                                        </Typography>
                                                                                        <AddIcon fontSize="large" />
                                                                                    </ProfileEditIconButton>
                                                                                )
                                                                            }
                                                                        }else{
                                                                            if (allProfileNetwork.status == 1) {
                                                                                if (allProfileNetwork.user_id_from == sessionStorageValue || allProfileNetwork.user_id_to == sessionStorageValue) {
                                                                                    return (
                                                                                        <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" key={allProfileNetwork.id}>
                                                                                            <Typography variant="h6">
                                                                                                Friends
                                                                                            </Typography>
                                                                                            <DoneIcon />
                                                                                        </ProfileEditIconButton>
                                                                                    )   
                                                                                }else{
                                                                                    return (
                                                                                        <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" onClick={() => handleAddFriendClick(profile?.user_id)} key={allProfileNetwork.id}>
                                                                                            <Typography variant="h6">
                                                                                                Add Friend
                                                                                            </Typography>
                                                                                            <AddIcon fontSize="large" />
                                                                                        </ProfileEditIconButton>
                                                                                    )
                                                                                }
                                                                            }
                                                                        }
                                                                    })    
                                                                }else{
                                                                    indexCounterArr.push(index);
                                                                    if (indexCounterArr.length < 2) {
                                                                        return (
                                                                            <ProfileEditIconButton aria-label="Add Friend" title="Add Friend" onClick={() => handleAddFriendClick(profile?.user_id)} key={profileNetwork.id}>
                                                                                <Typography variant="h6">
                                                                                    Add Friend
                                                                                </Typography>
                                                                                <AddIcon fontSize="large" />
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
                                    <ProfileBody profilePosts={profilePosts} otherProfile={profile} acceptedProfileNetworks={acceptedProfileNetworks} recipientUser={recipientUser} />
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={1}>
                                    <ProfileFriends profileNetworks={profileNetworks} acceptedProfileNetworks={acceptedProfileNetworks} updateProfile={updateProfile} recipientUser={recipientUser} profile={profile} />
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={2}>
                                    <Typography variant="h6">
                                        Item 3
                                    </Typography>
                                </CustomProfileTabPanel>
                                <CustomProfileTabPanel value={value} index={3}>
                                    <ProfileBody videoPosts={profileVideoPosts} otherProfile={profile} profileNetworks={profileNetworks} />
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