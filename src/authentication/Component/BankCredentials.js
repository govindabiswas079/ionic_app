import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Container, OutlinedInput, InputLabel, FormControl, Grow, IconButton, Avatar, } from '@mui/material';
import logo from '../../img/logo.png';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { IonContent, useIonRouter } from '@ionic/react'
import { ApiRequestUrl } from '../../ApiRequest';

const BankCredentials = () => {
  let Navigate = useIonRouter()
  const theme = useTheme();
  const vendor_id = localStorage.getItem('vendor_id');
  const [homeNavigate, setHomeNavigate] = React.useState(false);
  const [loader, setLoader] = useState(false)
  const [value, setValue] = useState({
    account_holder_name: '',
    account_number: '',
    ifsc_code: '',
    bank_name: ''
  });

  const onChangeAccount_Holder_Name = () => {

  }
  const onChangeAccount_Number = () => {

  }
  const onChangeIfsc_Code = () => {

  }
  const onChangeBank_Name = () => {

  }


  const onSubmit = () => {
    setLoader(true)
    window.location.replace('/VendorSubscription')
  }


  var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });
  var config_subscriptioncheck = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/subscriptioncheck`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vinfo
  };
  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config_subscriptioncheck, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          // Navigate.push('/HomeScreen')
          setHomeNavigate(true)
        } else {
          if (response.data.response.status === 0) {
            // Navigate('/VendorSubscription')
            setHomeNavigate(false)
          }
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
  }, [])


  return (
    <IonContent>
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
              <IconButton onClick={() => Navigate.push('/SignIn')}>
                <KeyboardBackspaceIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Grow in>
          <div>
            <Box sx={{ pt: 10 }}>
              <Container>
                <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Add</Typography>
                <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Bank Credentials</Typography>
              </Container>
            </Box>

            <Box>
              <Container sx={{ pb: 2 }}>
                <Box sx={{ pt: 3 }}>
                  <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                    <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Account Holder Name</InputLabel>
                    <OutlinedInput
                      type="number"
                      name="store"
                      label="Account Holder Name"
                      value={value.account_holder_name}
                      onChange={(e) => onChangeAccount_Holder_Name(e)}
                      sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ pt: 2 }}>
                  <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                    <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Account Number</InputLabel>
                    <OutlinedInput
                      type="number"
                      name="store"
                      label="Account Number"
                      value={value.account_number}
                      onChange={(e) => onChangeAccount_Number(e)}
                      sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ pt: 2 }}>
                  <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                    <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>IFSC Code</InputLabel>
                    <OutlinedInput
                      type="number"
                      name="store"
                      label="IFSC Code"
                      value={value.ifsc_code}
                      onChange={(e) => onChangeIfsc_Code(e)}
                      sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ pt: 2 }}>
                  <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                    <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Bank Name</InputLabel>
                    <OutlinedInput
                      type="number"
                      name="store"
                      label="Bank Name"
                      value={value.bank_name}
                      onChange={(e) => onChangeBank_Name(e)}
                      sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                    />
                  </FormControl>
                </Box>

                <Box sx={{ pt: 5 }}>
                  <Box>
                    <Typography onClick={() => homeNavigate ? Navigate.push('/HomeScreen') : Navigate.push('/VendorSubscription')} sx={{ float: 'right', fontFamily: 'Nunito', fontWeight: '700', pr: 1, pb: 2 }}>SKIP</Typography>
                  </Box>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={loader}
                    onClick={() => onSubmit()}
                    sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
                  >
                    Next
                  </LoadingButton>
                </Box>
              </Container>
            </Box>
          </div>
        </Grow>
      </Box>
    </IonContent>
  )
}

export default BankCredentials