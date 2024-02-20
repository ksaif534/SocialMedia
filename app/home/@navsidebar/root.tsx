'use client'
import React, { useEffect } from 'react'
import { RenderMenu, RenderMobileMenu, RenderMsgMenu, RenderNotifMenu, getAuthUserState, getUsersState } from './menu';
import { getAnchorState, getMsgAnchorState, getNotifAnchorState } from './menu';
import { initOpenState, authState, useThemeHook } from './misc';
import AppBarComp from './appbar';
import DrawerComp from './drawer';
import { useRouter } from 'next/navigation';

const RootComp = () => {
    const router = useRouter();
    const theme = useThemeHook();
    const [anchorEl, setAnchorEl] = getAnchorState(null);
    const [msgAnchorEl, setMsgAnchorEl] = getMsgAnchorState(null);
    const [notifAnchorEl,setNotifAnchorEl] = getNotifAnchorState(null);
    const [open, setOpen] = initOpenState(false);
    const [auth,setAuth] = authState(true);

    useEffect(() => {
        if (sessionStorage.length > 0) {
            if (sessionStorage.getItem("authUser") == '' || sessionStorage.getItem("sessionToken") == '') {
                //Session Expired
                router.push(`/auth/login`);
            }    
        }else{
            //Session Expired
            router.push(`/auth/login`);
        }
    },[])

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