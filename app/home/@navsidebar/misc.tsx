'use client'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles';

export const initOpenState = (initState: any) => {
    const [open,setOpen] = useState(initState);
    return [open,setOpen];
}

export const authState = (initState: any) => {
    const [auth,setAuth] = useState(initState);
    return [auth,setAuth];
}

export const useThemeHook = () => {
    const theme = useTheme();
    return theme;
}

