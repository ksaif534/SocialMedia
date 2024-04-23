import { useState, useEffect } from "react";
import { ModalMessageChatButton, ModalMessageChatCard, ModalMessageChatCardContent, ModalMessageChatFormTextField, ModalMessageChatGrid, ModalMessageChatsButtonBase, ModalMessagePaper, ModalMessageStyle } from "./style"
import { Backdrop, Box, Fade, Grid, Modal, Typography } from "@mui/material";
import ProfileLogo from "../@profileLogo/page";
import Pusher from "pusher-js";
import fetchUser from "@/app/profile/@profileCoverHeading/fetchUser";
import sendMessage from "./sendMessage";
import fetchUserMessages from "./fetchUserMessages";
import sendMsgNotification from "./sendMsgNotification";

const ModalMessageChats = (props: any) => {
    const { user } = props;
    const [open,setOpen] = useState(false);
    const [sender,setSender] = useState({ id: 0, name: '', email: '', password: '', image: null, phone: 0, is_active: 0 });
    const [chats,setChats] = useState([]);
    let chatsArr: any = [...chats];
    const [messageToSend,setMessageToSend] = useState("");

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

    return (
        <>
            <ModalMessageChatsButtonBase onClick={handleOpen}>
                <Grid container spacing={2}>
                    <Grid item md={3} sm={3} xs={12}>
                        <ProfileLogo name={user.name} imageUrl={`images/${user.image}`} />
                    </Grid>
                    <Grid item md={9} sm={9} xs={12}>
                        <Typography variant="h6">{ user.name }</Typography>    
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
                                                                <ModalMessagePaper elevation={3}>
                                                                    <p>{ chat.message }</p>
                                                                </ModalMessagePaper>
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
                                                                <ModalMessagePaper elevation={3}>
                                                                    <p>{ chat.message }</p>
                                                                </ModalMessagePaper>
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