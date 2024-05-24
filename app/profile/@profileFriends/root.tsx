'use client'
import { Grid, IconButton, InputAdornment, Menu, MenuItem, Typography } from "@mui/material"
import { FriendsBox, FriendsBoxCard, FriendsTG, FriendsBoxCardGrid, FriendsSearchBar, FindFriendsButton, FriendListNetworkGrid, FriendsAvatar, FriendsNamesTG, FriendListItemPaper } from "./style"
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { createContext, useContext, useState } from "react";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import searchAcceptedProfileNetworks from "./searchAcceptedProfileNetworks";
import unfriendProfile from "./unfriendProfile";

interface ProfileFriendsSearchContextProps{
    srchProfFriends: Array<any>,
    setSrchProfFriends: (newSrchProfFriends: any) => void,
    srchProfFriendsKey: string,
    setSrchProfFriendsKey: (newSrchProfFirendsKey: any) => void
}

export const ProfileFriendsSearchContext = createContext<ProfileFriendsSearchContextProps>({
    srchProfFriends: [],
    setSrchProfFriends: () => {},
    srchProfFriendsKey: '',
    setSrchProfFriendsKey: () => {}
})

const RootComp = (props: any) => {
    const router = useRouter();
    const { updateProfile, acceptedProfileNetworks, profile, recipientUser } = props;
    const { srchProfFriends, setSrchProfFriends, srchProfFriendsKey, setSrchProfFriendsKey } = useContext(ProfileFriendsSearchContext)
    
    const [anchorEl,setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleProfileClick = (profileNetwork: any = {}, recipientUser: any = {}) => {
        if (JSON.stringify(recipientUser) == '{}') {
            const pfl = profileNetwork?.profile;
            updateProfile(pfl);
        }else{
            const pfl = recipientUser?.profile;
            updateProfile(pfl);
        }
    }

    const handleUnfriendProfile = (otherProfileNetwork: any = {}, recipientUserOrProfile: any = {}) => {
        if (recipientUserOrProfile !== '{}') {
            Swal.fire({
                title: `Unfriend Notification`,
                text: `Do You want to unfriend ${recipientUserOrProfile?.name} ?`,
                icon: `question`,
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const unfriendBool = await unfriendProfile(profile?.user_id,recipientUserOrProfile?.id);
                    if (Boolean(unfriendBool)) {
                        Swal.fire({
                            title: `Success`,
                            text: `Unfriended ${recipientUserOrProfile?.name}`,
                            icon: `success`
                        });    
                    }else{
                        Swal.fire({
                            title: `Failure`,
                            text: `Failed to Unfriend ${recipientUserOrProfile?.name}`,
                            icon: `error`
                        })
                    }
                }else{
                    Swal.fire({
                        title: `Failure`,
                        text: `Not Unfriended ${recipientUserOrProfile?.name}`,
                        icon: `error`
                    });
                }
            });
        }else{
            Swal.fire({
                title: `Unfriend Notification`,
                text: `Do You want to unfriend ${otherProfileNetwork?.user?.name} ?`,
                icon: `question`,
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const unfriendBool = await unfriendProfile(profile?.user_id,recipientUserOrProfile?.id);
                    if (Boolean(unfriendBool)) {
                        Swal.fire({
                            title: `Success`,
                            text: `Unfriended ${recipientUserOrProfile?.name}`,
                            icon: `success`
                        });    
                    }else{
                        Swal.fire({
                            title: `Failure`,
                            text: `Failed to Unfriend ${recipientUserOrProfile?.name}`,
                            icon: `error`
                        })
                    }
                }else{
                    Swal.fire({
                        title: `Failure`,
                        text: `Not Unfriended ${recipientUserOrProfile?.name}`,
                        icon: `error`
                    });
                }
            });
        }
    }

    const handleFriendFinding = () => {
        router.push(`/friends`);
    }

    const handleProfileFriendSearch = async (event: any) => {
        setSrchProfFriendsKey(event.target.value);
        if (event.target.value !== '') {
            const searchProfileFriends = await searchAcceptedProfileNetworks(profile?.user_id,event.target.value);
            setSrchProfFriends(searchProfileFriends);   
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item sm={12} md={12} xs={12}>
                    <FriendsBox>
                        <FriendsBoxCard variant="outlined">
                            <FriendsBoxCardGrid container spacing={2}>
                                <Grid item md={4} sm={4} xs={12}>
                                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <FriendsTG variant="h5">
                                            Friends
                                        </FriendsTG>
                                    </div>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12}>
                                    <FriendsSearchBar 
                                    placeholder="Search"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="large" />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleProfileFriendSearch}
                                    />
                                </Grid>
                                <Grid item md={4} sm={4} xs={12}>
                                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <FindFriendsButton aria-label="Find Friends" title="Find Friends Outside Your Network" onClick={handleFriendFinding}>
                                            <SearchIcon fontSize="large" />
                                            <Typography variant="h6">
                                                Find Friends
                                            </Typography>
                                        </FindFriendsButton>
                                    </div>
                                </Grid>
                            </FriendsBoxCardGrid>
                            <FriendListNetworkGrid container spacing={2}>
                                {
                                    (srchProfFriendsKey !== '') ? (
                                        <>
                                            {
                                                (srchProfFriends.length > 0) ? (
                                                    <>
                                                        {
                                                            srchProfFriends.map((profile: any) => {
                                                                return profile.networks.map((profileNetwork: any) => {
                                                                    return (
                                                                        <Grid item md={6} sm={6} xs={12} key={profileNetwork.id}>
                                                                            <FriendListItemPaper elevation={3}>
                                                                                <Grid container spacing={2}>
                                                                                    <Grid item md={4} sm={4} xs={12}>
                                                                                        <FriendsAvatar src={`images/${profile.user?.image}`} onClick={() => handleProfileClick(profileNetwork)} />
                                                                                    </Grid>
                                                                                    <Grid item md={4} sm={4} xs={12}>
                                                                                        <FriendsNamesTG>
                                                                                            { profile.user.name }
                                                                                        </FriendsNamesTG>
                                                                                    </Grid>
                                                                                    <Grid item md={4} sm={4} xs={12}>
                                                                                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                                                                            <IconButton onClick={handleMenuClick} id="basic-icon-button" aria-controls={open ? 'basic-menu' : undefined } aria-haspopup="true" aria-expanded={ open ? 'true' : undefined}>
                                                                                                <MoreHorizIcon fontSize="large" />
                                                                                            </IconButton>
                                                                                            <Menu 
                                                                                            id="basic-menu" 
                                                                                            anchorEl={anchorEl} 
                                                                                            open={open} 
                                                                                            onClose={handleMenuClose}
                                                                                            MenuListProps={{
                                                                                                'aria-labelledby': 'basic-icon-button'
                                                                                            }}
                                                                                            >
                                                                                                <MenuItem onClick={() => handleUnfriendProfile(profileNetwork)}>
                                                                                                    <PersonRemoveIcon fontSize="large" />
                                                                                                    Unfriend
                                                                                                </MenuItem>
                                                                                                <MenuItem>
                                                                                                    <CancelIcon fontSize="large" />
                                                                                                    Unfollow
                                                                                                </MenuItem>
                                                                                            </Menu>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </FriendListItemPaper>
                                                                        </Grid>
                                                                    )    
                                                                })
                                                            })
                                                        }  
                                                    </>
                                                ) : (
                                                    <Grid item md={12} sm={12} xs={12}>
                                                        <Typography variant="h6" align="center"><strong>Sorry, no friend network available</strong></Typography>
                                                    </Grid>
                                                )
                                            }      
                                        </>
                                    ) : (
                                        <>
                                            {
                                                acceptedProfileNetworks?.map((profileNetwork: any, index: number) => {
                                                    if (profileNetwork.user_id_from == profile.user_id) {
                                                        return (
                                                            <Grid item md={6} sm={6} xs={12} key={profileNetwork.id}>
                                                                <FriendListItemPaper elevation={3}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={4} sm={4} xs={12}>
                                                                            <FriendsAvatar src={`images/${profileNetwork.user?.image}`} onClick={() => handleProfileClick(profileNetwork)} />
                                                                        </Grid>
                                                                        <Grid item md={4} sm={4} xs={12}>
                                                                            <FriendsNamesTG>
                                                                                { profileNetwork.user.name }
                                                                            </FriendsNamesTG>
                                                                        </Grid>
                                                                        <Grid item md={4} sm={4} xs={12}>
                                                                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                                                                <IconButton onClick={handleMenuClick} id="basic-icon-button" aria-controls={open ? 'basic-menu' : undefined } aria-haspopup="true" aria-expanded={ open ? 'true' : undefined}>
                                                                                    <MoreHorizIcon fontSize="large" />
                                                                                </IconButton>
                                                                                <Menu 
                                                                                id="basic-menu" 
                                                                                anchorEl={anchorEl} 
                                                                                open={open} 
                                                                                onClose={handleMenuClose}
                                                                                MenuListProps={{
                                                                                    'aria-labelledby': 'basic-icon-button'
                                                                                }}
                                                                                >
                                                                                    <MenuItem onClick={() => handleUnfriendProfile(profileNetwork)}>
                                                                                        <PersonRemoveIcon fontSize="large" />
                                                                                        Unfriend
                                                                                    </MenuItem>
                                                                                    <MenuItem>
                                                                                        <CancelIcon fontSize="large" />
                                                                                        Unfollow
                                                                                    </MenuItem>
                                                                                </Menu>
                                                                            </div>
                                                                        </Grid>
                                                                    </Grid>
                                                                </FriendListItemPaper>
                                                            </Grid>
                                                        )   
                                                    }else{
                                                        if (profileNetwork.user_id_to == profile.user_id) {
                                                            if (JSON.stringify(recipientUser) == '{}') {
                                                                
                                                            }else{
                                                                if (recipientUser.id == profileNetwork.user_id_from) {
                                                                    return (
                                                                        <Grid item md={6} sm={6} xs={12} key={profileNetwork.id}>
                                                                            <FriendListItemPaper elevation={3}>
                                                                                <Grid container spacing={2}>
                                                                                    <Grid item md={4} sm={4} xs={12}>
                                                                                        <FriendsAvatar src={`images/${recipientUser?.image}`} onClick={() => handleProfileClick(profileNetwork,recipientUser)} />
                                                                                    </Grid>
                                                                                    <Grid item md={4} sm={4} xs={12}>
                                                                                        <FriendsNamesTG>
                                                                                            { recipientUser?.name }
                                                                                        </FriendsNamesTG>
                                                                                    </Grid>
                                                                                    <Grid item md={4} sm={4} xs={12}>
                                                                                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                                                                            <IconButton onClick={handleMenuClick} id="basic-icon-button" aria-controls={open ? 'basic-menu' : undefined } aria-haspopup="true" aria-expanded={ open ? 'true' : undefined}>
                                                                                                <MoreHorizIcon fontSize="large" />
                                                                                            </IconButton>
                                                                                            <Menu 
                                                                                            id="basic-menu" 
                                                                                            anchorEl={anchorEl} 
                                                                                            open={open} 
                                                                                            onClose={handleMenuClose}
                                                                                            MenuListProps={{
                                                                                                'aria-labelledby': 'basic-icon-button'
                                                                                            }}
                                                                                            >
                                                                                                <MenuItem onClick={() => handleUnfriendProfile(profileNetwork,recipientUser)}>
                                                                                                    <PersonRemoveIcon fontSize="large" />
                                                                                                    Unfriend
                                                                                                </MenuItem>
                                                                                                <MenuItem>
                                                                                                    <CancelIcon fontSize="large" />
                                                                                                    Unfollow
                                                                                                </MenuItem>
                                                                                            </Menu>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </FriendListItemPaper>
                                                                        </Grid>
                                                                    )   
                                                                }
                                                            }    
                                                        }
                                                    }
                                                })
                                            }
                                        </>
                                    )
                                }
                            </FriendListNetworkGrid>
                        </FriendsBoxCard>
                    </FriendsBox>
                </Grid>
            </Grid>
        </>
    )
}

export default RootComp