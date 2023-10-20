import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import RootComp from './root';

const NavSideBar = () => {
  
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <CssBaseline />
      <RootComp />
    </Box>
  );
}

export default NavSideBar
