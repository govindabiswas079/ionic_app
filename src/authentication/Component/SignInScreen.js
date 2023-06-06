import React, { useState } from 'react';
import { Box, Grow, styled, Typography, Container, OutlinedInput, InputLabel, FormControl, IconButton, InputAdornment, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiRequestUrl } from '../../ApiRequest';

const BottomContainer = styled(Container)(() => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
  zIndex: 5,
  paddingBottom: 10,
  flex: 1
}));

const SignInScreen = () => {
  const theme = useTheme();
  const firebaseToken = sessionStorage.getItem('token');
  const tokenJsoon = JSON.parse(firebaseToken);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [value, setValue] = React.useState({
    email: "",
    password: ""
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
  const onChangePassword = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, password: e.target.value });
      setPassword(false);
    } else {
      setValue({ ...value, password: e.target.value });
      setPassword(false)
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
    if (checkStringNullEmpty(value.password)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setPassword(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  const vendor_sign_in = JSON.stringify({
    email: value.email,
    password: value.password,
  });
  //console.log(vendor_sign_in)

  var config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/vsignin`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: vendor_sign_in
  };

  const onSubmit = async (e) => {
    const controller = new AbortController();
    const signal = controller.signal

    e.preventDefault();
    validatee();
    if (validation === '') {
      setLoader(true)
      await axios(config, { signal: signal })
        .then(function (SignInScreen_response) {
          // console.log(SignInScreen_response.data)
          var status = SignInScreen_response.data.response.status
          if (status === 1) {
            localStorage.setItem('vendor_id', SignInScreen_response.data.vloginfo.vendor_id)
            var firebaseTokenJson = JSON.stringify({
              vendor_id: SignInScreen_response.data.vloginfo.vendor_id,
              register_token: tokenJsoon?.value
            });
            // console.log(firebaseTokenJson)
            var firebaseTokenJson_config = {
              method: 'post',
              url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/addvendorpushtoken`),
              headers: {
                'Content-Type': 'application/json'
              },
              data: firebaseTokenJson
            };
            axios(firebaseTokenJson_config, { signal: signal })
              .then(function (response) {
                // console.log(response.data)
                if (response.data.response.status === 1) {
                  localStorage.removeItem('Vendor_Device_Data')
                  //localStorage.setItem('vendor_id', response.data.vloginfo.vendor_id)
                  if (SignInScreen_response.data.vloginfo.stage === 1) {
                    window.location.replace('/StoreDetails')
                  }
                  if (SignInScreen_response.data.vloginfo.stage === 2) {
                    window.location.replace('/StoreAddress')
                  }
                  if (SignInScreen_response.data.vloginfo.stage === 3) {
                    window.location.replace('/BankCredentials')
                  }
                  if (SignInScreen_response.data.vloginfo.stage === 4) {
                    window.location.replace('/VendorSubscription')
                  }
                } else {
                  if (response.data.response.status === -1) {
                    //alert('somthing wrong');
                    setLoader(false)
                    toast('something went wrong please try again', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  }
                }
              })
              .catch(function (error) {
                if (error.name === "AbortError") {
                  console.log("successfully aborted");
                } else {
                  console.log(error);
                }
              });
          } else {
            if (status === -1) {
              //alert('somthing wrong');
              setLoader(false)
              toast(SignInScreen_response.data.response.message)
            }

          }
        })
        .catch(function (error) {
          setLoader(false)
          console.log(error);
          alert(error)
        });

    } else {

    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 27 }}>Sign in to</Typography>
              <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 27 }}>your account</Typography>
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

              <Box sx={{ pt: 2 }}>
                <FormControl error={password} fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Enter Password"
                    value={value.password}
                    onChange={(e) => onChangePassword(e)}
                    sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="large">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {password ?
                    <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                      Password is required
                    </FormHelperText>
                    : ''
                  }
                </FormControl>
              </Box>
              <Box sx={{ float: 'right', pt: 1 }}>
                <Link to='/PasswordForget' style={{ fontFamily: 'Nunito', fontWeight: '700', /* textDecorationStyle: 'dashed', */ fontSize: '18px', textDecoration: 'none' }}>Forgot your password?</Link>
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
                Sign In
              </LoadingButton>
            </Box>
          </Container>
        </div>
      </Grow>
    </>
  )
}

export default SignInScreen