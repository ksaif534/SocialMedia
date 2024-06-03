'use client'
import { useEffect, useState } from "react";
import { CreateGroupButton, FormHeaderTG, GroupInputFieldsGrid, GroupInputModalFormCard, GroupInputModalFormCardContent, GroupInputModalFormSelect, GroupInputModalFormTextField, GroupInputModalFormsRadioGroup, GroupPostInputStyle, GroupSubmissionStyle } from "./style"
import AddIcon from '@mui/icons-material/Add'
import { Backdrop, Box, Button, Fade, FormControlLabel, Grid, MenuItem, Modal, Radio, Typography } from "@mui/material";
import createGroup from "./createGroup";
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from "../../home/@postInput/style";
import fetchUsers from "../../auth/login/fetchUsers";
import fetchUser from "../../profile/@profileCoverHeading/fetchUser";
import Cookies from "js-cookie";

const GroupInputModalForm = () => {
    const authUserId = Cookies.get("authUserId");
    const [open,setOpen] = useState(false);
    const [formData,setFormData] = useState({ name: '', user_id: 0, description: '', status: 0, group_mods: "" });
    const [fileData,setFileData] = useState({ group_photo: null });
    const [selectedModOptions,setSelectedModOptions] = useState([]);
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState({ id: 0, name: '', email: '', password: '', image: null, phone: 0, is_active: 0 });
    const fData = new FormData();

    useEffect(() => {
        fetchUsers().then((users: any) => setUsers(users));
        fetchUser(authUserId).then((user: any) => setUser(user));
    },[])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (name == 'group_mods') {
            setFormData((prevFormdata) => ({
                ...prevFormdata,
                [name]: selectedModOptions
            }));
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleMultipleSelectChange = (event: any) => {
        setSelectedModOptions(event.target.value);
        handleInputChange(event);
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
        if (fileData) {
            const groupPhotoInput = document.getElementById("group_photo");
            if (groupPhotoInput instanceof HTMLInputElement && groupPhotoInput.type == "file") {
                if (groupPhotoInput.files) {
                    const gp = groupPhotoInput.files[0];
                    fData.append('groupPhoto',gp);
                }
            }
            fData.append("fileObj",JSON.stringify(fileData));
        }
        fData.append("text",JSON.stringify(formData));
        const sessionData = {
            userId: user?.id,
            userName: user?.name
        };
        fData.append("sessionData",JSON.stringify(sessionData));
        const newGroup = await createGroup(fData,user?.id);
        if (Boolean(newGroup.data)) {
            Swal.fire({
                title: `Success`,
                text: `Group Created Successfully`,
                icon: `success`
            });
        }else{
            Swal.fire({
                title: `Failure`,
                text: `Group Not Created`,
                icon: `error`
            });
        }
    }

    return (
        <>
            <CreateGroupButton variant="outlined" onClick={handleOpen}>
                <AddIcon fontSize="medium" />
                Create New Group
            </CreateGroupButton>
            <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
            >
                <Fade in={open}>
                    <Box sx={{ GroupPostInputStyle }}>
                        <GroupInputModalFormCard>
                            <GroupInputModalFormCardContent>
                                <FormHeaderTG variant="h5">
                                    <strong>Create a New Group</strong>
                                </FormHeaderTG>
                                <GroupInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Group Name:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <GroupInputModalFormTextField title="Group Name" placeholder="Enter Group Name" name="name" onChange={handleInputChange} />
                                    </Grid>
                                </GroupInputFieldsGrid>
                                <GroupInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Group Description:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <GroupInputModalFormTextField title="Group Description" placeholder="Enter Group Description" name="description" onChange={handleInputChange} />
                                    </Grid>
                                </GroupInputFieldsGrid>
                                <GroupInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Is it Public?</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <GroupInputModalFormsRadioGroup name="status" onChange={handleInputChange}>
                                            <FormControlLabel label="Yes" value={Number("1")} control={<Radio />} />
                                            <FormControlLabel label="No" value={Number("0")} control={<Radio />} />
                                        </GroupInputModalFormsRadioGroup>
                                    </Grid>
                                </GroupInputFieldsGrid>
                                <GroupInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>Group Cover Photo:</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '100%' }} onChange={handleFileInputChange}>
                                            Group Photo
                                            <VisuallyHiddenInput type="file" name="group_photo" id="group_photo" />
                                        </Button>
                                    </Grid>
                                </GroupInputFieldsGrid>
                                <GroupInputFieldsGrid container spacing={2}>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Typography variant="h6"><strong>If Yes, Select Group Moderators</strong></Typography>
                                    </Grid>
                                    <Grid item md={9} sm={9} xs={12}>
                                        <GroupInputModalFormSelect labelId="group-mod-select-multiple" id="group-mod-select-multiple" name="group_mods" multiple value={selectedModOptions} onChange={handleMultipleSelectChange} renderValue={(selected: any) => selected.join(', ')}>
                                            {
                                                users.map((user: any) => {
                                                    return (
                                                        <MenuItem key={user.id} value={user.id + `-` + user.name}>
                                                            { user.name }
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </GroupInputModalFormSelect>
                                    </Grid>
                                </GroupInputFieldsGrid>
                                <br />
                                <GroupSubmissionStyle>
                                    <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>Create Group</Button>
                                </GroupSubmissionStyle>
                            </GroupInputModalFormCardContent>
                        </GroupInputModalFormCard>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default GroupInputModalForm