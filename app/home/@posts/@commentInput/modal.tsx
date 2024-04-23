import { Backdrop, Box, Button, Fade, FormControlLabel, Grid, Modal, Radio, Typography } from "@mui/material"
import { CommentInputFieldsGrid, CommentInputModalFormCard, CommentInputModalFormCardContent, CommentInputModalFormTextField, CommentInputModalFormsRadioGroup, CommentInputModalButtonBase, CommentInputStyle, CommentSubmissionStyle, FormHeaderTG } from "./style"
import { useState } from "react";
import createComment from "./createComment";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import sendNotification from "./sendNotification";

const CommentInputModalForm = (  { post, authUser }: any ) => {
    const router = useRouter();
    const [open,setOpen] = useState(false);
    const [formData,setFormData] = useState({ user_id: authUser?.id ,post_id: post?.id ,description: '', is_allow: 0 })

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
        if (authUser?.id !== undefined || post?.post?.id !== undefined) {
            //Update User ID and Post ID
            setFormData((prevFormData) => ({
                ...prevFormData,
                user_id: authUser.id,
                post_id: post.id
            }))
        }
    }

    const handleSubmit = async () => {
        const response = await createComment(formData);
        if (response.data == `Comment Created Successfully`) {
            sendNotification(authUser,post);
            Swal.fire({
                title: `Succcessful Comment Creation`,
                text: `Comment Created Successfully`
            });
            const currentUrl = window.location.pathname;
            router.push(currentUrl);
        }else{
            Swal.fire({
                title: `Unsuccessful Comment Creation`,
                text: `Comment not created`
            });
        }
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <CommentInputModalButtonBase onClick={handleOpen}>
                <Typography variant="h6">
                    Reply to the Post
                </Typography>
            </CommentInputModalButtonBase>
            <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={open}>
                    <Box sx={{ CommentInputStyle }}>
                        <CommentInputModalFormCard>
                            <CommentInputModalFormCardContent>
                                <FormHeaderTG variant="h5">
                                    <strong>Make a Comment</strong>
                                </FormHeaderTG>
                                <CommentInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Enter Comment</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <CommentInputModalFormTextField title="Reply/Comment to the Post Here" placeholder="Enter Comment" name="description" onChange={handleInputChange} />
                                    </Grid>
                                </CommentInputFieldsGrid>
                                <CommentInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="body2"><strong>Allowed Comment to be Displayed?</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <CommentInputModalFormsRadioGroup name="is_allow" onChange={handleInputChange}>
                                            <FormControlLabel label="Yes" value={Number(1)} control={<Radio />}></FormControlLabel>
                                            <FormControlLabel label="No" value={Number(0)} control={<Radio />}></FormControlLabel>
                                        </CommentInputModalFormsRadioGroup>
                                    </Grid>
                                </CommentInputFieldsGrid>
                                <CommentSubmissionStyle>
                                    <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>Submit Comment</Button>
                                </CommentSubmissionStyle>
                            </CommentInputModalFormCardContent>
                        </CommentInputModalFormCard>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default CommentInputModalForm