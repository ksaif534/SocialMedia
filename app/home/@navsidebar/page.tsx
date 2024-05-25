import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import RootComp from './root';

const NavSideBar = (props: any) => {
  const { page } = props;

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <CssBaseline />
      <RootComp page={page} />
    </Box>
  );
}

export default NavSideBar
