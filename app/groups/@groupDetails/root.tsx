'use client'
import { Box, CardMedia, Menu, MenuItem, Tab, Typography } from "@mui/material"
import { DownIconButton, GroupCoverHeadingCard, GroupCoverHeadingDivider, GroupCoverHeadingEndDiv, GroupCoverHeadingStartDiv, GroupCoverHeadingTabWrapperDiv, GroupCoverHeadingTabs, GroupCoverHeadingWrapper, GroupCoverHeadingWrapperDiv, InviteButton, JoinButton } from "./style"
import { useEffect, useState } from "react"
import Discussion from "./@discussion/page"
import Featured from "./@featured/page"
import People from "./@people/page"
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import fetchUser from "../../profile/@profileCoverHeading/fetchUser"
import storeGroupMember from "./storeGroupMember"
import Swal from "sweetalert2"
import fetchGroupMembers from "./fetchGroupMembers"
import leaveGroup from "./leaveGroup"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const GroupHeadingTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
        )}
    </div>
    )
}

const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
}

export const RootComp = (props: any) => {
    const { group } = props;
    const [groupHeadingTabValue,setGroupHeadingTabValue] = useState(0);
    const [anchorEl,setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [user,setUser] = useState({ id: 0, name: '', email: '', password: '', image: null, phone: 0, is_active: 0 });
    const [groupMembers,setGroupMembers] = useState([]);
    let counter = 0;

    useEffect(() => {
        fetchUser(sessionStorage.getItem("authUserId")).then((user: any) => setUser(user));
        fetchGroupMembers().then((groupMembers: any) => setGroupMembers(groupMembers));
    },[])

    const handleJoinedButtonClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    }

    const handleJoinedButtonClose = () => {
        setAnchorEl(null);
    }
    
    const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        setGroupHeadingTabValue(newTabValue);
    }

    const handleGroupJoin = async () => {
        const formData = {
            userId: user?.id,
            userName: user?.name,
            groupId: group?.id
        }
        Swal.fire({
            title: `Group Join Confirmation`,
            text: `Are you sure you want to join the group?`,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showDenyButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const isGroupmember = await storeGroupMember(formData);
                if (Boolean(isGroupmember)) {
                    Swal.fire({
                        title: `Success`,
                        text: `Group Successfully Joined`,
                        icon: `success`
                    });
                }else{
                    Swal.fire({
                        title: `Failure`,
                        text: `Sorry, Could not join group`,
                        icon: `error`
                    });
                }
            }else{
                Swal.fire({
                    title: `Failure`,
                    text: `Sorry, Could not join group`,
                    icon: `error`
                });
            }
        })
    }

    const handleGroupLeave = async () => {
        Swal.fire({
            title: `Group Leave Confirmation`,
            text: `Are you sure you want to leave this group?`,
            icon: `question`,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showDenyButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const groupLeave = await leaveGroup(group?.id,user?.id);
                if (Boolean(groupLeave)) {
                    Swal.fire({
                        title: `Success`,
                        text: `Group Left Successfully`,
                        icon: `success`
                    });
                }else{
                    Swal.fire({
                        title: `Failure`,
                        text: `Sorry, Failed to Leave Group`,
                        icon: `error`
                    });
                }
            }else{
                Swal.fire({
                    title: `Failure`,
                    text: `Sorry, Failed to Leave Group`,
                    icon: `error`
                });
            }
        })
    }

    return (
        <>
            <GroupCoverHeadingWrapper>
                <GroupCoverHeadingCard>
                    <CardMedia image={`images/${group.group_photo}`} title={group.name} sx={{ height: 250 }} />
                </GroupCoverHeadingCard>
                <GroupCoverHeadingWrapperDiv>
                    <GroupCoverHeadingStartDiv>
                        <Typography variant="h5"><strong>{ group.name }</strong></Typography>
                    </GroupCoverHeadingStartDiv>
                    <GroupCoverHeadingEndDiv>
                        {/* <InviteButton variant="contained">
                            <AddIcon fontSize="medium" />
                            <Typography variant="h6">Invite</Typography>
                        </InviteButton> */}
                        {
                            groupMembers.map((groupMember: any, index: number) => {
                                if (groupMember.group_id == group.id && groupMember.user_id == sessionStorage.getItem("authUserId")) {
                                    counter++;
                                }
                                if (counter > 0 && index == groupMembers.length - 1) {
                                    return (
                                        <div key={groupMember.id}>
                                            <JoinButton id="joined-button-basic" aria-controls={ open ? 'basic-menu' : undefined } aria-haspopup="true" aria-expanded={ open ? 'true': undefined } onClick={handleJoinedButtonClick} variant="contained" color="success">
                                                <DoneIcon fontSize="large" />
                                                <Typography variant="h6">Joined</Typography>
                                                <ArrowDropDownIcon fontSize="large" />
                                            </JoinButton>
                                            <Menu 
                                            id="joined-button-basic-menu" 
                                            anchorEl={anchorEl} 
                                            open={open} 
                                            onClose={handleJoinedButtonClose}
                                            MenuListProps={{ 'aria-labelledby': 'joined-button-basic' }}
                                            >
                                                <MenuItem onClick={handleGroupLeave}>
                                                    <CancelPresentationIcon fontSize="large" />
                                                    Leave Group
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    )
                                }
                            })
                        }
                        {
                            (counter == 0) && (
                                <JoinButton variant="contained" color="success" onClick={handleGroupJoin}>
                                    <AddIcon fontSize="medium" />
                                    <Typography variant="h6">Join Group</Typography>
                                </JoinButton>
                            )
                        }
                        {/* <DownIconButton>
                            <KeyboardArrowDownIcon fontSize="medium" />
                        </DownIconButton> */}
                    </GroupCoverHeadingEndDiv>
                </GroupCoverHeadingWrapperDiv>
                <GroupCoverHeadingTabWrapperDiv>
                    <GroupCoverHeadingDivider />
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <GroupCoverHeadingTabs value={groupHeadingTabValue} onChange={handleTabChange} aria-label="group-heading-tabs">
                                <Tab label="Discussion" {...a11yProps(0)} />
                                <Tab label="Featured" {...a11yProps(1)} />
                                <Tab label="People" {...a11yProps(2)} />
                            </GroupCoverHeadingTabs>
                            <GroupHeadingTabPanel value={groupHeadingTabValue} index={0}>
                                <Discussion group={group} />
                            </GroupHeadingTabPanel>
                            <GroupHeadingTabPanel value={groupHeadingTabValue} index={1}>
                                <Featured group={group} />
                            </GroupHeadingTabPanel>
                            <GroupHeadingTabPanel value={groupHeadingTabValue} index={2}>
                                <People group={group} />
                            </GroupHeadingTabPanel>
                        </Box>
                    </Box>
                </GroupCoverHeadingTabWrapperDiv>
            </GroupCoverHeadingWrapper>
        </>
    )
}

export default RootComp