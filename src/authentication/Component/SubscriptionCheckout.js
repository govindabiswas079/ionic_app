import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Container, Grow, IconButton, Button, Radio, OutlinedInput, Divider, Avatar } from '@mui/material';
import logo from '../../img/logo.png';
// import { LoadingButton } from '@mui/lab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useHistory, Link } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IonContent, useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const SubscriptionCheckout = () => {
  let Navigate = useIonRouter();
  const subscription = sessionStorage.getItem('subscription');
  const subscription_json = JSON.parse(subscription)
  const [silverPlan, setSilverPlan] = useState(true);
  const [goldenPlan, setGoldenPlan] = useState(false);
  const [loader, setLoader] = React.useState(false)

  const onSilverPlan = () => {
    setSilverPlan(true);
    setGoldenPlan(false);
  }
  const onGoldenPlan = () => {
    setGoldenPlan(true);
    setSilverPlan(false);
  }


  var get_subscription = JSON.stringify({
    subsinfo: {
      plan_id: subscription_json.subsinfo?.plan_id,
      vendor_id: subscription_json.subsinfo?.vendor_id,
      amount: subscription_json.subsinfo?.amount
    }
  });
  //console.log(get_subscription)

  var config_subscriptionbuy = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/subscription`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_subscription
  };

  const Submit_Buy = async (e) => {
    e.preventDefault();
    setLoader(true)
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config_subscriptionbuy, { signal: signal })
      .then(function (response) {
        console.log(response.data)
        if (response.data.response.status === 1) {
          sessionStorage.removeItem('subscription');
          sessionStorage.removeItem('VendorSubscription');
          Navigate.push('/PaymentSuccess')
          setLoader(false)
        } else {
          setLoader(false)
        }
      })
      .catch(function (err) {
        setLoader(false)
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }

  return (
    <IonContent>
      {loader ?
        <Backdrop
          sx={{ color: 'red', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress sx={{ color: '#ffcf00' }} />
        </Backdrop>
        : ''}
      <Grow in>
        <div>
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
                  <IconButton onClick={() => Navigate.push('/VendorSubscription')}>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>

            <Container sx={{ pt: 16 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ colo: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Payment</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: 'none', display: 'flex', }}>
                  <Button onClick={(e) => onSilverPlan(e)} sx={{ backgroundColor: silverPlan ? '#6500d8' : '', color: silverPlan ? '#FFFFFF' : '#000000', fontFamily: 'Nunito', fontSize: '8px', transition: 'ease all 0.5s', '&:hover': { backgroundColor: silverPlan ? '#6500d8' : '' }, margin: 0.5, }} >UPI</Button>
                  <Button onClick={(e) => onGoldenPlan(e)} sx={{ backgroundColor: goldenPlan ? '#6500d8' : '', color: goldenPlan ? '#FFFFFF' : '#000000', fontFamily: 'Nunito', fontSize: '8px', transition: 'ease all 0.5s', '&:hover': { backgroundColor: goldenPlan ? '#6500d8' : '' }, margin: 0.5, }} >Debit/Credit Card</Button>
                </Box>
              </Box>
              <Box sx={{ pt: 3 }}>
                {[0, 1, 2].map((id) => (
                  <Box key={id} sx={{ width: '100%', height: 'auto', backgroundColor: '#FFFFFF', borderRadius: 1, boxShadow: 9, mt: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                      <Radio />
                      <Box>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 12 }}>XXXX XXXX XXXX 1234</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography sx={{ fontFamily: 'Nunito', fontWeight: '600', fontSize: 12, color: 'gray' }}>02/24</Typography>
                          <Link to="" style={{ fontFamily: 'Nunito', fontWeight: '600', fontSize: 12, paddingLeft: '7px', textTransform: 'uppercase', textDecoration: 'none' }}>Edit</Link>
                        </Box>
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <CreditCardIcon sx={{ color: 'Blue' }} />
                    </Box>
                  </Box>
                ))}
                <Box sx={{ pt: 2 }}>
                  <LoadingButton fullWidth startIcon={<AddIcon />} sx={{ backgroundColor: '#FFFFFF', color: '#000000', transition: 'ease all 0.5s', '&:hover': { backgroundColor: '#FFFFFF' }, pt: 1, pb: 1, fontFamily: 'Nunito', fontWeight: '700' }}>Add New</LoadingButton>
                </Box>
              </Box>

              <Box sx={{ pt: 2 }}>
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', pb: 1 }}>Promo Code</Typography>
                <OutlinedInput value={subscription_json.subsinfo?.plan_code} fullWidth variant="outlined" endAdornment={
                  <Button variant='contained' sx={{ backgroundColor: '#6500d8', '&:hover': { backgroundColor: '#6500d8' }, fontFamily: 'Nunito', fontWeight: '700' }} >Apply</Button>
                } />
              </Box>


              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 3 }}>
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: 'gray' }}>Discount (-100%)</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18 }}>&#8377;  0.00</Typography>
              </Box>
              <Divider sx={{ pt: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 2 }}>
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', }}>Total</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 22 }}>&#8377;  {subscription_json.subsinfo?.amount}</Typography>
              </Box>

              <Box sx={{ pt: 2, pb: 3 }}>
                <LoadingButton onClick={(e) => Submit_Buy(e)} fullWidth sx={{ backgroundColor: '#6500d8', '&:hover': { backgroundColor: '#6500d8' }, color: '#FFFFFF', pt: 1, pb: 1, fontFamily: 'Nunito', fontWeight: '700' }}>Pay &#8377;  {subscription_json.subsinfo?.amount}</LoadingButton>
              </Box>
            </Container>

          </Box >
        </div>
      </Grow >
    </IonContent>
  )
}

export default SubscriptionCheckout