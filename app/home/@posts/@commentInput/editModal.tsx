import { Backdrop, Box, Button, Fade, FormControlLabel, Grid, IconButton, Modal, Radio, Typography } from "@mui/material"
import { CommentInputFieldsGrid, CommentInputModalFormCard, CommentInputModalFormCardContent, CommentInputModalFormTextField, CommentInputModalFormsRadioGroup, CommentInputStyle, CommentSubmissionStyle, FormHeaderTG } from "./style"
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import updateComment from "./updateComment";
import React from "react";

export const CommentEditModalFormForUnitTesting = () => {
    return (
        <>
            <IconButton title="Edit Comment">
                <EditIcon />
            </IconButton>
            <Modal open={true} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={true}>
                    <Box sx={{ CommentInputStyle }}>
                        <CommentInputModalFormCard>
                            <CommentInputModalFormCardContent>
                                <FormHeaderTG variant="h5">
                                    Edit Your Comment
                                </FormHeaderTG>
                                <CommentInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Edit Comment:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <CommentInputModalFormTextField title="Edit your Comment" name="description" />
                                    </Grid>
                                </CommentInputFieldsGrid>
                                <CommentInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="body2">
                                            <strong>Allow Comment to be Displayed?:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <CommentInputModalFormsRadioGroup name="is_allow" value="1">
                                            <FormControlLabel label="Yes" value={Number(0)} control={<Radio />}></FormControlLabel>
                                            <FormControlLabel label="No" value={Number(1)} control={<Radio />}></FormControlLabel>
                                        </CommentInputModalFormsRadioGroup>
                                    </Grid>
                                </CommentInputFieldsGrid>
                                <CommentSubmissionStyle>
                                    <Button variant="contained" color="success" type="submit">Submit Comment</Button>
                                </CommentSubmissionStyle>
                            </CommentInputModalFormCardContent>
                        </CommentInputModalFormCard>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

const CommentEditModalForm = ({comment}: any) => {
    const [open,setOpen] = useState(false);
    const [editFormData,setEditFormData] = useState({ user_id: comment.user_id, post_id: comment.post_id, description: comment.description, is_allow: comment.is_allow });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setEditFormData((prevEditFormData) => ({
            ...prevEditFormData,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        const updateCommentBool = await updateComment(editFormData,comment);
        if (Boolean(updateCommentBool)) {
            Swal.fire(`Comment Updated Successfully`)
        }else{
            Swal.fire(`Comment Not Updated`);
        }
    }

    return (
        <>
            <IconButton onClick={handleOpen} title="Edit Comment">
                <EditIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={open}>
                    <Box sx={{ CommentInputStyle }}>
                        <CommentInputModalFormCard>
                            <CommentInputModalFormCardContent>
                                <FormHeaderTG variant="h5">
                                    Edit Your Comment
                                </FormHeaderTG>
                                <CommentInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Edit Comment:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <CommentInputModalFormTextField title="Edit your Comment" value={editFormData.description} name="description" onChange={handleInputChange} />
                                    </Grid>
                                </CommentInputFieldsGrid>
                                <CommentInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="body2">
                                            <strong>Allow Comment to be Displayed?:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <CommentInputModalFormsRadioGroup name="is_allow" value={Number(editFormData.is_allow)} onChange={handleInputChange}>
                                            <FormControlLabel label="Yes" value={Number(0)} control={<Radio />}></FormControlLabel>
                                            <FormControlLabel label="No" value={Number(1)} control={<Radio />}></FormControlLabel>
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

export default CommentEditModalForm