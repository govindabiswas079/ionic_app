import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Container, OutlinedInput, InputLabel, FormControl, styled, Grow, IconButton, Avatar } from '@mui/material';
import logo from '../../img/logo.png';
import progress from '../../img/progress.png';
import { useTheme } from '@mui/material/styles';
import { Link, useHistory } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';

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

const VerifyEmail = () => {
  let Navigate = useIonRouter();
  const theme = useTheme();
  const [minutes, setMinutes] = useState(2)
  const [seconds, setSeconds] = useState(59)
  const [resend, setResend] = useState(false);
  const [loader, setLoader] = useState(false)
  const [value, setValue] = React.useState({
    otp: '',
  });

  const onChangeOtp = (e) => {
    if (e.target.value.trim().length >= 4) {
      setValue({ ...value, otp: e.target.value });
    } else {
      setValue({ ...value, otp: e.target.value });
    };
  };



  const notify = () => toast.warn('Enter valid OTP', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  const otpnotify = () => toast.warn('Enter OTP', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const checkinfo = sessionStorage.getItem('checkinfo')
  const checkinfoJSON = JSON.parse(checkinfo);
  const onSubmit = async (e) => {
    e.preventDefault();
    var currentotp = '' + checkinfoJSON?.otp;
    if (value.otp !== '') {
      if (value.otp === currentotp) {
        setLoader(true);
        setTimeout(() => {
          Navigate.push('/SetPassword')
          setValue({ ...value, otp: '', });
          setLoader(false);
        }, 2000)
      } else {
        setLoader(false)
        notify();
      }
    } else {
      otpnotify();
    }
  }

  function updateTime() {
    setResend(false)
    if (minutes == 0 && seconds == 0) {
      setResend(true)
    }
    else {
      if (seconds == 0) {
        setMinutes(minutes => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds => seconds - 1);
      }
    }
  }

  useEffect(() => {
    const token = setTimeout(updateTime, 1000)

    return function cleanUp() {
      clearTimeout(token);
    }
  })

  const ResendOtp = () => {
    updateTime();
    setMinutes(2)
    setSeconds(59)
  }

  return (
    <IonPage>
      <IonContent>
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
              <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: 1 }}>
                <IconButton onClick={() => { Navigate.push('/PasswordForget'); sessionStorage.removeItem('checkinfo') }}>
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>

          <Grow in>
            <div>
              <Box sx={{ pt: 10 }}>
                <Container>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Verify your</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Email ID</Typography>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '500', fontSize: 15, pt: 1 }}>We have send you an SMS with OTP with instruction.</Typography>
                </Container>
              </Box>

              <Box >
                <Container sx={{ pb: 2 }}>
                  <Box sx={{ pt: 5 }}>
                    <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                      <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter OTP</InputLabel>
                      <OutlinedInput
                        type="number"
                        name="number"
                        label="Enter OTP"
                        value={value.otp}
                        onChange={(e) => onChangeOtp(e)}
                        sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                        inputComponent={TextMaskCustom}
                      />
                    </FormControl>
                  </Box>
                </Container>
              </Box>
              <Box sx={{ display: "flex", justifyContent: 'center', }}>
                {resend ? <Typography sx={{ color: 'gray' }}>did not receive OTP ? <Link to='' onClick={(e) => ResendOtp(e)} style={{ color: '#cdc1c1', textDecorationStyle: 'dashed' }}>Resend OTP</Link> </Typography>
                  :
                  <span className="progressstimer">
                    <img src={progress} alt="" />
                    <span className="timer" id="timer">
                      <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '600' }}>{minutes}:{seconds}</Typography>
                    </span>
                  </span>
                }
              </Box>
              <BottomContainer>
                <Box sx={{ pt: 3 }}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    onClick={(e) => onSubmit(e)}
                    sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
                  >
                    Verify
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

export default VerifyEmail

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};