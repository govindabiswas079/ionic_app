import React from 'react';
import { Box, Slide, Grow, Container, Typography, FormControl, InputLabel, OutlinedInput, styled, TextField, FormHelperText, InputAdornment, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CommonHeader from '../../navigators/CommonHeader';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { useHistory } from 'react-router-dom';
// import Select from '@mui/material/Select';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { toast, ToastContainer } from 'react-toastify'
import { useIonRouter } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CouponFrom = ({ nav, showSub, showSubPaln }) => {
  const theme = useTheme();
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [valueStartDate, setValueStartDate] = React.useState(null);
  const [valueEndDate, setValueEndDate] = React.useState(null);
  const [loader, setLoader] = React.useState(false)

  // const [coupon_type, setCoupon_type] = React.useState(true)
  const [coupon_title, setCoupon_title] = React.useState(false)
  const [coupon_code, setCoupon_code] = React.useState(false)
  const [coupon_precent, setCoupon_precent] = React.useState(false)
  const [limit_singleuser, setLimit_singleuser] = React.useState(false)
  const [upto_amount, setUpto_amount] = React.useState(false)
  const [minimum_purchase, setMinimum_purchase] = React.useState(false)
  const [startdate, setStartdate] = React.useState(false)
  const [expireddate, setExpireddate] = React.useState(false)
  const [value, setValue] = React.useState({
    // coupon_type: '',
    coupon_title: '',
    coupon_code: '',
    coupon_precent: '',
    limit_singleuser: '',
    upto_amount: '',
    minimum_purchase: '',
    startdate: '',
    expireddate: ''
  });
  // console.log(valueStartDate)

  // const onChangecoupon_type = (e) => {
  //   if (e.target.value.trim().length >= 0) {
  //     setValue({ ...value, coupon_type: e.target.value });
  //     setCoupon_type(false);
  //   } else {
  //     setValue({ ...value, coupon_type: e.target.value });
  //     setCoupon_type(false)
  //   };
  // }
  const onChangecoupon_title = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, coupon_title: e.target.value });
      setCoupon_title(false);
    } else {
      setValue({ ...value, coupon_title: e.target.value });
      setCoupon_title(false)
    };
  }
  const onChangecoupon_code = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, coupon_code: e.target.value });
      setCoupon_code(false);
    } else {
      setValue({ ...value, coupon_code: e.target.value });
      setCoupon_code(false)
    };
  }
  const onChangecoupon_precent = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, coupon_precent: e.target.value });
      setCoupon_precent(false);
    } else {
      setValue({ ...value, coupon_precent: e.target.value });
      setCoupon_precent(false)
    };
  }
  const onChangelimit_singleuser = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, limit_singleuser: e.target.value });
      setLimit_singleuser(false);
    } else {
      setValue({ ...value, limit_singleuser: e.target.value });
      setLimit_singleuser(false)
    };
  }
  const onChangeupto_amount = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, upto_amount: e.target.value });
      setUpto_amount(false);
    } else {
      setValue({ ...value, upto_amount: e.target.value });
      setUpto_amount(false)
    };
  }
  const onChangeminimum_purchase = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, minimum_purchase: e.target.value });
      setMinimum_purchase(false);
    } else {
      setValue({ ...value, minimum_purchase: e.target.value });
      setMinimum_purchase(false)
    };
  }

  const handleChangeStartDate = (newValue) => {
    setValueStartDate(newValue);
    setValue({ ...value, startdate: newValue });
  };
  const handleChangeEndDate = (newValue) => {
    setValueEndDate(newValue);
    setValue({ ...value, expireddate: newValue });
  };
  React.useEffect(() => {
    if (value.startdate === '') {

    } else {
      setStartdate(false);
    }
  })
  React.useEffect(() => {
    if (value.expireddate === '') {

    } else {
      setExpireddate(false)
    }
  })

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

  var validation = '';
  const validatee = () => {
    /* if (checkStringNullEmpty(value.coupon_type)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setCoupon_type(true)
    } */
    if (checkStringNullEmpty(value.coupon_title)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setCoupon_title(true)
    }
    if (checkStringNullEmpty(value.coupon_code)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setCoupon_code(true)
    }
    if (checkStringNullEmpty(value.coupon_precent)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setCoupon_precent(true)
    }
    if (checkStringNullEmpty(value.limit_singleuser)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setLimit_singleuser(true)
    }
    if (checkStringNullEmpty(value.upto_amount)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setUpto_amount(true)
    }
    if (checkStringNullEmpty(value.minimum_purchase)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setMinimum_purchase(true)
    }
    if (checkStringNullEmpty(value.startdate)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setStartdate(true)
    }
    if (checkStringNullEmpty(value.expireddate)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setExpireddate(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  var create_Cuppon = JSON.stringify({
    couponinfo: {
      created_by: vendor_id,
      coupon_type: 'Precent',
      coupon_title: value.coupon_title,
      coupon_code: value.coupon_code,
      coupon_precent: value.coupon_precent,
      limit_singleuser: value.limit_singleuser,
      upto_amount: value.upto_amount,
      minimum_purchase: value.minimum_purchase,
      startdate: value.startdate,
      expireddate: value.expireddate

    }
  });

  var config_coupon = {
    method: 'post',
    url: sanitizeUrl('http://codefeverllp.com/katta/API.svc/coupon'),
    headers: {
      'Content-Type': 'application/json'
    },
    data: create_Cuppon
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    validatee();
    if (validation === '') {
      setLoader(true);
      await axios(config_coupon)
        .then(function (response) {
          // console.log(response.data)
          var status = response.data.response.status
          if (status === 1) {
            toast('Successfully Updated', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              Navigate.push('/CouponScreen')
            }, 2000)

            setLoader(false)
          } else {
            alert('somthing wrong');
            setLoader(false)
          }
        })
        .catch(function (error) {
          setLoader(false)
          console.log(error);
          alert(error)
        });
    }
  }

  const onBack = () => {
    Navigate.push(`/CouponScreen`)
  }

  const VendorSubscription = (e) => {
    sessionStorage.setItem('VendorSubscription', e)
    setTimeout(() => {
      Navigate.push('/VendorSubscription');
    }, 100)
  }

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
      <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
        <CommonHeader onBack={onBack} nav={nav} />

        <Grow in>
          <div>
            <Box sx={{ pt: 10 }}>
              <Container>
                <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Create</Typography>
                <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>New Coupon</Typography>
              </Container>

              {showSubPaln ?
                <Container sx={{ pt: 0 }}>
                  <CardWrapperGolden sx={{ p: 1, boxShadow: 3, }}>
                    <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 12, pt: 3, zIndex: 1, }}>no any subscription plan!</Typography>
                    <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 20, pt: 3, zIndex: 1, }}>Boost Your Brand <br /> Visibility</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                      <Button onClick={() => VendorSubscription('VendorSubscription')} fullWidth size="large" sx={{ backgroundColor: 'green', fontFamily: 'Nunito', fontWeight: '700', color: '#FFFFFF', zIndex: 1, '&:hover': { backgroundColor: 'green' } }}>Get Katta Prime</Button>
                    </Box>
                  </CardWrapperGolden>
                </Container>
                :
                showSub ?
                  <Container sx={{ pt: 2 }}>
                    <Box sx={{
                      p: 1, boxShadow: 3, backgroundColor: theme.palette.secondary.light, width: '100%', height: 'auto', borderRadius: 1, color: '#fff', overflow: 'hidden', position: 'relative',
                    }}>
                      <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 20, pt: 3, }}>Your subscription has expired</Typography>
                      <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 15, pt: 1, }}>To get a new subscription or contact our executive support</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                        <Button onClick={() => VendorSubscription('VendorSubscription')} fullWidth size="large" sx={{ backgroundColor: 'green', fontFamily: 'Nunito', fontWeight: '700', color: '#FFFFFF', zIndex: 1, '&:hover': { backgroundColor: 'green' } }}>Get subscription</Button>
                      </Box>
                    </Box>
                  </Container>
                  :
                  <>
                    <Box>
                      <Container sx={{ pb: 2 }}>
                        {/* <Box sx={{ pt: 5 }}>
                    <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                      <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Coupon Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Coupon Type"
                        value={value.coupon_type}
                        onChange={(e) => onChangecoupon_type(e)}
                      >
                        <MenuItem value={'Discount on amount'}>Discount on amount</MenuItem>
                      </Select>
                      {coupon_type ?
                        <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                          Coupon type is required
                        </FormHelperText>
                        : ''
                      }
                    </FormControl>
                  </Box> */}

                        <Box sx={{ pt: 2 }}>
                          <FormControl fullWidth error={coupon_title} sx={{ ...theme.typography.customInput }}>
                            <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Coupon Title</InputLabel>
                            <OutlinedInput
                              type="text"
                              placeholder='Ex: winter 2021'
                              label="Coupon Title"
                              sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                              value={value.coupon_title}
                              onChange={(e) => onChangecoupon_title(e)}
                            />
                            {coupon_title ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Coupon title is required
                              </FormHelperText>
                              : ''
                            }
                          </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', pt: 2 }}>
                          <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="Start Date"
                                  inputFormat="MM/dd/yyyy"
                                  value={valueStartDate}
                                  onChange={handleChangeStartDate}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </Stack>
                            </LocalizationProvider>
                            {startdate ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Date is required
                              </FormHelperText>
                              : ''
                            }
                          </Box>
                          <Box sx={{ m: 0.5 }} />
                          <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="End Date"
                                  inputFormat="MM/dd/yyyy"
                                  value={valueEndDate}
                                  onChange={handleChangeEndDate}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </Stack>
                            </LocalizationProvider>
                            {expireddate ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Date is required
                              </FormHelperText>
                              : ''
                            }
                          </Box>
                        </Box>

                        <Box sx={{ pt: 2 }}>
                          <FormControl fullWidth error={coupon_precent} sx={{ ...theme.typography.customInput }}>
                            <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Coupon Percent</InputLabel>
                            <OutlinedInput
                              type="number"
                              label="Coupon Percent"
                              placeholder='Ex: 10'
                              sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                              value={value.coupon_precent}
                              onChange={(e) => onChangecoupon_precent(e)}
                              endAdornment={
                                <InputAdornment position="end">
                                  <PercentOutlinedIcon />
                                </InputAdornment>}
                            />
                            {coupon_precent ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Coupon precent  is required
                              </FormHelperText>
                              : ''
                            }
                          </FormControl>
                        </Box>

                        <Box sx={{ pt: 2 }}>
                          <FormControl fullWidth error={limit_singleuser} sx={{ ...theme.typography.customInput }}>
                            <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Limit for same user</InputLabel>
                            <OutlinedInput
                              type="number"
                              name="store"
                              label="Limit for same user"
                              placeholder='Ex: 10'
                              sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                              value={value.limit_singleuser}
                              onChange={(e) => onChangelimit_singleuser(e)}
                            />
                            {limit_singleuser ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Limit single user is required
                              </FormHelperText>
                              : ''
                            }
                          </FormControl>
                        </Box>

                        <Box sx={{ pt: 2 }}>
                          <Box sx={{ m: 1 }} />
                          <FormControl fullWidth error={upto_amount} sx={{ ...theme.typography.customInput }}>
                            <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Upto purchase amount</InputLabel>
                            <OutlinedInput
                              type="number"
                              name="store"
                              placeholder='Ex: 51'
                              label="Upto purchase amount"
                              sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                              value={value.upto_amount}
                              onChange={(e) => onChangeupto_amount(e)}
                              endAdornment={
                                <InputAdornment position="end">
                                  <CurrencyRupeeOutlinedIcon />
                                </InputAdornment>}
                            />
                            {upto_amount ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Upto purchase amount is required
                              </FormHelperText>
                              : ''
                            }
                          </FormControl>
                        </Box>
                        <Box sx={{ pt: 2 }}>
                          <Box sx={{ m: 1 }} />
                          <FormControl fullWidth error={minimum_purchase} sx={{ ...theme.typography.customInput }}>
                            <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Minimum purchase amount</InputLabel>
                            <OutlinedInput
                              type="number"
                              label="Minimum purchase amount"
                              sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                              value={value.minimum_purchase}
                              onChange={(e) => onChangeminimum_purchase(e)}
                              endAdornment={
                                <InputAdornment position="end">
                                  <CurrencyRupeeOutlinedIcon />
                                </InputAdornment>}
                            />
                            {minimum_purchase ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Minimum purchase amount is required
                              </FormHelperText>
                              : ''
                            }
                          </FormControl>
                        </Box>
                        <Box sx={{ pt: 2 }}>
                          <FormControl fullWidth error={coupon_code} sx={{ ...theme.typography.customInput }}>
                            <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Coupon Code</InputLabel>
                            <OutlinedInput
                              type="text"
                              label="Coupon Code"
                              placeholder='Ex: WINTER30'
                              sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                              value={value.coupon_code}
                              onChange={(e) => onChangecoupon_code(e)}
                            />
                            {coupon_code ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Coupon title is required
                              </FormHelperText>
                              : ''
                            }
                          </FormControl>
                        </Box>

                        <Box sx={{ pt: 5 }}>
                          <LoadingButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            onClick={(e) => onSubmit(e)}
                            sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
                          >
                            Submit
                          </LoadingButton>
                        </Box>

                      </Container>
                    </Box>
                  </>
              }
            </Box>
          </div>
        </Grow>
      </Box>
    </>
  )
}

export default CouponFrom


const CardWrapperGolden = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  width: '100%',
  height: 'auto',
  borderRadius: 10,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: 'blue',
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: 'blue',
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));
