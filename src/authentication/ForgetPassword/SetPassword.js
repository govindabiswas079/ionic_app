import React, { useState } from 'react';
import { AppBar, Toolbar, Avatar, Box, Grow, styled, Typography, Container, OutlinedInput, InputLabel, FormControl, IconButton, InputAdornment, FormHelperText, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../img/logo.png';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
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

const SetPassword = () => {
  const theme = useTheme();
  let Navigate = useIonRouter();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isValidePassword, setIsValidePassword] = useState(false);
  const [checkConfirmpassword, setChekConfirmPassword] = useState(false);
  const [value, setValue] = React.useState({
    password: '',
    confirmPassword: '',
  });

  const onCHangePassword = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, password: e.target.value });
      setIsPasswordValid(false);
    } else {
      setValue({ ...value, password: e.target.value });
      setIsPasswordValid(false);
    };
    if (e.target.value.trim().length >= 8) {
      setIsValidePassword(false);
    } else {
      setIsValidePassword(true);
    }
  }
  const onCHangeConfirmPassword = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, confirmPassword: e.target.value });
      setIsConfirmPasswordValid(false);
    } else {
      setValue({ ...value, confirmPassword: e.target.value });
      setIsConfirmPasswordValid(true);
    };
    if (e.target.value !== value.password) {
      setChekConfirmPassword(true)
    } else {
      setChekConfirmPassword(false)
    }
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
    if (checkStringNullEmpty(value.password)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setIsPasswordValid(true);
    }
    if (checkStringNullEmpty(value.confirmPassword)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setIsConfirmPasswordValid(true);
    }
    if (value.password !== value.confirmPassword) {
      validation += '<li>Password are not same</li>';
      setChekConfirmPassword(true)
    };
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  const checkinfo = sessionStorage.getItem('checkinfo')
  const checkinfoJSON = JSON.parse(checkinfo);
  const vendor_changepassword = JSON.stringify({
    vendor_id: checkinfoJSON?.vendor_id,
    new_password: value.confirmPassword
  });
  // console.log(vendor_changepassword)

  var config_changepassword = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/changepassword`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: vendor_changepassword
  };

  const onSubmit = async (e) => {
    const controller = new AbortController();
    const signal = controller.signal

    e.preventDefault();
    validatee();
    if (validation === '') {
      setLoader(true)
      await axios(config_changepassword, { signal: signal })
        .then(function (response) {
          if (response.data.response.status === 1) {
            toast('Successfully  Updated!')
            setTimeout(() => {
              Navigate.push('/UpdateSuccessfully')
              setValue({ ...value, password: '', confirmPassword: '', })
              sessionStorage.removeItem('checkinfo')
              setLoader(false)
            }, 3000)
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
  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  return (
    <IonPage>
      <IonContent>
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
              {/* <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: 1 }}>
                <IconButton onClick={() => { Navigate.push('/SignIn'); sessionStorage.removeItem('checkinfo') }}>
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Box> */}
              <Stack direction="row" spacing={1} onClick={() => Navigate.push('/SignIn')}>
                <Chip
                  icon={<AccountCircleIcon sx={{ color: 'red' }} />}
                  label={'sign in'}
                  variant="outlined"
                  sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '600' }}
                />
              </Stack>
            </Toolbar>
          </AppBar>

          <Grow in>
            <div>
              <Box sx={{ pt: 10 }}>
                <Container>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Change your</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>password</Typography>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '500', fontSize: 15, pt: 4 }}>Thank you for confirming email address and username.</Typography>
                </Container>
              </Box>

              <Container>
                <Box sx={{ pt: 4 }}>
                  <FormControl error={isPasswordValid} fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter Password</InputLabel>
                    <OutlinedInput
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      label="Enter Password"
                      value={value.password}
                      onChange={(e) => onCHangePassword(e)}
                      sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="large">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {isPasswordValid ?
                      <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                        Password is required
                      </FormHelperText>
                      : ''
                    }
                    {isValidePassword ?
                      <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                        Password must have 8 carachter
                      </FormHelperText>
                      : ''
                    }
                  </FormControl>
                </Box>

                <Box sx={{ pt: 2 }}>
                  <FormControl error={isConfirmPasswordValid} fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter Confirm Password</InputLabel>
                    <OutlinedInput
                      type={showPasswordConfirm ? 'text' : 'password'}
                      name="password"
                      label="Enter Confirm Password"
                      value={value.confirmPassword}
                      onChange={(e) => onCHangeConfirmPassword(e)}
                      sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPasswordConfirm} onMouseDown={handleMouseDownPasswordConfirm} edge="end" size="large">
                            {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {isConfirmPasswordValid ?
                      <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                        Confirm Password is required
                      </FormHelperText>
                      : ''
                    }
                    {checkConfirmpassword ?
                      <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                        Confirm password are not match
                      </FormHelperText>
                      : ''
                    }
                  </FormControl>
                </Box>
              </Container>
              <BottomContainer>
                <Box sx={{ pt: 3 }}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    onClick={(e) => onSubmit(e)}
                    sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
                  >
                    Change Password
                  </LoadingButton>
                </Box>
              </BottomContainer>
            </div>
          </Grow>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default SetPassword




/*  */