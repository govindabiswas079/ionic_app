import React, { useState } from 'react';
import { Box, Grow, Typography, Container, OutlinedInput, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useIonRouter, useIonAlert } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const ForgetPassword = () => {
  let Navigate = useIonRouter();
  const [present] = useIonAlert();
  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState(false);
  const [value, setValue] = React.useState({
    email: "",
  })

  // React.useEffect(() => {
  //   sessionStorage.setItem('token', JSON.stringify({ value: "dCdFYHMZSZSa0jhynK2IHD:APA91bGBzs7n-_MW3asNH2gOpcWHrN_61VdtfA6t5fNe-tAgEnRMyOi2JKomaERQPt6S3MNQycMkBVCt0vGXLY96aMgjQCkxcFRCTHgKt1kWnU4OOhvheEh8zYKBmnrDfPvGfnxNRpRm" }))
  // })

  const onChangeEmail = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, email: e.target.value });
      setEmail(false);
    } else {
      setValue({ ...value, email: e.target.value });
      setEmail(false)
    };
  }

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

  var validation = '';
  const validatee = () => {
    if (checkStringNullEmpty(value.email)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setEmail(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  const vendor_forgotpassword = JSON.stringify({
    email: value.email,
  });

  var config_forgotpassword = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/forgotpassword`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: vendor_forgotpassword
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const signal = controller.signal
    validatee();
    if (validation === '') {
      setLoader(true)
      await axios(config_forgotpassword, { signal: signal })
        .then(function (response) {
          if (response.data.response.status === 1) {
            sessionStorage.setItem('checkinfo', JSON.stringify(response.data.checkinfo))
            Navigate.push('/VerifyEmail')
            setValue({ ...value, email: "", })
            setLoader(false)
          } else {
            if (response.data.response.status === -1) {
              // console.log(response.data);
              setLoader(false)
              present({
                cssClass: 'my-css',
                header: 'Alert',
                message: response.data.response.message,
                buttons: [
                  'Cancel',
                  { text: 'Ok', handler: (d) => setLoader(false) },
                ],
              })
            }
          }
        })
        .catch(function (error) {
          if (error.name === "AbortError") {
            console.log("successfully aborted");
          } else {
            console.log(error);
            setLoader(false)
          }
        });

    } else {

    }
    return () => controller.abort();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loader ?
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
        : ""}
      <Grow in>
        <div>
          <Box sx={{ pt: 20 }}>
            <Container>
              <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 27 }}>Forget your</Typography>
              <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 27 }}>Password?</Typography>
              <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '600', fontSize: 19, pt: 4 }}>Provide your registered email address to change password.</Typography>
            </Container>
          </Box>
          <Box >
            <Container sx={{ pb: 4 }}>

              <Box sx={{ pt: 2 }}>
                <FormControl error={email} fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter Username</InputLabel>
                  <OutlinedInput
                    type="email"
                    name="name"
                    label="Enter Username"
                    value={value.email}
                    onChange={(e) => onChangeEmail(e)}
                    sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                  />
                  {email ?
                    <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                      Username is required
                    </FormHelperText>
                    : ''
                  }
                </FormControl>
              </Box>
            </Container>
          </Box>
          <Container sx={{ paddingTop: 15 }}>
            <Box sx={{ pt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                onClick={(e) => onSubmit(e)}
                sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
              >
                Get OTP
              </LoadingButton>
            </Box>
          </Container>
        </div>
      </Grow>
    </>
  )
}

export default ForgetPassword