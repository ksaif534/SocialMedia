'use client'
import { useState } from "react";
import ProfileLogo from "../@profileLogo/page";
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { searchStyle, FriendRequestCard, FriendRequestGrid, ContactCard, ContactGridHeader, ContactGridContent, SearchContactTextField, ContactModalGridContent, ContactModalGridContentItem } from './style'
import { Box, Button, CardContent, Fade, Grid, IconButton, InputAdornment, Link, Modal, Typography, Backdrop } from "@mui/material";
import ChatSettings from "./chatSettings";

const RootComp = () => {
    const [openSearchModal,setOpenSearchModal] = useState(false);
    const [anchorChatEl,setAnchorChatEl] = useState<null | HTMLElement>(null);

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
                                        <Link href="#">see all</Link>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={2} sm={2} xs={2}>
                            
                        </Grid>
                        <Grid item md={10} sm={10} xs={10}>
                            <Grid container spacing={2}>
                                <Grid item md={2} sm={2} xs={2}>
                                    <ProfileLogo name="Omar Khan" imageUrl="/images/beautiful-bg-custom.jpg" />
                                </Grid>
                                <Grid item md={8} sm={8} xs={8}>
                                    <Typography variant="h6"><strong>Omar Khan</strong></Typography> 
                                </Grid>
                                <Grid item md={2} sm={2} xs={2}>
                                    <Typography variant="h6" color="secondary">2d</Typography>
                                </Grid>
                            </Grid>
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
                    <ContactGridContent container spacing={2}>
                        <Grid item md={2} sm={2} xs={2}>
                            <ProfileLogo name="Nayeem Ahmad" imageUrl="/images/nayeem-ahmad.jpeg" /> 
                        </Grid>
                        <Grid item md={10} sm={10} xs={10}>
                            <Typography variant="h6"><strong>Nayeem Ahmad</strong></Typography>
                        </Grid>
                        <Grid item md={2} sm={2} xs={2}>
                            <ProfileLogo name="Safat Shahin" imageUrl="/images/safat-shahin.jpeg" /> 
                        </Grid>
                        <Grid item md={10} sm={10} xs={10}>
                            <Typography variant="h6"><strong>Safat Shahin</strong></Typography>
                        </Grid>
                        <Grid item md={2} sm={2} xs={2}>
                            <ProfileLogo name="Ivdad Ahmed" imageUrl="/images/ivdad-ahmed.jpeg" /> 
                        </Grid>
                        <Grid item md={10} sm={10} xs={10}>
                            <Typography variant="h6"><strong>Ivdad Ahmed</strong></Typography>
                        </Grid>
                    </ContactGridContent>
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
                            <ContactModalGridContent container spacing={2}>
                                <ContactModalGridContentItem item md={2} sm={2} xs={12}>
                                    <ProfileLogo name="Saif Kamal" imageUrl="/images/saif.jpeg" />
                                </ContactModalGridContentItem>
                                <ContactModalGridContentItem item md={4} sm={4} xs={12}>
                                    <Typography variant="h5"><strong>Saif Kamal</strong></Typography>
                                </ContactModalGridContentItem>
                                <ContactModalGridContentItem item md={6} sm={6} xs={12}>
                                    <Typography variant="body2">Software Engineer</Typography>
                                </ContactModalGridContentItem>
                            </ContactModalGridContent>
                            <ContactModalGridContent container spacing={2}>
                                <ContactModalGridContentItem item md={2} sm={2} xs={12}>
                                    <ProfileLogo name="Safat Shahin" imageUrl="/images/safat-shahin.jpeg" />
                                </ContactModalGridContentItem>
                                <ContactModalGridContentItem item md={4} sm={4} xs={12}>
                                    <Typography variant="h5"><strong>Safat Shahin</strong></Typography>
                                </ContactModalGridContentItem>
                                <ContactModalGridContentItem item md={6} sm={6} xs={12}>
                                    <Typography variant="body2">Cyber Security Engineer</Typography>
                                </ContactModalGridContentItem>
                            </ContactModalGridContent>
                            <ContactModalGridContent container spacing={2}>
                                <ContactModalGridContentItem item md={2} sm={2} xs={12}>
                                    <ProfileLogo name="Ivdad Ahmed" imageUrl="/images/ivdad-ahmed.jpeg" />
                                </ContactModalGridContentItem>
                                <ContactModalGridContentItem item md={4} sm={4} xs={12}>
                                    <Typography variant="h5"><strong>Ivdad Ahmed</strong></Typography>
                                </ContactModalGridContentItem>
                                <ContactModalGridContentItem item md={6} sm={6} xs={12}>
                                    <Typography variant="body2">Managing Director,LCP</Typography>
                                </ContactModalGridContentItem>
                            </ContactModalGridContent>
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