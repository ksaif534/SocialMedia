'use client'
import { useEffect, useState } from "react";
import React from 'react'
import ProfileLogo from "../@profileLogo/page";
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { searchStyle, FriendRequestCard, FriendRequestGrid, ContactCard, ContactGridHeader, SearchContactTextField, ContactModalStyling, ContactStyling } from './style'
import { Box, Button, CardContent, Fade, Grid, IconButton, InputAdornment, Link, Modal, Typography, Backdrop } from "@mui/material";
import ChatSettings, { ChatSettingsForUnitTesting } from "./chatSettings";
import fetchUsers from "../../auth/login/fetchUsers";
import MessageModalChats, { ModalMessageChatForUnitTesting } from '../@navsidebar/msgModal';
import fetchPendingRecipientUserNetworks from "./fetchPendingRecipientUserNetworks";
import Cookies from "js-cookie";

export const ContactCardForUnitTesting = () => {
    return (
        <ContactCard>
            <CardContent>
                <ContactGridHeader container spacing={2}>
                    <Grid item md={2} sm={2} xs={2}>
                        <Typography variant="h6"><strong>Contacts</strong></Typography>
                    </Grid>
                    <Grid item md={6} sm={6} xs={6}>
                        
                    </Grid>
                    <Grid item md={2} sm={2} xs={2}>
                        <IconButton title="Search Contacts">
                            <SearchIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item md={2} sm={2} xs={2}>
                        <IconButton title="More Contact Options">
                            <MoreHorizIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </ContactGridHeader>
                <ContactStyling>
                    <ModalMessageChatForUnitTesting />
                    <br />
                </ContactStyling>
            </CardContent>
            <Modal open={true} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={true}>
                    <Box sx={searchStyle}>
                        <SearchContactTextField 
                        placeholder="Search Contacts here" 
                        variant="outlined" 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="large" />
                                </InputAdornment>
                            )
                        }}
                        />
                        <ContactModalStyling style={{ marginTop: '10px' }}>
                            <br />
                            <ModalMessageChatForUnitTesting />
                        </ContactModalStyling>
                    </Box>
                </Fade>
            </Modal>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <ChatSettingsForUnitTesting />
            </Box>  
        </ContactCard>
    )
}

const RootComp = () => {
    const authUserId = Cookies.get("authUserId");
    const [openSearchModal,setOpenSearchModal] = useState(false);
    const [anchorChatEl,setAnchorChatEl] = useState<null | HTMLElement>(null);
    const [users,setUsers] = useState([]);
    const [pendingRecipientUserNetworks,setPendingRecipientUserNetworks] = useState([]);

    useEffect(() => {
        fetchUsers().then((users: any) => {
            setUsers(users);
        });
        fetchPendingRecipientUserNetworks(authUserId).then((pendingRecipientUserNetworks: any) => setPendingRecipientUserNetworks(pendingRecipientUserNetworks));
    },[])

    const handleOpenSearchModal = () => setOpenSearchModal(true);
    const handleCloseSearchModal = () => setOpenSearchModal(false);
    
    const handleChatSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorChatEl(event.currentTarget);
    }

    const renderChatSettings = (
        <ChatSettings anchorChatEl={anchorChatEl} setAnchorChatEl={setAnchorChatEl} />
    )

    return (
        <>
            <FriendRequestCard>
                <CardContent>
                    <FriendRequestGrid container spacing={2}>
                        <Grid item md={2} sm={2} xs={2}>

                        </Grid>
                        <Grid item md={10} sm={10} xs={10}>
                            <Grid container spacing={2}>
                                <Grid item md={9} sm={9} xs={9}>
                                    <Typography variant="h6"><strong>Friend Requests</strong></Typography>
                                </Grid>
                                <Grid item md={3} sm={3} xs={3}>
                                    <Box sx={{ typography: 'body1', '& > :not(style) ~ :not(style)': { ml:2 } }}>
                                        <Link href="/friends">see all</Link>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={2} sm={2} xs={2}>
                            
                        </Grid>
                        <Grid item md={10} sm={10} xs={10}>
                            {
                                users?.map((user: any,index: number) => {
                                    let counter = 0;
                                    if (pendingRecipientUserNetworks.length > 0) {
                                        counter++;
                                        return pendingRecipientUserNetworks?.map((pendingRecipientUserNetwork: any) => {
                                            if (user?.id == pendingRecipientUserNetwork?.user_id_from) {
                                                return (
                                                    <Grid container spacing={2} key={user.id}>
                                                        <Grid item md={2} sm={2} xs={2}>
                                                            <ProfileLogo name={user?.name} imageUrl={user?.image} />
                                                        </Grid>
                                                        <Grid item md={8} sm={8} xs={8}>
                                                            <Typography variant="h6"><strong>{ user?.name }</strong></Typography> 
                                                        </Grid>
                                                        <Grid item md={2} sm={2} xs={2}>

                                                        </Grid>
                                                        <Grid item md={1} sm={1} xs={1}>
                                                            
                                                        </Grid>
                                                        <Grid item md={4} sm={4} xs={4}>
                                                            <Button variant="outlined" size="small">Confirm</Button>
                                                        </Grid>
                                                        <Grid item md={2} sm={2} xs={2}>
                                                            
                                                        </Grid>
                                                        <Grid item md={4} sm={4} xs={4}>
                                                            <Button variant="outlined" size="small">Delete</Button>
                                                        </Grid>
                                                        <Grid item md={1} sm={1} xs={1}>
                                                            
                                                        </Grid>
                                                    </Grid>
                                                )
                                            }
                                        })   
                                    }else{
                                        if (index == users?.length - 1 && counter == 0) {
                                            return (
                                                <Grid container spacing={2} key={user?.id}>
                                                    <Grid item md={12} sm={12} xs={12}>
                                                        <Typography variant="h6" color="secondary">
                                                            <strong>No friend requests available</strong>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                    }
                                })
                            }
                        </Grid>
                    </FriendRequestGrid>
                </CardContent>
            </FriendRequestCard>
            <ContactCard>
                <CardContent>
                    <ContactGridHeader container spacing={2}>
                        <Grid item md={2} sm={2} xs={2}>
                            <Typography variant="h6"><strong>Contacts</strong></Typography>
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            
                        </Grid>
                        <Grid item md={2} sm={2} xs={2}>
                            <IconButton title="Search Contacts" onClick={handleOpenSearchModal}>
                                <SearchIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                        <Grid item md={2} sm={2} xs={2}>
                            <IconButton title="More Contact Options" onClick={handleChatSettingsMenuOpen}>
                                <MoreHorizIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                    </ContactGridHeader>
                    {
                        users?.map((user: any) => {
                            return (
                                <ContactStyling key={user?.id}>
                                    <MessageModalChats user={user} />
                                    <br />
                                </ContactStyling>
                            )
                        })
                    }
                </CardContent>
                <Modal open={openSearchModal} onClose={handleCloseSearchModal} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                    <Fade in={openSearchModal}>
                        <Box sx={searchStyle}>
                            <SearchContactTextField 
                            placeholder="Search Contacts here" 
                            variant="outlined" 
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="large" />
                                    </InputAdornment>
                                )
                            }}
                            />
                            {
                                users?.map((user: any) => {
                                    return (
                                        <ContactModalStyling key={user?.id} style={{ marginTop: '10px' }}>
                                            <br />
                                            <MessageModalChats user={user} />
                                        </ContactModalStyling>
                                    )
                                })
                            }
                        </Box>
                    </Fade>
                </Modal>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    {renderChatSettings}
                </Box>  
            </ContactCard>
        </>
    )
}

export default RootComp