'use client'
import React, { useState } from 'react'
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VideocamIcon from '@mui/icons-material/Videocam';
import GroupsIcon from '@mui/icons-material/Groups';
import { DrawerHeader, Drawer } from './style';
import { useRouter } from 'next/navigation';

const DrawerComp = (props: any) => {
    const router = useRouter();
    const { open, setOpen, theme } = props;

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const handleDrawerListItemClick = (index: number) => {
        if (index == 0) {
            //Home
            router.push(`/home`);
        }else{
            //Profile
            router.push(`/profile`);
        }
    }

    const handleDrawerVideoPostsClick = () => {

    }

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {['Home', 'Profile'].map((text, index: number) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                        onClick={() => handleDrawerListItemClick(index)}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        {index % 2 === 0 ? <HomeIcon /> : <PersonOutlineIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {['See All Groups'].map((text,index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                        {index % 2 === 0 ? <GroupsIcon /> : <HomeIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
    )
}

export default DrawerComp
