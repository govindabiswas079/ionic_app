/* import React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Container } from '@mui/material';
import logo from '../img/logo.png';
import { QRCode } from 'react-qrcode-logo';

import Home from '@mui/icons-material/HomeOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { useIonRouter } from "@ionic/react";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const BottomNavigation = () => {
  let navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [activeTabs, setActiveTabs] = React.useState();
  const [homeScreen, setHomeScreen] = React.useState(null);
  const [activityScreen, setActivityScreen] = React.useState(null);
  const [transactionScreen, setTransactionScreen] = React.useState(null);
  const [accountScreen, setAccountScreen] = React.useState(null);
  const [storeinfo, setStoreinfo] = React.useState({});
  const [qrString, setQrString] = React.useState({});

  var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });
  var config = {
    method: 'POST',
    url: sanitizeUrl(`http://codefeverllp.com/katta/API.svc/vendorinfo`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vinfo
  };
  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setStoreinfo(response.data.storeinfo);
          setQrString(response.data.vendorinfo);
        }

      })
      .catch(function (err) {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }, []);


  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {

    switch (activeTabs) {
      case 'HomeScreen':
        setHomeScreen(true);
        setAccountScreen(false);
        setTransactionScreen(false)
        setActivityScreen(false)
        sessionStorage.setItem('VendorActiveTabs', activeTabs)
        navigate.push('/HomeScreen');
        break;
      case 'activityScreen':
        setActivityScreen(true);
        setAccountScreen(false);
        setHomeScreen(false);
        setTransactionScreen(false);
        sessionStorage.setItem('VendorActiveTabs', activeTabs)
        navigate.push('/activityScreen');
        break;
      case 'transactionScreen':
        setTransactionScreen(true);
        setAccountScreen(false);
        setHomeScreen(false);
        setActivityScreen(false);
        sessionStorage.setItem('VendorActiveTabs', activeTabs)
        navigate.push('/transactionScreen');
        break;
      case 'accountScreen':
        setAccountScreen(true);
        setHomeScreen(false)
        setTransactionScreen(false)
        setActivityScreen(false)
        sessionStorage.setItem('VendorActiveTabs', activeTabs)
        navigate.push('/accountScreen');
        break;
      default:

        break;
    }
  }, [activeTabs, navigate])

  React.useEffect(() => {
    const tabs = sessionStorage.getItem('VendorActiveTabs');

    if (tabs === 'HomeScreen') {
      setHomeScreen(true);
    } else {
      setHomeScreen(false);
    }

    if (tabs === 'activityScreen') {
      setActivityScreen(true);
    } else {
      setActivityScreen(false);
    }

    if (tabs === 'transactionScreen') {
      setTransactionScreen(true);
    } else {
      setTransactionScreen(false);
    }

    if (tabs === 'accountScreen') {
      setAccountScreen(true);
    } else {
      setAccountScreen(false);
    }


    if (tabs === null) {
      sessionStorage.setItem('VendorActiveTabs', 'HomeScreen')
      if (tabs === 'HomeScreen') {
        setHomeScreen(true);
      } else {
        setHomeScreen(false);
      }
    }
  }, []);

  React.useEffect(() => {
    if (location.pathname === '/HomeScreen') {
      setHomeScreen(true);
      setAccountScreen(false);
      setTransactionScreen(false)
      setActivityScreen(false)
    } else {
      if (location.pathname === '/activityScreen') {
        setActivityScreen(true);
        setAccountScreen(false);
        setHomeScreen(false);
        setTransactionScreen(false);
      } else {
        if (location.pathname === '/TransactionScreen') {
          setTransactionScreen(true);
          setAccountScreen(false);
          setHomeScreen(false);
          setActivityScreen(false);
        } else {
          if (location.pathname === '/AccountScreen') {
            setAccountScreen(true);
            setHomeScreen(false)
            setTransactionScreen(false)
            setActivityScreen(false)
          } else {

          }
        }
      }
    }
  })

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: '#ffffff', borderTopLeftRadius: 20, borderTopRightRadius: 20, boxShadow: '5px 10px 30px rgba(0, 0, 0, 0.425)', transition: 'ease all 0.5s', zIndex: 3 }}>
        <Toolbar style={{ height: '60px' }}>
          <IconButton onClick={() => setActiveTabs('HomeScreen')} color="inherit" sx={{ flexDirection: 'column' }}>
            <Home sx={{ color: homeScreen ? '#6500d8' : '#000000', fontSize: '18px' }} />
            <Typography sx={{ fontSize: 10, color: homeScreen ? '#6500d8' : '#000000', fontFamily: 'Nunito', fontWeight: '500' }}>Home</Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={() => setActiveTabs('activityScreen')} color="inherit" sx={{ flexDirection: 'column' }}>
            <LocalOfferOutlinedIcon sx={{ color: activityScreen ? '#6500d8' : '#000000', fontSize: '18px' }} />
            <Typography sx={{ fontSize: 10, color: activityScreen ? '#6500d8' : '#000000', fontFamily: 'Nunito', fontWeight: '500' }}>Activity</Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1.9 }} />

          <Box sx={{
            width: '60px',
            height: '60px',
            borderRadius: '20px 20px',
            backgroundColor: '#6500d8',
            position: 'absolute',
            zIndex: 1,
            top: -12,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            boxShadow: 3,
            alignItems: 'center',
            lineHeight: '56px',
            margin: '0px auto 0 auto',
            
          }} onClick={handleClickOpen}>

            
            <lord-icon
              src="https://cdn.lordicon.com/jkzrgmvk.json"
              trigger="loop"
              colors="primary:#eee966,secondary:#ffffff,tertiary:#4bb3fd,quaternary:#4030e8"
              style={{ width: '150px', height: '150px' }}>
            </lord-icon>
          </Box>

          <Box sx={{ flexGrow: 1.9 }} />
          <IconButton onClick={() => setActiveTabs('transactionScreen')} color="inherit" sx={{ flexDirection: 'column' }}>
            <ManageSearchIcon sx={{ color: transactionScreen ? '#6500d8' : '#000000', fontSize: '18px' }} />
            <Typography sx={{ fontSize: 10, color: transactionScreen ? '#6500d8' : '#000000', fontFamily: 'Nunito', fontWeight: '500' }}>History</Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={() => setActiveTabs('accountScreen')} color="inherit" sx={{ flexDirection: 'column' }}>
            <AccountBalanceWalletOutlinedIcon sx={{ color: accountScreen ? '#6500d8' : '#000000', fontSize: '18px' }} />
            <Typography sx={{ fontSize: 10, color: accountScreen ? '#6500d8' : '#000000', fontFamily: 'Nunito', fontWeight: '500' }}>Account</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
        sx={{ width: '100%' }}
        onClose={handleClose}
        keepMounted
        fullWidth
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 1 }}>
          <Avatar src={logo} sx={{ borderRadius: 0 }} />
          <Box>
            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pl: 1, lineHeight: '15px' }}>TheKatta <br /> <span style={{ color: 'gray', fontFamily: 'Nunito', }}>Business</span> </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
          <Avatar src={'/static/images/avatar/3.jpg'} alt={storeinfo?.store_name} sx={{ borderRadius: 1 }} />
        </Box>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, pt: 1 }}>{storeinfo?.store_name}</Typography>

        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3, pb: 3, border: '1px solid #000000', m: 1, borderRadius: 1, boxShadow: 3 }}>

            <QRCode
              value={qrString?.qrstring}
              ecLevel='H'
              size={200}
              qrStyle='dots'
              bgColor='#FFFFFF'
              fgColor='#000000'
              enableCORS={true}
              logoImage={logo}
              eyeRadius={[
                {
                  outer: [10, 10, 0, 10],
                  inner: [0, 10, 10, 10],
                },
                [10, 10, 10, 0],
                [10, 0, 10, 10],
              ]}
            />

          </Box>
        </Container>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 12, pt: 1, pb: 1, color: 'gray' }}>Scan and get discount with TheKatta app</Typography>
      </Dialog>
    </React.Fragment>
  )
}

export default BottomNavigation;
 */























import React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, IconButton, styled, Typography, Avatar, Container } from '@mui/material';
import logo from '../img/logo.png';
import { QRCode } from 'react-qrcode-logo';
import Home from '@mui/icons-material/HomeOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { useIonRouter } from "@ionic/react";
import { ApiRequestUrl } from '../ApiRequest';
import { useLocation } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const BottomNavigation = () => {
  let navigate = useIonRouter();
  let location = useLocation()
  const vendor_id = localStorage.getItem('vendor_id');
  const VendorActiveTabs = sessionStorage.getItem('VendorActiveTabs');
  const [activeTabs, setActiveTabs] = React.useState(VendorActiveTabs === null ? 'HomeScreen' : VendorActiveTabs);
  const [homeScreen, setHomeScreen] = React.useState(null);
  const [activityScreen, setActivityScreen] = React.useState(null);
  const [transactionScreen, setTransactionScreen] = React.useState(null);
  const [accountScreen, setAccountScreen] = React.useState(null);
  const [storeinfo, setStoreinfo] = React.useState({});
  const [qrString, setQrString] = React.useState({});

  var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });
  var config = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/vendorinfo`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vinfo
  };
  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setStoreinfo(response.data.storeinfo);
          setQrString(response.data.vendorinfo);
        }

      })
      .catch(function (err) {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }, []);


  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    const controller = new AbortController();

    if (location.pathname === '/HomeScreen') {
      sessionStorage.setItem('VendorActiveTabs', 'HomeScreen');
      setHomeScreen(true);
      setAccountScreen(false);
      setTransactionScreen(false)
      setActivityScreen(false)
    } else {
      if (location.pathname === '/ActivityScreen') {
        sessionStorage.setItem('VendorActiveTabs', 'ActivityScreen');
        setActivityScreen(true);
        setAccountScreen(false);
        setHomeScreen(false);
        setTransactionScreen(false);
      } else {
        if (location.pathname === '/TransactionScreen') {
          sessionStorage.setItem('VendorActiveTabs', 'TransactionScreen');
          setTransactionScreen(true);
          setAccountScreen(false);
          setHomeScreen(false);
          setActivityScreen(false);
        } else {
          if (location.pathname === '/AccountScreen') {
            sessionStorage.setItem('VendorActiveTabs', 'AccountScreen');
            setAccountScreen(true);
            setHomeScreen(false)
            setTransactionScreen(false)
            setActivityScreen(false)
          } else {

          }
        }
      }
    }
    return () => controller.abort();
  })

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: '#ffffff', borderTopLeftRadius: 20, borderTopRightRadius: 20, boxShadow: '5px 10px 30px rgba(0, 0, 0, 0.425)', transition: 'ease all 0.5s', zIndex: 3 }}>
        <Toolbar style={{ height: '60px' }}>
          <IconButton onClick={() => { sessionStorage.setItem('VendorActiveTabs', 'HomeScreen'); navigate.push('/HomeScreen', 'forward', 'push') }} color="inherit" sx={{ flexDirection: 'column' }}>
            <Home sx={{ color: activeTabs === 'HomeScreen' ? '#6500d8' : '#000000', fontSize: '18px' }} />
            <Typography sx={{ fontSize: 10, color: activeTabs === 'HomeScreen' ? '#6500d8' : '#000000', fontFamily: 'Nunito', fontWeight: '500' }}>Home</Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={() => { sessionStorage.setItem('VendorActiveTabs', 'ActivityScreen'); navigate.push('/ActivityScreen', 'forward', 'push') }} color="inherit" sx={{ flexDirection: 'column' }}>
            <LocalOfferOutlinedIcon sx={{ color: activeTabs === 'ActivityScreen' ? '#6500d8' : '#000000', fontSize: '18px' }} />
            <Typography sx={{ fontSize: 10, color: activeTabs === 'ActivityScreen' ? '#6500d8' : '#000000', fontFamily: 'Nunito', fontWeight: '500' }}>Activity</Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1.9 }} />

          <Box sx={{
            width: '60px',
            height: '60px',
            borderRadius: '20px 20px',
            backgroundColor: '#6500d8',
            position: 'absolute',
            zIndex: 1,
            top: -12,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            boxShadow: 3,
            alignItems: 'center',
            lineHeight: '56px',
            margin: '0px auto 0 auto',

          }} onClick={handleClickOpen}>


            <lord-icon
              src="https://cdn.lordicon.com/jkzrgmvk.json"
              trigger="loop"
              colors="primary:#eee966,secondary:#ffffff,tertiary:#4bb3fd,quaternary:#4030e8"
              style={{ width: '150px', height: '150px' }}>
            </lord-icon>
          </Box>

          <Box sx={{ flexGrow: 1.9 }} />
          <IconButton onClick={() => { sessionStorage.setItem('VendorActiveTabs', 'TransactionScreen'); navigate.push('/TransactionScreen', 'forward', 'push') }} color="inherit" sx={{ flexDirection: 'column' }}>
            <ManageSearchIcon sx={{ color: activeTabs === 'TransactionScreen' ? '#6500d8' : '#000000', fontSize: '18px' }} />
            <Typography sx={{ fontSize: 10, color: activeTabs === 'TransactionScreen' ? '#6500d8' : '#000000', fontFamily: 'Nunito', fontWeight: '500' }}>History</Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={() => { sessionStorage.setItem('VendorActiveTabs', 'AccountScreen'); navigate.push('/AccountScreen', 'forward', 'push') }} color="inherit" sx={{ flexDirection: 'column', }}>
            <AccountBalanceWalletOutlinedIcon sx={{ color: activeTabs === 'AccountScreen' ? '#6500d8' : '#000000', fontSize: '18px' }} />
            <Typography sx={{ fontSize: 10, color: activeTabs === 'AccountScreen' ? '#6500d8' : '#000000', fontFamily: 'Nunito', fontWeight: '500' }}>Account</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
        sx={{ width: '100%' }}
        onClose={handleClose}
        keepMounted
        fullWidth
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 1 }}>
          <Avatar src={logo} sx={{ borderRadius: 0 }} />
          <Box>
            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pl: 1, lineHeight: '15px' }}>TheKatta <br /> <span style={{ color: 'gray', fontFamily: 'Nunito', }}>Business</span> </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
          <Avatar src={'/static/images/avatar/3.jpg'} alt={storeinfo?.store_name} sx={{ borderRadius: 1 }} />
        </Box>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, pt: 1 }}>{storeinfo?.store_name}</Typography>

        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3, pb: 3, border: '1px solid #000000', m: 1, borderRadius: 1, boxShadow: 3 }}>

            <QRCode
              value={qrString?.qrstring}
              ecLevel='H'
              size={200}
              qrStyle='dots'
              bgColor='#FFFFFF'
              fgColor='#000000'
              enableCORS={true}
              logoImage={logo}
              eyeRadius={[
                {
                  outer: [10, 10, 0, 10],
                  inner: [0, 10, 10, 10],
                },
                [10, 10, 10, 0],
                [10, 0, 10, 10],
              ]}
            />

          </Box>
        </Container>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 12, pt: 1, pb: 1, color: 'gray' }}>Scan and get discount with TheKatta app</Typography>
      </Dialog>
    </React.Fragment>
  )
}

export default BottomNavigation;



/* const Link = styled.a`
  font-size: 1.7rem;
  ${(p) => (p.active ? `color:blue;` : "")}
  position: relative;
  cursor: pointer;

  ::before {
    ${(p) => (!p.active ? "display:none;" : "")}
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0.3rem;
    border-radius: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
    height: 0.3rem;
    background-color: blue;
  }
`; */


/* const Link = styled(IconButton)(() => ({
  fontSize: '1.7rem',
  // (p) => (p.active ? `color:blue;` : "")
  position: relative,
  cursor: pointer,

  ::before {
    ${(p) => (!p.active ? "display:none;" : "")}
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0.3rem;
    border-radius: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
    height: 0.3rem;
    background-color: blue;
  }
})); */