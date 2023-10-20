'use client'
import { Box, Button, Card, CardMedia, Divider, IconButton, Tab, Tabs, Typography, styled } from "@mui/material"
import React, { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Discussion from "./@discussion/page";
import Featured from "./@featured/page";
import People  from "./@people/page";

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

const GroupCoverHeadingWrapper = styled('div')(({theme}) => ({
    backgroundColor: 'rgba(128,128,128,0.3)',
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
}))

const GroupCoverHeadingCard = styled(Card)(({theme}) => ({
    width: '90%',
    marginLeft: theme.spacing(7),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
        marginLeft: theme.spacing(5)
    },
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        marginLeft: theme.spacing(2)
    },
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        marginLeft: theme.spacing(2)
    }
}))

const GroupCoverHeadingWrapperDiv = styled('div')(({theme}) => ({
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        display: 'inline-block',
    }
}))

const GroupCoverHeadingStartDiv = styled('div')(({theme}) => ({
    marginLeft: theme.spacing(4),
    justifyContent: 'left',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'inline-block'
    }
}))

const GroupCoverHeadingEndDiv = styled('div')(({theme}) => ({
    marginTop: theme.spacing(-4),
    marginRight: theme.spacing(4),
    justifyContent: 'right',
    alignItems: 'right',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(4),
        display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(4),
        display: 'inline-block'
    }
}))

const InviteButton = styled(Button)(({theme}) => ({
    marginRight: theme.spacing(2),
}))

const DownIconButton = styled(IconButton)(({theme}) => ({
    backgroundColor: 'rgba(128,128,128,0.5)',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)'
    },
    [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(-2)
    },
    [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(-2)
    }
}))

const GroupCoverHeadingDivider = styled(Divider)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#ffffff'
}))

const GroupCoverHeadingTabWrapperDiv = styled('div')(({theme}) => ({
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4)
}))

const GroupCoverHeadingTabs = styled(Tabs)(({theme}) => ({
    backgroundColor: 'rgba(0,255,255,0.6)',
    borderRadius: theme.spacing(1),
    color: 'rgba(0,0,0,0.7)',
    '&:hover': {
        color: 'rgba(0,0,0,1)',
    }
}))

const GroupDetails = () => {
    const [groupHeadingTabValue,setGroupHeadingTabValue] = useState(0);
    
    const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        setGroupHeadingTabValue(newTabValue);
    }

    return (
        <>
            <GroupCoverHeadingWrapper>
                <GroupCoverHeadingCard>
                    <CardMedia image="/images/circular-teaching-system.jpeg" title="Circular Teaching System" sx={{ height: 250 }} />
                </GroupCoverHeadingCard>
                <GroupCoverHeadingWrapperDiv>
                    <GroupCoverHeadingStartDiv>
                        <Typography variant="h5"><strong>Circular Teaching System</strong></Typography>
                    </GroupCoverHeadingStartDiv>
                    <GroupCoverHeadingEndDiv>
                        <InviteButton variant="outlined">
                            <AddIcon fontSize="medium" />
                            <Typography variant="h6">Invite</Typography>
                        </InviteButton>
                        <DownIconButton>
                            <KeyboardArrowDownIcon fontSize="medium" />
                        </DownIconButton>
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
                                <Discussion />
                            </GroupHeadingTabPanel>
                            <GroupHeadingTabPanel value={groupHeadingTabValue} index={1}>
                                <Featured />
                            </GroupHeadingTabPanel>
                            <GroupHeadingTabPanel value={groupHeadingTabValue} index={2}>
                                <People />
                            </GroupHeadingTabPanel>
                        </Box>
                    </Box>
                </GroupCoverHeadingTabWrapperDiv>
            </GroupCoverHeadingWrapper>
        </>
    )
}

export default GroupDetails