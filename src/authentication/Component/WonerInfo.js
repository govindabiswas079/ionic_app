import React, { useState } from 'react';
import { Box, Grow, Typography, Container, OutlinedInput, InputLabel, FormControl, FormHelperText, IconButton, InputAdornment, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { useIonRouter } from '@ionic/react';
import { IpApiRequest } from '../../ApiRequest';
import { ApiRequestUrl } from '../../ApiRequest';

const WonerInfo = ({ refreshControll }) => {
  let Navigate = useIonRouter();
  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isValidePassword, setIsValidePassword] = useState(false);;
  const [checkConfirmpassword, setChekConfirmPassword] = useState(false);;
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkValidMobile, setCheckValidMobile] = useState(false);
  const [ip, setIp] = React.useState([]);
  const [value, setValue] = React.useState({
    mobile: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    refferral_code: '',
    executive_code: ''
  });

  const onCHangeMobile = (e) => {
    if (e.target.value.trim().length >= 10) {
      setValue({ ...value, mobile: e.target.value });
      setCheckValidMobile(false);
      setIsMobileValid(false)
    } else {
      setValue({ ...value, mobile: e.target.value });
      setCheckValidMobile(true);
      setIsMobileValid(false)
    };
  }

  const onCHangeName = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, name: (e.target.value.toLowerCase().split(" ").map(word => { return word.charAt(0).toUpperCase() + word.slice(1); }).join(" ")) });
      setIsNameValid(false);
    } else {
      setValue({ ...value, name: e.target.value });
      setIsNameValid(false)
    };
  }
  React.useEffect(() => {
    let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(value.email)) {
      // setValidEmail(false);
      setCheckValidEmail(false)

    } else {
      // setCheckValidEmail(true);      
    };
  })
  const onCHangeEmail = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, email: e.target.value });
      setIsEmailValid(false);
      setCheckValidEmail(true);
    } else {
      setValue({ ...value, email: e.target.value });
      setIsEmailValid(true);
      setCheckValidEmail(true);
    };
  }
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
    if (checkStringNullEmpty(value.mobile)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setIsMobileValid(true)
    }
    if (checkStringNullEmpty(value.name)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setIsNameValid(true)
    }
    if (checkStringNullEmpty(value.email)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setIsEmailValid(true);
    }
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

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    IpApiRequest.get(sanitizeUrl('/?format=json'), { signal: signal })
      .then(function (response) {
        setIp(response.data.ip);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => controller.abort();
  }, [refreshControll]);

  const Vendor_Device_Data = localStorage.getItem('Vendor_Device_Data');
  const Vendor_Device_Data_json = JSON.parse(Vendor_Device_Data)
  var woner_info = JSON.stringify({
    owner_name: value.name,
    mobile: value.mobile,
    email: value.email,
    password: value.password,
    executive_code: value.executive_code,
    refferral_code: value.refferral_code,
    device_id: Vendor_Device_Data_json.Device_id,
    ip_address: ip,
    co_ordinates: `${Vendor_Device_Data_json.latitude}, ${Vendor_Device_Data_json.longitude}`,
  });
  //console.log(woner_info)

  const get_otp = JSON.stringify({
    mobile: value.mobile,
    email: value.email,
  });


  var config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/getotp`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_otp
  };

  const get_otp_verify = JSON.stringify({
    mobile: value.mobile,
    email: value.email,
    type: "vendor"
  });
  var verify_config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/verify`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_otp_verify
  };

  const onSubmit = async (e) => {
    localStorage.setItem('Vendor_Woner_Data', woner_info)
    e.preventDefault();
    validatee();
    if (validation === '') {
      if (checkValidMobile === false, isValidePassword === false, checkConfirmpassword === true, checkValidEmail === false) {
        setLoader(true);
        await axios(verify_config)
          .then(function (response) {
            // console.log(response.data.response)
            var status = response.data.response.status
            if (status === 1) {

              axios(config)
                .then(function (response) {
                  // console.log('otp', response.data)
                  localStorage.setItem('VendoroneTimeOtp', response.data.otp)
                  var status = response.data.response.status
                  if (status === 1) {
                    setTimeout(() => {
                      localStorage.removeItem('oneTimeOtp')
                    }, 180000)
                    Navigate.push('/OtpVerify')
                  } else {
                    alert('somthing wrong');
                  }
                })
                .catch(function (error) {
                  setLoader(false)
                  console.log(error);
                  alert(error)
                });

            } else {
              if (status === -1) {
                setLoader(false)
                toast(response.data.response.message)
              } else {
                alert('somthing wrong');
                setLoader(false)
              }
            }
          })
          .catch(function (error) {
            setLoader(false)
            console.log(error);
            alert(error)
          });
      }
    } else {

    };
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
    <>
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
      <ToastContainer />
      <Grow in>
        <div>
          <Box sx={{ pt: 10 }}>
            <Container>
              <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Create</Typography>
              <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Merchant Account</Typography>
            </Container>
          </Box>
          <Box >
            <Container sx={{ pb: 4 }}>
              <Box sx={{ pt: 5 }}>
                <FormControl fullWidth error={isMobileValid | checkValidMobile} sx={{ ...theme.typography.customInput }}>
                  <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter Mobile</InputLabel>
                  <OutlinedInput
                    type="number"
                    name="number"
                    label="Enter Mobile"
                    value={value.mobile}
                    onChange={(e) => onCHangeMobile(e)}
                    sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                    inputComponent={TextMaskCustom}
                  />
                  {isMobileValid ?
                    <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                      Mobile is required
                    </FormHelperText>
                    : ''
                  }
                  {checkValidMobile ?
                    <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                      Mobile must have 10 digit long
                    </FormHelperText>
                    : ''
                  }
                </FormControl>
              </Box>

              <Box sx={{ pt: 2 }}>
                <FormControl error={isNameValid} fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter Name</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="name"
                    label="Enter Name"
                    value={value.name}
                    onChange={(e) => onCHangeName(e)}
                    sx={{ fontFamily: 'Nunito', fontWeight: '700', }}
                  />
                  {isNameValid ?
                    <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                      Name is required
                    </FormHelperText>
                    : ''
                  }
                </FormControl>
              </Box>

              <Box sx={{ pt: 2 }}>
                <FormControl error={isEmailValid} fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter Email</InputLabel>
                  <OutlinedInput
                    type="email"
                    name="email"
                    label="Enter Email"
                    value={value.email}
                    onChange={(e) => onCHangeEmail(e)}
                    sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                  />
                  {isEmailValid ?
                    <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                      Email is required
                    </FormHelperText>
                    : ''
                  }
                  {checkValidEmail ?
                    <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                      Enter valid email
                    </FormHelperText>
                    : ''
                  }
                </FormControl>
              </Box>

              <Box sx={{ pt: 2 }}>
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

              <Box sx={{ pt: 2 }}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter Executive Id</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="name"
                    label="Enter Executive Id"
                    value={value.executive_code}
                    onChange={(e) => setValue({ ...value, executive_code: e.target.value.trim().toUpperCase() })}
                    sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                  />
                  {/* {isNameValid ?
                    <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                      Name is required
                    </FormHelperText>
                    : ''
                  } */}
                </FormControl>
              </Box>
              <Box sx={{ pt: 2 }}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Enter Refferral Code</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="RefferralCode"
                    label="Enter Refferral Code"
                    value={value.refferral_code}
                    onChange={(e) => setValue({ ...value, refferral_code: e.target.value.trim().toUpperCase() })}
                    sx={{ fontFamily: 'Nunito', fontWeight: '700', }}
                  />
                  {/* {isNameValid ?
                    <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                      Name is required
                    </FormHelperText>
                    : ''
                  } */}
                </FormControl>
              </Box>

              <Box sx={{ pt: 3 }}>
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 13 }}>
                  By clicking on Sign up button, you are agree to our {" "}{" "}
                  <Link to="" style={{ fontFamily: 'Nunito', fontWeight: '700', textDecorationStyle: 'dashed' }}>Terms and Conditions</Link>
                </Typography>
              </Box>

              <Box sx={{ pt: 3 }}>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  //disabled={disable}
                  onClick={(e) => onSubmit(e)}
                  sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
                >
                  Next
                </LoadingButton>
              </Box>
            </Container>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default WonerInfo;


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000000000"
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