import React from 'react';
import { Box, Slide, Grow, Container, Typography, FormControl, InputLabel, OutlinedInput, TextField, MenuItem, Button, styled, FormHelperText, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CommonHeader from '../../navigators/CommonHeader';
import Select from '@mui/material/Select';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const DiscountAdvertisementFrom = ({ showSub, storeinfo, vendorCatList, vendorCatListLoader, showSubPaln }) => {
  const theme = useTheme();
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [nav, setNav] = React.useState(false);
  const [valueStartDate, setValueStartDate] = React.useState(null);
  const [valueEndDate, setValueEndDate] = React.useState(null);
  const [loader, setLoader] = React.useState(false)
  const [title, setTitle] = React.useState(false);
  const [category_id, setCategory_id] = React.useState(false);
  const [startdate_str, setStartdate_str] = React.useState(false);
  const [expireddate_str, setExpireddate_str] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [row_instructions, setRow_instructions] = React.useState(false);
  const [dis_percentage, setDis_percentage] = React.useState(false);
  const [min_perchase_amt, setMin_perchase_amt] = React.useState(false);
  const [single_user_count, setSingle_user_count] = React.useState(false);
  const [discount_type, setDiscount_type] = React.useState(false);
  const [product_name, setProduct_name] = React.useState(false);
  const [setProductName, setSetProductName] = React.useState(false);
  const [value, setValue] = React.useState({
    title: "",
    category_id: storeinfo.cat_id,
    startdate_str: "",
    expireddate_str: "",
    message: "",
    row_instructions: "",
    discount_type: "",
    dis_percentage: "",
    min_perchase_amt: "",
    single_user_count: "",
    product_name: "",
    product_imgurl: ""
  });

  // console.log(value.product_name)
  // console.log(setProductNameValue)

  const onChangetitle = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, title: e.target.value });
      setTitle(false);
    } else {
      setValue({ ...value, title: e.target.value });
      setTitle(false)
    };
  }
  const onChangeadMessage = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, message: e.target.value });
      setMessage(false);
    } else {
      setValue({ ...value, message: e.target.value });
      setMessage(false)
    };
  }

  const onChangeRow_instructions = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, row_instructions: e.target.value });
      setRow_instructions(false);
    } else {
      setValue({ ...value, row_instructions: e.target.value });
      setRow_instructions(false)
    };
  }
  const onChangeDis_percentage = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, dis_percentage: e.target.value });
      setDis_percentage(false);
    } else {
      setValue({ ...value, dis_percentage: e.target.value });
      setDis_percentage(false)
    };
  }
  const onChangeMin_perchase_amt = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, min_perchase_amt: e.target.value });
      setMin_perchase_amt(false);
    } else {
      setValue({ ...value, min_perchase_amt: e.target.value });
      setMin_perchase_amt(false)
    };
  }
  const onChangeSingle_user_count = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, single_user_count: e.target.value });
      setSingle_user_count(false);
    } else {
      setValue({ ...value, single_user_count: e.target.value });
      setSingle_user_count(false)
    };
  }

  const onChangeProduct_name = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, product_name: e.target.value });
      setProduct_name(false);
    } else {
      setValue({ ...value, product_name: e.target.value });
      setProduct_name(false)
    };
  }

  React.useEffect(() => {
    if (value.category_id === '') {
      // setCategories(true)
    } else {
      setCategory_id(false)
    }
  });
  React.useEffect(() => {
    if (value.discount_type === '') {
      // setCategories(true)
    } else {
      setDiscount_type(false)
    }
  });
  React.useEffect(() => {
    if (value.startdate_str === '') {

    } else {
      setStartdate_str(false);
    }
  })
  React.useEffect(() => {
    if (value.expireddate_str === '') {

    } else {
      setExpireddate_str(false)
    }
  })


  const handleChangeStartDate = (newValue) => {
    setValueStartDate(newValue);
    setValue({ ...value, startdate_str: newValue });
  };
  const handleChangeEndDate = (newValue) => {
    setValueEndDate(newValue);
    setValue({ ...value, expireddate_str: newValue });
  };

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

  var validation = '';
  const validatee = () => {
    if (checkStringNullEmpty(value.title)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setTitle(true)
    }
    if (checkStringNullEmpty(value.category_id)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setCategory_id(true)
    }
    if (checkStringNullEmpty(value.startdate_str)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setStartdate_str(true)
    }
    if (checkStringNullEmpty(value.expireddate_str)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setExpireddate_str(true)
    }
    if (checkStringNullEmpty(value.message)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setMessage(true)
    }
    if (checkStringNullEmpty(value.row_instructions)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setRow_instructions(true)
    }
    if (checkStringNullEmpty(value.dis_percentage)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDis_percentage(true)
    }
    if (checkStringNullEmpty(value.min_perchase_amt)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setMin_perchase_amt(true)
    }
    if (checkStringNullEmpty(value.single_user_count)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSingle_user_count(true)
    }
    if (checkStringNullEmpty(value.discount_type)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDiscount_type(true)
    }
    /* if (checkStringNullEmpty(value.product_name)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setProduct_name(true)
    } */
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  const onBack = () => {
    Navigate.push(`/DiscountAdvertisementScreen`)
  }

  const photoUpload = (event) => {
    let files = event.target.files;
    //console.log(files)
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setValue({ ...value, product_imgurl: e.target.result })
    }
  };
  // console.log(imagePreview)\


  var AdVertiseFromJson = JSON.stringify({
    discInfo: {
      vendor_id: vendor_id,
      title: value.title,
      category_id: value.category_id,
      startdate_str: value.startdate_str,
      expireddate_str: value.expireddate_str,
      message: value.message,
      row_instructions: value.row_instructions,
      discount_type: value.discount_type,
      dis_percentage: value.dis_percentage,
      min_perchase_amt: value.min_perchase_amt,
      single_user_count: value.single_user_count,
      product_name: value.product_name,
      product_imgurl: value.product_imgurl,
    }
  });
  // console.log(AdVertiseFromJson)
  var config_AdVertise = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/cretediscAdvertise`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: AdVertiseFromJson
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    validatee();
    if (validation === '') {
      console.log('response')
      setLoader(true);
      await axios(config_AdVertise)
        .then(function (response) {
          console.log(response)
          var status = response.data.response.status
          if (status === 1) {
            toast('Successfully Created', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.replace('/DiscountAdvertisementScreen');
              setValue({ ...value, title: "", category_id: "", startdate_str: "", expireddate_str: "", message: "", row_instructions: "", discount_type: "", dis_percentage: "", min_perchase_amt: "", single_user_count: "", product_name: "", product_imgurl: "" })
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


  const VendorSubscription = (e) => {
    sessionStorage.setItem('VendorSubscription', e)
    setTimeout(() => {
      Navigate.push('/VendorSubscription');
    }, 100)
  }


  React.useEffect(() => {
    if (value.discount_type === 'Product') {
      setSetProductName(true)
    } else {
      setSetProductName(false)
    }
  });

  const changeBackground = (e) => {
    if (e.detail.scrollTop === 0) {
      setNav(false)
    } else {
      setNav(true)
    }
  }

  return (
    <IonPage>
      <IonContent scrollEvents={true} onIonScroll={(e) => changeBackground(e)}>
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
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader onBack={onBack} nav={nav} />

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
              <Box sx={{ pt: 10 }}>
                <Container>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Create</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Discount Advertise</Typography>
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
                        <Container sx={{ pb: 3 }}>
                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={title} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Title</InputLabel>
                              <OutlinedInput
                                type="text"
                                name="store"
                                placeholder='Ex: winter 2021'
                                label="Title"
                                sx={{ fontFamily: 'Nunito', fontWeight: '700', }}
                                value={value.title}
                                onChange={(e) => onChangetitle(e)}
                              />
                              {title ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Title is required
                                </FormHelperText>
                                : ''
                              }
                            </FormControl>
                          </Box>

                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={category_id} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Ads category</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Ads category"
                                value={value.category_id}
                                onChange={(e) => setValue({ ...value, category_id: e.target.value })}
                              >
                                {vendorCatListLoader ?
                                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                                    <CircularProgress />
                                  </Box>
                                  :
                                  vendorCatList.length === 0 ?
                                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                                      <CircularProgress />
                                    </Box>
                                    :
                                    vendorCatList.map((value, id) => (
                                      <MenuItem key={id} value={value.cat_id}>{value.category}</MenuItem>
                                    ))}
                              </Select>
                              {category_id ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Category is required
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
                                {startdate_str ?
                                  <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                    Start date is required
                                  </FormHelperText>
                                  : ''
                                }
                              </LocalizationProvider>
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
                                {expireddate_str ?
                                  <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                    Expire date is required
                                  </FormHelperText>
                                  : ''
                                }
                              </LocalizationProvider>
                            </Box>
                          </Box>
                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={message} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Ad description</InputLabel>
                              <OutlinedInput
                                type="text"
                                name="store"
                                label="Ad description"
                                multiline
                                rows={2}
                                sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                value={value.message}
                                onChange={(e) => onChangeadMessage(e)}
                              />
                              {message ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Message date is required
                                </FormHelperText>
                                : ''
                              }
                            </FormControl>
                          </Box>
                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={row_instructions} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Instructions</InputLabel>
                              <OutlinedInput
                                type="text"
                                label="Instructions"
                                multiline
                                rows={2}
                                sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                value={value.row_instructions}
                                onChange={(e) => onChangeRow_instructions(e)}
                              />
                              {row_instructions ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Instruction is required
                                </FormHelperText>
                                : ''
                              }
                            </FormControl>
                          </Box>
                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={discount_type} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Discount Type</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Discount Type"
                                value={value.discount_type}
                                onChange={(e) => setValue({ ...value, discount_type: e.target.value })}
                              >
                                <MenuItem value="Amount">Amount</MenuItem>
                                <MenuItem value="Product">Product</MenuItem>
                              </Select>
                              {discount_type ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Discount type is required
                                </FormHelperText>
                                : ''
                              }
                            </FormControl>
                          </Box>
                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={dis_percentage} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Discount %</InputLabel>
                              <OutlinedInput
                                type="number"
                                label="Discount %"
                                sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                value={value.dis_percentage}
                                onChange={(e) => onChangeDis_percentage(e)}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <PercentOutlinedIcon />
                                  </InputAdornment>}
                              />
                              {dis_percentage ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Discount is required
                                </FormHelperText>
                                : ''
                              }
                            </FormControl>
                          </Box>
                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={min_perchase_amt} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Minimum Purchase Amount</InputLabel>
                              <OutlinedInput
                                type="number"
                                name="store"
                                label="Minimum Purchase Amount"
                                sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                value={value.min_perchase_amt}
                                onChange={(e) => onChangeMin_perchase_amt(e)}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <CurrencyRupeeOutlinedIcon />
                                  </InputAdornment>}
                              />
                              {min_perchase_amt ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Min amount is required
                                </FormHelperText>
                                : ''
                              }
                            </FormControl>
                          </Box>
                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={single_user_count} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Limt for same user</InputLabel>
                              <OutlinedInput
                                type="number"
                                name="store"
                                label="Limt for same user"
                                sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                value={value.single_user_count}
                                onChange={(e) => onChangeSingle_user_count(e)}
                              />
                              {single_user_count ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  User Limit is required
                                </FormHelperText>
                                : ''
                              }
                            </FormControl>
                          </Box>

                          {setProductName ?
                            <Grow in>
                              <div>
                                <Box sx={{ pt: 2 }}>
                                  <FormControl fullWidth error={product_name} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Product Name</InputLabel>
                                    <OutlinedInput
                                      type="text"
                                      name="store"
                                      label="Product Name"
                                      sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                      value={value.product_name}
                                      onChange={(e) => onChangeProduct_name(e)}
                                    />
                                  </FormControl>
                                </Box>
                              </div>
                            </Grow>
                            :
                            ''
                          }

                          <Box sx={{ pt: 2 }}>
                            <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Raw design</InputLabel>
                            <Box sx={{ display: 'flex', }}>
                              <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                                <OutlinedInput
                                  type="file"
                                  name="store"
                                  sx={{ fontFamily: 'Nunito', fontWeight: '700', backgroundColor: 'blue' }}
                                  onChange={photoUpload}
                                />
                              </FormControl>
                              <Box sx={{ m: 1 }} />
                              <Button onClick={() => setValue({ ...value, product_imgurl: "" })} size='small' sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}>Clear</Button>
                            </Box>
                          </Box>

                          <Box sx={{ pt: 5 }}>
                            <LoadingButton
                              fullWidth
                              type="submit"
                              variant="contained"
                              loading={loader}
                              disabled={false}
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
            </div >
          </Grow >
        </Box >
      </IonContent>
    </IonPage>
  )
}

export default DiscountAdvertisementFrom;

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
