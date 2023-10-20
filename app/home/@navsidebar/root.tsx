'use client'
import React from 'react'
import { RenderMenu, RenderMobileMenu, RenderMsgMenu, RenderNotifMenu } from './menu';
import { getAnchorState, getMsgAnchorState, getNotifAnchorState } from './menu';
import { initOpenState, authState, useThemeHook } from './misc';
import AppBarComp from './appbar';
import DrawerComp from './drawer';

const RootComp = () => {
    const theme = useThemeHook();
    const [anchorEl, setAnchorEl] = getAnchorState(null);
    const [msgAnchorEl, setMsgAnchorEl] = getMsgAnchorState(null);
    const [notifAnchorEl,setNotifAnchorEl] = getNotifAnchorState(null);
    const [open, setOpen] = initOpenState(false);
    const [auth,setAuth] = authState(true);

    return (
        <>
            <AppBarComp anchorEl={anchorEl} setAnchorEl={setAnchorEl} msgAnchorEl={msgAnchorEl} setMsgAnchorEl={setMsgAnchorEl} notifAnchorEl={notifAnchorEl} setNotifAnchorEl={setNotifAnchorEl} open={open} setOpen={setOpen} auth={auth} setAuth={setAuth} />
            <DrawerComp open={open} setOpen={setOpen} theme={theme} />
            <RenderMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <RenderMobileMenu />
            <RenderMsgMenu msgAnchorEl={msgAnchorEl} setMsgAnchorEl={setMsgAnchorEl} />
            <RenderNotifMenu notifAnchorEl={notifAnchorEl} setNotifAnchorEl={setNotifAnchorEl} />
        </>
    )
} 

export default RootComp