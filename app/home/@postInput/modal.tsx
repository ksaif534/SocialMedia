import { Backdrop, Box, Fade, Grid, Modal, Typography, MenuItem, FormControlLabel, Radio, Button } from "@mui/material"
import { useState, useEffect } from "react";
import { PostInputModalButtonBase, PostInputStyle, PostInputModalFormCard, PostInputModalFormCardContent, PostInputFieldsGrid , PostInputModalFormTextField, FormHeaderTG, PostInputModalFormSelect, PostInputModalFormsRadioGroup, VisuallyHiddenInput, PostSubmissionStyle } from "./style";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import createPost from "./createPost";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const PostInputModalForm = (props: any) => {
    const { group } = props;
    const authUserId = Cookies.get("authUserId");
    let groupId: any;
    if (group !== undefined) {
        groupId = group?.id;
    }else{
        groupId = 1;
    }
    const [open,setOpen] = useState(false);
    const [formData,setFormData] = useState({ title: "", sub_title: "", description: "", type: 1, tags: "", is_share: 0, video_post_url: "", user_id: 1, group_id: groupId, is_group: 0 });
    const [fileData,setFileData] = useState({ figure: null, thumbnail: null });
    const fData = new FormData();

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleFileInputChange = (event: any) => {
        const { name } = event.target;
        const file = event.target.files[0];
        const fileObj = {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.name,
            size: file.size,
            type: file.type,
            webkitRelativePath: file.webkitRelativePath
        }
        setFileData((prevFileData) => ({
            ...prevFileData,
            [name]: fileObj 
        }));
    }

    const handleSubmit = async () => {
        //Append File
        if(fileData){
            const figureInput = document.getElementById('figure');
            if (figureInput instanceof HTMLInputElement && figureInput.type == 'file') {
                if (figureInput.files) {
                    const figure = figureInput.files[0];
                    fData.append("figure",figure);
                }
            }
            const thumbInput = document.getElementById('thumbnail');
            if (thumbInput instanceof HTMLInputElement && thumbInput.type == 'file') {
                if (thumbInput.files) {
                    const thumbnail = thumbInput.files[0];
                    fData.append("thumbnail",thumbnail);
                }
            }
            fData.append('fileObj',JSON.stringify(fileData));
        }
        //Append Text/Other Inputs
        fData.append('text',JSON.stringify(formData));
        fData.append('sessionData',JSON.stringify(authUserId));
        const newPostBool = await createPost(fData);
        if (Boolean(newPostBool)) {
            Swal.fire({
                title: `Succuesful Post Creation`,
                text: `Post Created Successfully`
            });
        }else{
            Swal.fire({
                title: `Unsuccessful Post Creation`,
                text: `Post not created`
            });
        }
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <>
            <PostInputModalButtonBase onClick={handleOpen}>
                <Typography variant="h6">Whats on your mind?</Typography>
            </PostInputModalButtonBase>
            <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={open}>
                    <Box sx={{ PostInputStyle }}>
                        <PostInputModalFormCard>
                            <PostInputModalFormCardContent>
                                <FormHeaderTG variant="h5">
                                    <strong>Create a Post</strong>
                                </FormHeaderTG>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Post Title:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormTextField title="Enter Post Title" placeholder="Post Title" name="title" value={formData.title} onChange={handleInputChange} />
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Post Subtitle:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormTextField title="Enter Post Subttile" placeholder="Post Subtitle" name="sub_title" value={formData.sub_title} onChange={handleInputChange} />
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Post Description:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormTextField title="Enter Post Description" placeholder="Post Description" name="description" value={formData.description} onChange={handleInputChange} />
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={3}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Post Type:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormSelect labelId="post-type-select" id="post-type" name="type" value={Number(formData.type)} onChange={handleInputChange}>
                                            <MenuItem value={1}>Text</MenuItem>
                                            <MenuItem value={2}>Video</MenuItem>
                                        </PostInputModalFormSelect>
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={3}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Tags:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormTextField title="Enter Post Tags" placeholder="Post Tags" name="tags" value={formData.tags} onChange={handleInputChange} />
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Is it shareable?</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormsRadioGroup name="is_share" value={formData.is_share} onChange={handleInputChange}>
                                            <FormControlLabel label="Yes" value={Number("1")} control={<Radio />} />
                                            <FormControlLabel label="No" value={Number("0")} control={<Radio />} />
                                        </PostInputModalFormsRadioGroup>
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Figure/Video:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '100%' }} onChange={handleFileInputChange}>
                                            Upload Figure/Video
                                            <VisuallyHiddenInput type="file" name="figure" id="figure" />
                                        </Button>
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Thumbnail:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '100%' }} onChange={handleFileInputChange}>
                                            Upload Thumbnail
                                            <VisuallyHiddenInput type="file" name="thumbnail" id="thumbnail" />
                                        </Button>
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Video Post URL(If Any):</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormTextField title="Enter Video Post URL" placeholder="Video Post URL" name="video_post_url" value={formData.video_post_url} onChange={handleInputChange} />
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Is it a Group Post?</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormsRadioGroup name="is_group" value={formData.is_group} onChange={handleInputChange}>
                                            <FormControlLabel label="Yes" value={Number("1")} control={<Radio />} />
                                            <FormControlLabel label="No" value={Number("0")} control={<Radio />} />
                                        </PostInputModalFormsRadioGroup>
                                    </Grid>
                                </PostInputFieldsGrid>
                                <br />
                                <PostSubmissionStyle>
                                    <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>Submit Post</Button>
                                </PostSubmissionStyle>
                            </PostInputModalFormCardContent>
                        </PostInputModalFormCard>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default PostInputModalForm