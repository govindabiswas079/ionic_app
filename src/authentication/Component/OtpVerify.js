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
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IonContent, useIonRouter } from '@ionic/react';
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

const OtpVerify = () => {
  let Navigate = useIonRouter();
  const theme = useTheme();
  const firebaseToken = sessionStorage.getItem('token');
  const tokenJsoon = JSON.parse(firebaseToken);
  const VendoroneTimeOtp = localStorage.getItem('VendoroneTimeOtp')
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

  const Vendor_Woner_Data = localStorage.getItem('Vendor_Woner_Data');
  const Vendor_Woner_Data_json = JSON.parse(Vendor_Woner_Data)
  var woner_info = JSON.stringify({
    vinfo: {
      owner_name: Vendor_Woner_Data_json.owner_name,
      mobile: Vendor_Woner_Data_json.mobile,
      email: Vendor_Woner_Data_json.email,
      password: Vendor_Woner_Data_json.password,
      executive_code: Vendor_Woner_Data_json.executive_code,
      refferral_code: Vendor_Woner_Data_json.refferral_code,
      device_id: Vendor_Woner_Data_json.device_id,
      ip_address: Vendor_Woner_Data_json.ip_address,
      co_ordinates: Vendor_Woner_Data_json.co_ordinates
    }
  });
  console.log(woner_info)

  var config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/vsignup`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: woner_info
  };

  const notify = () => toast.warn('Enter valid OTP', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
  const otpnotify = () => toast.warn('Enter OTP', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });

  const onSubmit = async (e) => {
    const controller = new AbortController();
    const signal = controller.signal

    e.preventDefault();
    var currentotp = '' + VendoroneTimeOtp;
    if (value.otp !== '') {
      if (value.otp === currentotp) {
        setLoader(true);
        await axios(config, { signal: signal })
          .then(function (OtpVerify_response) {
            // console.log(response.data.response.message)
            localStorage.setItem('vendor_id', OtpVerify_response.data.vendor_id)
            var status = OtpVerify_response.data.response.status
            if (status === 1) {
              var firebaseTokenJson = JSON.stringify({
                vendor_id: OtpVerify_response.data.vendor_id,
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
                  // console.log(response.data.response.status)
                  if (response.data.response.status === 1) {
                    localStorage.removeItem('Vendor_Woner_Data');
                    localStorage.removeItem('Vendor_Woner_Data');
                    localStorage.removeItem('Vendor_Device_Data');
                    localStorage.removeItem('VendoroneTimeOtp');
                    window.location.replace('/StoreDetails')
                  } else {
                    if (response.data.response.status === -1) {
                      //alert('somthing wrong');
                      setLoader(false)
                      toast(response.data.response.message)
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


              setLoader(false)
            } else {
              if (status === -1) {
                toast(OtpVerify_response.data.response.message)
              } else {
                alert('something wrong')
              }
            }
          })
          .catch(function (error) {
            setLoader(false)
            console.log(error);
            // alert(error)
          });
      } else {
        setLoader(false)
        notify();
      }
    } else {
      otpnotify();
      alert('csdv')
    }
    return () => controller.abort();
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
            <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: 1 }}>
              <IconButton onClick={() => Navigate.push('/SignUp')}>
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
                <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Mobile Number</Typography>
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
                  Verify Number
                </LoadingButton>
              </Box>
            </BottomContainer>
          </div>
        </Grow>
      </Box>
    </IonContent>
  )
}

export default OtpVerify;



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