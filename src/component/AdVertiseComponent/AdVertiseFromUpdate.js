import React from 'react';
import { Box, Slide, Grow, Container, Typography, FormControl, InputLabel, OutlinedInput, TextField, MenuItem, Button, styled, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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

const AdVertiseFromUpdate = ({ showSub, vendorCatList, vendorCatListLoader, showSubPaln }) => {
  const theme = useTheme();
  let Navigate = useIonRouter();
  const vendorbannerdata = sessionStorage.getItem('vendorbannerdata')
  const vendorbannerdataJSON = JSON.parse(vendorbannerdata)
  const vendor_id = localStorage.getItem('vendor_id');
  const [nav, setNav] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState(vendorbannerdataJSON.rowimageUrl);
  const [valueStartDate, setValueStartDate] = React.useState(new Date(vendorbannerdataJSON.startDate));
  const [valueEndDate, setValueEndDate] = React.useState(new Date(vendorbannerdataJSON.endDate));
  const [loader, setLoader] = React.useState(false);

  const [startdate, setStartdate] = React.useState(false)
  const [expireddate, setExpireddate] = React.useState(false)
  const [title, setTitle] = React.useState(false)
  const [categoryId, setCategoryId] = React.useState(false)
  const [adDescription, setAdDescription] = React.useState(false)
  const [rowMatter, setRowMatter] = React.useState(false)
  const [value, setValue] = React.useState({
    title: vendorbannerdataJSON.title,
    categoryId: vendorbannerdataJSON.categoryId,
    startDate: valueStartDate,
    endDate: valueEndDate,
    adDescription: vendorbannerdataJSON.adDescription,
    RowMatter: vendorbannerdataJSON.RowMatter,
  });
  // console.log(vendorbannerdataJSON)

  const onChangetitle = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, title: e.target.value });
      setTitle(false);
    } else {
      setValue({ ...value, title: e.target.value });
      setTitle(false)
    };
  }
  const onChangeadDescription = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, adDescription: e.target.value });
      setAdDescription(false);
    } else {
      setValue({ ...value, adDescription: e.target.value });
      setAdDescription(false)
    };
  }
  const onChangeRowMatter = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, RowMatter: e.target.value });
      setRowMatter(false);
    } else {
      setValue({ ...value, RowMatter: e.target.value });
      setRowMatter(false)
    };
  }

  React.useEffect(() => {
    if (value.categoryId === '') {
      // setCategories(true)
    } else {
      setCategoryId(false)
    }
  });
  React.useEffect(() => {
    if (value.startDate === '') {

    } else {
      setStartdate(false);
    }
  })
  React.useEffect(() => {
    if (value.endDate === '') {

    } else {
      setExpireddate(false)
    }
  })


  const handleChangeStartDate = (newValue) => {
    setValueStartDate(newValue);
    setValue({ ...value, startDate: newValue });
  };
  const handleChangeEndDate = (newValue) => {
    setValueEndDate(newValue);
    setValue({ ...value, endDate: newValue });
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
    if (checkStringNullEmpty(value.categoryId)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setCategoryId(true)
    }
    if (checkStringNullEmpty(value.startDate)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setStartdate(true)
    }
    if (checkStringNullEmpty(value.endDate)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setExpireddate(true)
    }
    if (checkStringNullEmpty(value.adDescription)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setAdDescription(true)
    }
    if (checkStringNullEmpty(value.RowMatter)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setRowMatter(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  const onBack = () => {
    Navigate.push(`/AdvertiseScrees`)
  }

  const photoUpload = (event) => {
    let files = event.target.files;
    //console.log(files)
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }
  };
  // console.log(imagePreview)\


  var updateAdvertiseJson = JSON.stringify({
    adBody: {
      adId: vendorbannerdataJSON.adId,
      vendor_id: vendor_id,
      // storeId: '',
      // store_name: '',
      // city: '',
      // zipcode: '',
      startDate: value.startDate,
      endDate: value.endDate,
      categoryId: value.categoryId,
      // category: '',
      title: value.title,
      // bannerUrl: '',
      adDescription: value.adDescription,
      // priority: '',
      // designBy: '',
      // verifiedBy: '',
      // isActive: '',
      RowMatter: value.RowMatter,
      rowimageUrl: imagePreview,
      // status: ''
    }
  });
  // console.log(updateAdvertiseJson)
  var config_updateAdvertise = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/updateAdvertise`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: updateAdvertiseJson
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    validatee();
    if (validation === '') {
      setLoader(true);
      await axios(config_updateAdvertise)
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
              window.location.replace('/AdvertiseScrees')
              setValue({ ...value, title: "", startDate: "", endDate: "", adDescription: "", RowMatter: "", })
              setLoader(false)
            }, 2000)
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
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Update</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Our Advertise</Typography>
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
                            <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
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
                            <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Ads category</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Ads category"
                                value={value.categoryId}
                                onChange={(e) => setValue({ ...value, categoryId: e.target.value })}
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
                              {categoryId ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Ads category is required
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
                            <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Ad description</InputLabel>
                              <OutlinedInput
                                type="text"
                                name="store"
                                label="Ad description"
                                multiline
                                rows={2}
                                sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                value={value.adDescription}
                                onChange={(e) => onChangeadDescription(e)}
                              />
                              {adDescription ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Ads description is required
                                </FormHelperText>
                                : ''
                              }
                            </FormControl>
                          </Box>
                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Input matter</InputLabel>
                              <OutlinedInput
                                type="text"
                                name="store"
                                label="Input matter"
                                multiline
                                rows={2}
                                sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                value={value.RowMatter}
                                onChange={(e) => onChangeRowMatter(e)}
                              />
                              {rowMatter ?
                                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                  Input matter is required
                                </FormHelperText>
                                : ''
                              }
                            </FormControl>
                          </Box>
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
                              <Button onClick={() => setImagePreview("")} size='small' sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}>Clear</Button>
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

export default AdVertiseFromUpdate;

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
