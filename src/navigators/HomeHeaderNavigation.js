import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Badge, styled, Typography, Avatar } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import logo from '../img/logo.png';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';

import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';

import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import DynamicFormOutlinedIcon from '@mui/icons-material/DynamicFormOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useHistory } from 'react-router-dom';
import { useIonRouter } from '@ionic/react';

const HeaderNavigation = ({ nav, storeinfoHome }) => {
  let Navigate = useIonRouter();
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const onOpenSideBar = () => {
    setOpenSideBar(true)
  };


  return (
    <>
      <AppBar elevation={0} style={{ zIndex: 3 }} sx={{ backgroundColor: nav ? '#ffffff' : '#f3f8fa', borderBottomLeftRadius: nav ? 20 : '', borderBottomRightRadius: nav ? 20 : '', boxShadow: nav ? '5px 10px 30px rgba(0, 0, 0, 0.425)' : '', transition: 'ease all 0.5s' }}>
        <Toolbar sx={{ mt: 1, mb: 1 }}>
          <Box sx={{ boxShadow: 1, borderRadius: 1, backgroundColor: '#ffffff' }}>
            <IconButton onClick={() => onOpenSideBar()}>
              <MenuIcon sx={{ color: 'gray' }} />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <Avatar src={logo} sx={{ borderRadius: 0 }} />
            <Box>
              <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pl: 1, lineHeight: '15px' }}>TheKatta <br /> <span style={{ color: 'gray', fontFamily: 'Nunito', }}>Business</span> </Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Box>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <CircleNotificationsOutlinedIcon sx={{ color: 'gray' }} />
              </Badge>
            </IconButton>
          </Box> */}
          <Box sx={{ boxShadow: 1, borderRadius: 50, backgroundColor: '#ffffff' }}>
            <IconButton onClick={() => Navigate.push('/ProfileScreen', 'forward', 'push')}>
              <AccountCircleOutlinedIcon sx={{ color: 'gray' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerMenu storeinfoHome={storeinfoHome} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
    </>
  )
}

export default HeaderNavigation;



function DrawerMenu({ openSideBar, setOpenSideBar, storeinfoHome }) {

  const onCloceSideBar = () => {
    setOpenSideBar(false);
  };

  return (
    <>
      <RootStyle>
        <Drawer
          open={openSideBar}
          onClose={onCloceSideBar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, background: 'linear-gradient(to right, #6500d8, #a044ff)', top: 15, left: 15, borderRadius: 2, height: '95%', zIndex: 9 }
          }}
          anchor='left'
        >
          <Box sx={{ p: 1, pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', }}>
              <Box sx={{ backgroundColor: '#f0eaeab0', width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '15px 15px', transform: 'rotate(45deg)', boxShadow: 12 }}>
                <Avatar src='./static/img.png' alt={storeinfoHome?.store_name} sx={{ borderRadius: 1, transform: 'rotate(-45deg)', backgroundColor: 'transparent', color: '#000000', fontFamily: 'Nunito', fontWeight: '900', fontSize: 22 }} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
              <Box>
                <Typography sx={{ textAlign: 'cenetr', color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: 15, }}>{storeinfoHome?.store_name}</Typography>
                <Typography sx={{ textAlign: 'cenetr', color: '#ffffffbd', fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: 12, }}>{storeinfoHome?.category_name}</Typography>
              </Box>
            </Box>
            <Box sx={{ pt: 2 }}>
              <NestedList storeinfoHome={storeinfoHome} onCloceSideBar={onCloceSideBar} />
            </Box>
          </Box>
        </Drawer>
      </RootStyle>
    </>
  );
}

const DRAWER_WIDTH = 280;
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: 'DRAWER_WIDTH',
    zIndex: 9

  }
}));


function NestedList({ onCloceSideBar, storeinfoHome }) {
  let Navigate = useIonRouter();
  const Navigation = sessionStorage.getItem('VendorActiveTabs')
  const [open, setOpen] = React.useState(false);
  const [openOpen, setOpenOpen] = React.useState(false);
  const [discount, setDiscount] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickOpen = () => {
    setOpenOpen(!openOpen);
  };
  const handleClickDiscount = () => {
    setDiscount(!discount);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => { Navigate.push(`/${Navigation}`, 'forward', 'push'); onCloceSideBar() }}>
        <ListItemIcon>
          <HomeOutlinedIcon sx={{ color: '#ffffff' }} />
        </ListItemIcon>
        <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Home</Typography>
      </ListItemButton>

      <ListItemButton onClick={handleClickDiscount}>
        <ListItemIcon>
          <LocalOfferOutlinedIcon sx={{ color: '#ffffff' }} />
        </ListItemIcon>
        <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Discount</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {discount ? <ExpandLess sx={{ color: '#ffffff', float: 'right' }} /> : <ExpandMore sx={{ color: '#ffffff', float: 'right' }} />}
      </ListItemButton>
      <Collapse in={discount} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => { Navigate.push(`/DiscountScreen`, 'forward', 'push'); onCloceSideBar() }}>
            <ListItemIcon>
              <LocalOfferOutlinedIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Set Discount</Typography>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AddBusinessOutlinedIcon sx={{ color: '#ffffff' }} />
        </ListItemIcon>
        <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Marketing</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {open ? <ExpandLess sx={{ color: '#ffffff', float: 'right' }} /> : <ExpandMore sx={{ color: '#ffffff', float: 'right' }} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => { Navigate.push(`/AdvertiseScrees`, 'forward', 'push'); onCloceSideBar() }}>
            <ListItemIcon>
              <StarBorder sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Ads Banner</Typography>
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={() => { Navigate.push(`/DiscountAdvertisementScreen`, 'forward', 'push'); onCloceSideBar() }}>
            <ListItemIcon>
              <StyleOutlinedIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Discount Advertisement</Typography>
          </ListItemButton>

          {/* <ListItemButton sx={{ pl: 4 }} onClick={() => { Navigate.push(`/CouponScreen`, 'forward', 'push'); onCloceSideBar() }}>
            <ListItemIcon>
              <StyleOutlinedIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Coupon</Typography>
          </ListItemButton> */}

          <ListItemButton sx={{ pl: 4 }} onClick={() => { Navigate.push(`/NotificationScreen`, 'forward', 'push'); onCloceSideBar() }}>
            <ListItemIcon>
              <NotificationsActiveOutlinedIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Push Notification</Typography>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => { Navigate.push(`/ReportScreen`, 'forward', 'push'); onCloceSideBar() }}>
        <ListItemIcon>
          <SummarizeOutlinedIcon sx={{ color: '#ffffff' }} />
        </ListItemIcon>
        <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Report</Typography>
      </ListItemButton>

      <ListItemButton onClick={handleClickOpen}>
        <ListItemIcon>
          <LocalActivityOutlinedIcon sx={{ color: '#ffffff' }} />
        </ListItemIcon>
        <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Activity</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {openOpen ? <ExpandLess sx={{ color: '#ffffff', float: 'right' }} /> : <ExpandMore sx={{ color: '#ffffff', float: 'right' }} />}
      </ListItemButton>
      <Collapse in={openOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => { Navigate.push(`/ActivityScreen`, 'forward', 'push', sessionStorage.setItem('VendorActiveTabs', 'activityScreen')); onCloceSideBar() }}>
            <ListItemIcon>
              <DynamicFormOutlinedIcon sx={{ color: '#ffffff' }} />
            </ListItemIcon>
            <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700' }}>Active Order</Typography>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}