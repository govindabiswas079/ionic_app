import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Container, Grow, IconButton, styled, Switch, Avatar, } from '@mui/material';
import logo from '../../img/logo.png';
// import { LoadingButton } from '@mui/lab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'

import Button from '@mui/material/Button';
import SilverPlan from './SubscriptionPlan/SilverPlan';
import GoldenPlan from './SubscriptionPlan/GoldenPlan';
import PlatinumPlan from './SubscriptionPlan/PlatinumPlan';
import { ApiRequestUrl } from '../../ApiRequest';

const VendorSubscription = () => {
  let Navigate = useHistory();
  const VendorSubscription = sessionStorage.getItem('VendorSubscription')
  const [checked, setChecked] = useState(false);
  const [silverPlan, setSilverPlan] = useState(true);
  const [goldenPlan, setGoldenPlan] = useState(false);
  const [platinumPlan, setPlatinumPlan] = useState(false);
  const [silverPlanObj, setSilverPlanObj] = React.useState({});
  const [goldenPlanObj, setGoldenPlanObj] = React.useState({});
  const [platinumPlanObj, setPlatinumPlanObj] = React.useState({});
  const [loaderData, setLoaderData] = React.useState(true)


  const handleChange = () => {/* SubscriptionCheckout */
    setChecked((prev) => !prev);
  };

  const onSilverPlan = () => {
    setSilverPlan(true);
    setGoldenPlan(false);
    setPlatinumPlan(false);
  }
  const onGoldenPlan = () => {
    setGoldenPlan(true);
    setSilverPlan(false);
    setPlatinumPlan(false);
  }
  const onPlatinumPlan = () => {
    setPlatinumPlan(true);
    setSilverPlan(false);
    setGoldenPlan(false);
  }

  var subscription = JSON.stringify({
    "id": 1
  })

  var config_subscriptioncheck = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/planlist`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: subscription
  };
  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config_subscriptioncheck, { signal: signal })
      .then(function (response) {
        //console.log(response.data)
        if (response.data.response.status === 1) {
          setSilverPlanObj(response.data.planlist[0])
          setGoldenPlanObj(response.data.planlist[1])
          setPlatinumPlanObj(response.data.planlist[2])
          setLoaderData(false)
        }
      })
      .catch(function (err) {
        setLoaderData(false)
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }, [])

  return (
    <>
      <Box sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh', padding: 0, margin: 0, }}>
        <AppBar elevation={0} sx={{ backgroundColor: '#f3f8fa', }}>
          <Toolbar sx={{ pt: 1.5, pb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar style={{ borderRadius: 1 }} src={logo} alt='' />
              <Box>
                <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pl: 1, lineHeight: '15px' }}>TheKatta <br /> <span style={{ color: 'gray', fontFamily: 'Nunito', }}>Business</span> </Typography>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: 1 }}>
              <IconButton onClick={() => VendorSubscription ? setTimeout(() => { sessionStorage.removeItem('VendorSubscription'); Navigate.push('/HomeScreen') }, 100) : Navigate.push('/BankCredentials')}>
                <KeyboardBackspaceIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Grow in>
          <div>
            <Box sx={{ pt: 10 }}>
              <Container>
                <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#6500d8', borderRadius: 1, pb: 1 }}>
                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', textAlign: 'center', pt: 1, fontSize: 23 }}>Welcome Offer</Typography>
                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', textAlign: 'center', pt: 1, fontSize: 18 }}>Free subscription Get 100% off</Typography>
                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', textAlign: 'center', fontSize: 15 }}>(Only for silver plan)</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: 0.3, border: 'none', }}>
                      <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 10, pl: 0.3, pr: 0.3, pt: 0.1, pb: 0.1 }}>
                        use promo code <span style={{ fontFamily: 'Nunito', color: 'blue', fontWeight: '900' }}>THEKATTA</span> at checkout
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Box>

            <Container sx={{ pt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: 13, fontFamily: 'Nunito', fontWeight: checked ? '800' : '800', color: checked ? "" : '#65c466', transition: 'ease all 0.5s' }}>Monthly</Typography>
                <Box sx={{ flexGrow: 0.01 }} />
                <IOSSwitch sx={{ m: 1 }} checked={checked} onChange={handleChange} />
                <Box sx={{ flexGrow: 0.01 }} />
                <Typography sx={{ fontSize: 13, fontFamily: 'Nunito', fontWeight: checked ? '800' : '800', color: checked ? "#65c466" : '', transition: 'ease all 0.5s' }}>Yearly</Typography>
                <Box sx={{ flexGrow: 1 }} />
                {VendorSubscription ? '' : <Typography onClick={() => Navigate.push('/HomeScreen')} sx={{ fontSize: 13, fontFamily: 'Nunito', fontWeight: '800', color: '#000000', transition: 'ease all 0.5s' }}>SKIP</Typography>}
              </Box>
            </Container>
            <Container sx={{ pt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: 'none', display: 'flex', }}>
                  <Button onClick={(e) => onSilverPlan(e)} sx={{ backgroundColor: silverPlan ? '#6500d8' : '', color: silverPlan ? '#FFFFFF' : '#000000', fontFamily: 'Nunito', transition: 'ease all 0.5s', '&:hover': { backgroundColor: silverPlan ? '#6500d8' : '' }, margin: 0.5, }} > Silver</Button>
                  <Button onClick={(e) => onGoldenPlan(e)} sx={{ backgroundColor: goldenPlan ? '#6500d8' : '', color: goldenPlan ? '#FFFFFF' : '#000000', fontFamily: 'Nunito', transition: 'ease all 0.5s', '&:hover': { backgroundColor: goldenPlan ? '#6500d8' : '' }, margin: 0.5, }} > Golden</Button>
                  <Button onClick={(e) => onPlatinumPlan(e)} sx={{ backgroundColor: platinumPlan ? '#6500d8' : '', color: platinumPlan ? '#FFFFFF' : '#000000', fontFamily: 'Nunito', transition: 'ease all 0.5s', '&:hover': { backgroundColor: platinumPlan ? '#6500d8' : '' }, margin: 0.5, }} > Platinum</Button>
                </Box>
              </Box>

              {silverPlan ?
                <SilverPlan loaderData={loaderData} checked={checked} silverPlanObj={silverPlanObj} />
                :
                ""
              }
              {goldenPlan ?
                <GoldenPlan checked={checked} goldenPlanObj={goldenPlanObj} />
                :
                ""
              }
              {platinumPlan ?
                <PlatinumPlan checked={checked} platinumPlanObj={platinumPlanObj} />
                :
                ""
              }


            </Container>
          </div >
        </Grow >
      </Box >
    </>
  )
}

export default VendorSubscription;


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));