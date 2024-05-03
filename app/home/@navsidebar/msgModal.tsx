import { useState, useEffect } from "react";
import { ModalMessageChatButton, ModalMessageChatCard, ModalMessageChatCardContent, ModalMessageChatFormTextField, ModalMessageChatGrid, ModalMessageChatGridIconButton, ModalMessageChatGridItemGrid, ModalMessageChatsButtonBase, ModalMessagePaper, ModalMessageStyle } from "./style"
import { Backdrop, Box, Fade, Grid, IconButton, Menu, MenuItem, Modal, Typography } from "@mui/material";
import ProfileLogo from "../@profileLogo/page";
import Pusher from "pusher-js";
import fetchUser from "@/app/profile/@profileCoverHeading/fetchUser";
import sendMessage from "./sendMessage";
import fetchUserMessages from "./fetchUserMessages";
import sendMsgNotification from "./sendMsgNotification";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import removeMsg from "./removeMsg";
import Swal from "sweetalert2";

const ModalMessageChats = (props: any) => {
    const { user } = props;
    const [open,setOpen] = useState(false);
    const [sender,setSender] = useState({ id: 0, name: '', email: '', password: '', image: null, phone: 0, is_active: 0 });
    const [chats,setChats] = useState([]);
    let chatsArr: any = [...chats];
    const [messageToSend,setMessageToSend] = useState("");
    const [removeMsgMenuAnchorEl,setRemoveMsgMenuAnchorEl] = useState<null | HTMLElement>(null);
    const removeMsgMenuOpen = Boolean(removeMsgMenuAnchorEl);

    useEffect(() => {
        fetchUser(sessionStorage.getItem("authUserId")).then((user: any) => setSender(user));
        const pusher = new Pusher(`${process.env.NEXT_PUBLIC_KEY}`,{
            cluster: "ap2",
            authEndpoint: `api/home/pusher/auth`,
            auth: {
                params: {
                    user_info: sender
                }
            }
        });
        const channel = pusher.subscribe("ksaif-chat-sm-nextjs");
        channel.bind("send-msg-event", (data: any) => {
            chatsArr.push({
                sender: data.sender,
                senderImage: data.sender.image,
                message: data.message
            });
            setChats(chatsArr);
        })
        return () => {
            pusher.unsubscribe("ksaif-chat-sm-nextjs");
        }
    },[])

    const handleOpen = () => {
        setOpen(true);
        fetchUserMessages(sessionStorage.getItem("authUserId"),user?.id).then((messages: any) => {
            chatsArr = messages;
            setChats(messages);
        });
    };

    const handleClose = () => setOpen(false);

    const handleMessageChange = (event: any) => {
        setMessageToSend(event.target.value);
    }

    const fetchLatestMsg = async (newMsg: any) => {
        try {
            const msgNotifData = {
                sender: sender,
                recipientUserId: user?.id,
                messageId: newMsg?.id
            };
            sendMsgNotification(msgNotifData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleMessageSend = (event: any) => {
        event.preventDefault();
        const msgData = {
            message: messageToSend,
            sender: sender,
            recipientUserId: user?.id
        };
        sendMessage(msgData).then((result: any) => {
            chatsArr.push(result.configData);
            setChats(chatsArr);
            fetchLatestMsg(result.newMsg);
        });
    }

    const handleMsgMenuRemoveClick = (event: any) => {
        setRemoveMsgMenuAnchorEl(event.currentTarget);
    }

    const handleMsgMenuRemoveClose = () => {
        setRemoveMsgMenuAnchorEl(null);
    }

    const handleMsgRemove = async (chatMsg: any) => {
        const msgRemove = await removeMsg(chatMsg);
        if (Boolean(msgRemove)) {
            Swal.fire({
                title: `Success`,
                text: `Message Deleted`,
                icon: `success`
            });
        }else{
            Swal.fire({
                title: `Failure`,
                text: `Sorry, Couldn't delete message`,
                icon: `error`
            });
        }
    }

    return (
        <>
            <ModalMessageChatsButtonBase onClick={handleOpen}>
                <Grid container spacing={2}>
                    <Grid item md={2} sm={2} xs={12}>
                        <ProfileLogo name={user.name} imageUrl={`images/${user.image}`} />
                    </Grid>
                    <Grid item md={10} sm={10} xs={12}>
                        <Typography variant="h6"><strong>{ user.name }</strong></Typography>    
                    </Grid>
                </Grid>
            </ModalMessageChatsButtonBase>
            <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={open}>
                    <Box sx={{ ModalMessageStyle }}>
                        <ModalMessageChatCard>
                            <ModalMessageChatCardContent>
                                {
                                    chats.map((chat: any, index: number) => {
                                        return (
                                            <ModalMessageChatGrid container spacing={2} key={index}>
                                                {
                                                    (chat?.user_id == sessionStorage.getItem("authUserId") || chat?.recipientUserId == sessionStorage.getItem("authUserId")) ? (
                                                        <>
                                                            <Grid item md={11} sm={11} xs={12}>
                                                                <ModalMessageChatGridItemGrid container spacing={2}>
                                                                    <Grid item md={10} sm={10} xs={12}>
                                                                        <ModalMessagePaper elevation={3}>
                                                                            <p>{ chat.message }</p>
                                                                        </ModalMessagePaper>
                                                                    </Grid>
                                                                    <Grid item md={2} sm={2} xs={12}>
                                                                        {
                                                                            (chat?.user_id == sessionStorage.getItem("authUserId")) && (
                                                                                <ModalMessageChatGridIconButton onClick={handleMsgMenuRemoveClick} aria-controls={ removeMsgMenuOpen ? 'basic-msg-menu': undefined } aria-haspopup="true" aria-expanded={ removeMsgMenuOpen ? 'true' : undefined }>
                                                                                    <MoreVertIcon fontSize="medium" />
                                                                                </ModalMessageChatGridIconButton>
                                                                            )
                                                                        }
                                                                        <Menu id="basic-update-msg-menu" anchorEl={removeMsgMenuAnchorEl} open={removeMsgMenuOpen} onClose={handleMsgMenuRemoveClose} MenuListProps={{ 'aria-labelledby': 'basic-icon-button' }}>
                                                                            <MenuItem onClick={() => handleMsgRemove(chat)}>
                                                                                <Typography variant="body2">
                                                                                    Delete Message
                                                                                </Typography>
                                                                            </MenuItem>
                                                                        </Menu>
                                                                    </Grid>
                                                                </ModalMessageChatGridItemGrid>
                                                            </Grid>
                                                            <Grid item md={1} sm={1} xs={12}>
                                                                {
                                                                    ('sender' in chat || 'senderImage' in chat) ? (
                                                                        <ProfileLogo name={chat.sender?.name} imageUrl={`images/${chat.sender?.image}`} />
                                                                    ) : (
                                                                        <ProfileLogo name={chat?.user?.name} imageUrl={`images/${chat?.user?.image}`} />
                                                                    )
                                                                }
                                                            </Grid>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Grid item md={1} sm={1} xs={12}>
                                                                {
                                                                    ('sender' in chat || 'senderImage' in chat) ? (
                                                                        <ProfileLogo name={chat.sender?.name} imageUrl={`images/${chat.sender?.image}`} />
                                                                    ) : (
                                                                        <ProfileLogo name={chat?.user?.name} imageUrl={`images/${chat?.user?.image}`} />
                                                                    )
                                                                }
                                                            </Grid>
                                                            <Grid item md={11} sm={11} xs={12}>
                                                                <ModalMessageChatGridItemGrid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}> 
                                                                    <Grid item md={2} sm={2} xs={12}>
                                                                        {
                                                                            (chat?.user_id == sessionStorage.getItem("authUserId")) && (
                                                                                <ModalMessageChatGridIconButton onClick={handleMsgMenuRemoveClick} id="basic-icon-button" aria-controls={ removeMsgMenuOpen ? 'basic-msg-menu': undefined } aria-haspopup="true" aria-expanded={ removeMsgMenuOpen ? 'true' : undefined }>
                                                                                    <MoreVertIcon fontSize="medium" />
                                                                                </ModalMessageChatGridIconButton>
                                                                            )
                                                                        }
                                                                        <Menu id="basic-update-msg-menu" anchorEl={removeMsgMenuAnchorEl} open={removeMsgMenuOpen} onClose={handleMsgMenuRemoveClose} MenuListProps={{ 'aria-labelledby': 'basic-icon-button' }}>
                                                                            <MenuItem onClick={() => handleMsgRemove(chat)}>
                                                                                <Typography variant="body2">
                                                                                    Delete Message
                                                                                </Typography>
                                                                            </MenuItem>
                                                                        </Menu>
                                                                    </Grid>
                                                                    <Grid item md={10} sm={10} xs={12}>
                                                                        <ModalMessagePaper elevation={3}>
                                                                            <p>{ chat.message }</p>
                                                                        </ModalMessagePaper>
                                                                    </Grid>
                                                                </ModalMessageChatGridItemGrid>
                                                            </Grid>       
                                                        </>
                                                    )
                                                }
                                            </ModalMessageChatGrid>
                                        )
                                    })
                                }
                                <br />
                                <Grid container spacing={2}>
                                    <Grid item md={1} sm={1} xs={12}>
                                        <ProfileLogo name={sender.name} imageUrl={`images/${sender?.image}`} />
                                    </Grid>
                                    <Grid item md={10} sm={10} xs={12}>
                                        <ModalMessageChatFormTextField title="Enter Your Message" placeholder="Type Your Message Here" name="message" value={messageToSend} onChange={handleMessageChange} />
                                    </Grid>
                                    <Grid item md={1} sm={1} xs={12}>
                                        <ModalMessageChatButton variant="contained" onClick={handleMessageSend}>
                                            Send
                                        </ModalMessageChatButton>
                                    </Grid>
                                </Grid>
                            </ModalMessageChatCardContent>
                        </ModalMessageChatCard>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ModalMessageChats