import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Avatar, } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import logo from '../img/logo.png';

const CommonHeader = ({ nav, onBack }) => {
  return (
    <>
      <AppBar elevation={0} style={{ zIndex: 3 }} sx={{ backgroundColor: nav ? '#ffffff' : '#f3f8fa', borderBottomLeftRadius: nav ? 20 : '', borderBottomRightRadius: nav ? 20 : '', boxShadow: nav ? '5px 10px 30px rgba(0, 0, 0, 0.425)' : '', transition: 'ease all 0.5s' }}>
        <Toolbar sx={{ mt: 1, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <Avatar src={logo} sx={{ borderRadius: 0 }} />
            <Box>
              <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pl: 1, lineHeight: '15px' }}>TheKatta <br /> <span style={{ color: 'gray', fontFamily: 'Nunito', }}>Business</span> </Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: 1 }}>
            <IconButton onClick={() => onBack()}>
              <KeyboardBackspaceIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default CommonHeader