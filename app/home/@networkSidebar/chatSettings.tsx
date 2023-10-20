'use client'
import { Divider, Grid, Typography } from '@mui/material';
import { ChatMenu, ChatMenuGridHeader, ChatMenuDivider, ChatMenuItem, ChatMenuItemGrid } from './style'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import BlockIcon from '@mui/icons-material/Block';

const ChatSettings = (props: any) => {
    const { anchorChatEl, setAnchorChatEl } = props;
    const isChatSettingsMenuOpen = Boolean(anchorChatEl);

    const handleChatSettingsMenuClose = () => {
        setAnchorChatEl(null);
    }

    const chatSettingsMenuId = 'chat-settings-menu';

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
                <ChatMenuItem onClick={handleChatSettingsMenuClose}>
                    <ChatMenuItemGrid container spacing={2}>
                        <Grid item md={2} sm={2} xs={12}>
                            <ContactMailIcon fontSize="large" />
                        </Grid>
                        <Grid item md={8} sm={8} xs={12}>
                            <Typography variant="h6">Show Contacts</Typography>
                        </Grid>
                        <Grid item md={2} sm={2} xs={12}>
                            <ToggleOnIcon fontSize="large" />
                        </Grid>
                    </ChatMenuItemGrid>
                </ChatMenuItem>
                <Divider />
                <ChatMenuItem onClick={handleChatSettingsMenuClose}>
                    <ChatMenuItemGrid container spacing={2}>
                        <Grid item md={2} sm={2} xs={12}>
                            <BlockIcon fontSize="large" />
                        </Grid>
                        <Grid item md={8} sm={8} xs={12}>
                            <Typography variant="h6">Block Settings</Typography>
                        </Grid>
                        <Grid item md={2} sm={2} xs={12}>
                            
                        </Grid>
                    </ChatMenuItemGrid>
                </ChatMenuItem>
            </ChatMenu>
        </>
    )
}

export default ChatSettings