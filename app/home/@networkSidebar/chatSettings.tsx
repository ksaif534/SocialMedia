'use client'
import { Divider, Grid, Typography } from '@mui/material';
import { ChatMenu, ChatMenuGridHeader, ChatMenuDivider, ChatMenuItem, ChatMenuItemGrid } from './style'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import updateChatSettings from './updateChatSettings';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import fetchChatSettings from './fetchChatSettings';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import updateShowContacts from './updateShowContacts';
import React from 'react';

export const ChatSettingsForUnitTesting = () => {
    return (
        <>
            <ChatMenu anchorOrigin={{vertical: 'top', horizontal: 'right'}} id='chat-settings-menu' keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={true}>
                <ChatMenuGridHeader container spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Typography variant="h6">Chat Settings</Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <Typography variant="body2">Customize your chat experience</Typography>
                    </Grid>
                </ChatMenuGridHeader>
                <ChatMenuDivider />
                <ChatMenuItem>
                    <ChatMenuItemGrid container spacing={2}>
                        <Grid item md={2} sm={2} xs={12}>
                            <ContactMailIcon fontSize="large" />
                        </Grid>
                        <Grid item md={8} sm={8} xs={12}>
                            <Typography variant="h6">Show Contacts</Typography>
                        </Grid>
                        <Grid item md={2} sm={2} xs={12}>
                            <ToggleOffIcon fontSize="large" />
                        </Grid>
                    </ChatMenuItemGrid>
                </ChatMenuItem>
                <Divider />
                <ChatMenuItem>
                    <ChatMenuItemGrid container spacing={2}>
                        <Grid item md={2} sm={2} xs={12}>
                            <CircleNotificationsIcon fontSize="large" />
                        </Grid>
                        <Grid item md={8} sm={8} xs={12}>
                            <Typography variant="h6">Active Status:</Typography>
                        </Grid>
                        <Grid item md={2} sm={2} xs={12}>
                            <Typography variant="h6"><strong>OFF</strong></Typography>
                        </Grid>
                    </ChatMenuItemGrid>
                </ChatMenuItem>
            </ChatMenu>
        </>
    )
}

const ChatSettings = (props: any) => {
    const { anchorChatEl, setAnchorChatEl } = props;
    const isChatSettingsMenuOpen = Boolean(anchorChatEl);
    const [chatSettings,setChatSettings] = useState([]);
    const [isActive,setIsActive] = useState(false);
    const [isShown,setIsShown] = useState(false);

    useEffect(() => {
        fetchChatSettings(localStorage.getItem("authUserId")).then((chatSettings: any) => setChatSettings(chatSettings));
    },[])

    const handleChatSettingsMenuClose = () => {
        setAnchorChatEl(null);
    }

    const chatSettingsMenuId = 'chat-settings-menu';

    const handleActiveStatus = async () => {
        setIsActive(!isActive);
        const isActiveBool = !isActive;
        const updateOrCreate = await updateChatSettings(localStorage.getItem("authUserId"),isActiveBool);
        if (Boolean(updateOrCreate)) {
            Swal.fire({
                title: `Success`,
                text: `Active Status is toggled as ON/OFF`,
                icon: `success`
            });
        }else{
            Swal.fire({
                title: `Error`,
                text: `Sorry, couldn't toggle active status as ON/OFF`,
                icon: `error`
            });
        }
    }

    const handleShowStatus = async () => {
        setIsShown(!isShown);
        const isShownBool = !isShown;
        const updateIsShown = await updateShowContacts(localStorage.getItem("authUserId"),isShownBool);
        if (Boolean(updateIsShown)) {
            Swal.fire({
                title: `Success`,
                text: `Contacts are enabled to be shown`,
                icon: `success`
            });
        }else{
            Swal.fire({
                title: `Error`,
                text: `Sorry, Contacts are not enabled to be shown`,
                icon: `error`
            });
        }
    }

    return (
        <>
            <ChatMenu anchorEl={anchorChatEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}} id={chatSettingsMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isChatSettingsMenuOpen} onClose={handleChatSettingsMenuClose}>
                <ChatMenuGridHeader container spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Typography variant="h6">Chat Settings</Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <Typography variant="body2">Customize your chat experience</Typography>
                    </Grid>
                </ChatMenuGridHeader>
                <ChatMenuDivider />
                {
                    chatSettings.map((chatSetting: any) => {
                        return (
                            <div key={chatSetting.id}>
                                <ChatMenuItem onClick={handleShowStatus}>
                                    <ChatMenuItemGrid container spacing={2}>
                                        <Grid item md={2} sm={2} xs={12}>
                                            <ContactMailIcon fontSize="large" />
                                        </Grid>
                                        <Grid item md={8} sm={8} xs={12}>
                                            <Typography variant="h6">Show Contacts</Typography>
                                        </Grid>
                                        <Grid item md={2} sm={2} xs={12}>
                                            {
                                                (chatSetting.is_shown == 1) ? (
                                                    <ToggleOnIcon fontSize="large" />
                                                ) : (
                                                    <ToggleOffIcon fontSize="large" />
                                                )
                                            }
                                        </Grid>
                                    </ChatMenuItemGrid>
                                </ChatMenuItem>
                                <Divider />
                                <ChatMenuItem onClick={handleActiveStatus}>
                                    <ChatMenuItemGrid container spacing={2}>
                                        <Grid item md={2} sm={2} xs={12}>
                                            <CircleNotificationsIcon fontSize="large" />
                                        </Grid>
                                        <Grid item md={8} sm={8} xs={12}>
                                            <Typography variant="h6">Active Status:</Typography>
                                        </Grid>
                                        <Grid item md={2} sm={2} xs={12}>
                                            {
                                                (chatSetting.is_active == 1) ? (
                                                    <Typography variant="h6"><strong>ON</strong></Typography>
                                                ) : (
                                                    <Typography variant="h6"><strong>OFF</strong></Typography>
                                                )
                                            }
                                        </Grid>
                                    </ChatMenuItemGrid>
                                </ChatMenuItem>
                            </div>
                        )
                    })
                }
            </ChatMenu>
        </>
    )
}

export default ChatSettings