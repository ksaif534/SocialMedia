'use client'
import { Box, CardMedia, Tab, Typography } from "@mui/material"
import { DownIconButton, GroupCoverHeadingCard, GroupCoverHeadingDivider, GroupCoverHeadingEndDiv, GroupCoverHeadingStartDiv, GroupCoverHeadingTabWrapperDiv, GroupCoverHeadingTabs, GroupCoverHeadingWrapper, GroupCoverHeadingWrapperDiv, InviteButton } from "./style"
import { useState } from "react"
import Discussion from "./@discussion/page"
import Featured from "./@featured/page"
import People from "./@people/page"
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

export const RootComp = () => {
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

export default RootComp