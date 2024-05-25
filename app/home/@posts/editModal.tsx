import { useState } from "react";
import { FormHeaderTG, PostEditModalButtonBase, PostInputFieldsGrid, PostInputModalFormCard, PostInputModalFormCardContent, PostInputModalFormTextField, PostInputStyle, PostInputModalFormSelect, PostInputModalFormsRadioGroup } from "./style"
import { Backdrop, Box, Button, Fade, FormControlLabel, Grid, MenuItem, Modal, Radio, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { PostSubmissionStyle, VisuallyHiddenInput } from "../@postInput/style";
import updatePost from "./updatePost";
import Swal from "sweetalert2";

const PostEditModalForm = ({ post }: any) => {
    const [open,setOpen] = useState(false);
    const [formData,setFormData] = useState({ user_id: post.user_id, group_id: post.group_id, title: post.title, sub_title: post.sub_title, description: post.description, type: post.type, tags: post.tags, is_share: post.is_share, video_post_url: post.video_post_url, is_group: post.is_group  });
    const [fileData,setFileData] = useState({ figure: post.figure, thumbnail: post.thumbnail });
    const fData = new FormData();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
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
        }))
    }

    const handleSubmit = async () => {
        if (fileData) {
            const figureInput = document.getElementById("figure");
            if (figureInput instanceof HTMLInputElement && figureInput.type == 'file') {
                if (figureInput.files) {
                    const figure = figureInput.files[0];
                    fData.append("figure",figure);
                }
            }
            const thumbInput = document.getElementById("thumbnail");
            if(thumbInput instanceof HTMLInputElement && thumbInput.type == 'file'){
                if (thumbInput.files) {
                    const thumb = thumbInput.files[0];
                    fData.append("thumbnail",thumb);
                }
            }
            fData.append("fileObj",JSON.stringify(fileData));
        }
        //Append Text/Other Inputs
        fData.append('text',JSON.stringify(formData));
        const bool = await updatePost(fData,post);
        if(Boolean(bool)) {
            Swal.fire(`Post Updated Successfully`);
        }else{
            Swal.fire(`Post Not Updated. Try Again`);
        }
    }

    return (
        <>
            <PostEditModalButtonBase onClick={handleOpen}>
                <Typography variant="h6">
                    Edit Post
                </Typography>
            </PostEditModalButtonBase>
            <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={open}>
                    <Box sx={{ PostInputStyle }}>
                        <PostInputModalFormCard>
                            <PostInputModalFormCardContent>
                                <FormHeaderTG variant="h6">
                                    <strong>Edit Your Post</strong>
                                </FormHeaderTG>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6">
                                            <strong>Edit Post Title:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormTextField title="Edit Your Post Title" name="title" value={formData.title} onChange={handleInputChange} />
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6">
                                            <strong>Edit Post SubTitle:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormTextField title="Edit Your Post Subtitle" name="sub_title" value={formData.sub_title} onChange={handleInputChange} />
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6">
                                            <strong>Edit Post Description:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormTextField title="Edit/Update Post Description" name="description" value={formData.description} onChange={handleInputChange} />
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6">
                                            <strong>Edit Post Type:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormSelect labelId="post-type-select" id="post-type" name="type" value={Number(formData.type)} onChange={handleInputChange}>
                                            <MenuItem value={1}>Text</MenuItem>
                                            <MenuItem value={2}>Video</MenuItem>
                                        </PostInputModalFormSelect>
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6">
                                            <strong>Tags:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormTextField title="Edit/Update Post Tags" name="tags" value={formData.tags} onChange={handleInputChange} />
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6">
                                            <strong>Is it Shareable?:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <PostInputModalFormsRadioGroup name="is_share" value={Number(formData.is_share)} onChange={handleInputChange}>
                                            <FormControlLabel label="Yes" value={Number("1")} control={<Radio />} />
                                            <FormControlLabel label="No" value={Number("0")} control={<Radio />} />
                                        </PostInputModalFormsRadioGroup>
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6">
                                            <strong>Figure:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <Button component='label' variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '100%' }} onChange={handleFileInputChange}>
                                            Upload Figure
                                            <VisuallyHiddenInput type="file" name="figure" id="figure" />
                                        </Button>
                                    </Grid>
                                </PostInputFieldsGrid>
                                <PostInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6">
                                            <strong>Thumbnail:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <Button component='label' variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '100%' }} onChange={handleFileInputChange}>
                                            Upload Thumbnail:
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
                                    <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>Sumit Updated Post Data</Button>
                                </PostSubmissionStyle>
                            </PostInputModalFormCardContent>
                        </PostInputModalFormCard>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default PostEditModalForm