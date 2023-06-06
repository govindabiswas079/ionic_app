import React from 'react';
import { Box, Slide, Grow, Container, Typography, FormControl, InputLabel, OutlinedInput, MenuItem, Button, TextField, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CommonHeader from '../../../navigators/CommonHeader';
import Select from '@mui/material/Select';
import { LoadingButton } from '@mui/lab';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../../ApiRequest'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const VendorDetailsUpdate = ({ nav, storeIdProps }) => {
  const theme = useTheme();
  let Navigate = useIonRouter();
  const VendorDetailsUpdateData = sessionStorage.getItem('VendorDetailsUpdateData');
  const VendorDetailsUpdateDataJson = JSON.parse(VendorDetailsUpdateData)
  const [openTimeValue, setopenTimeValue] = React.useState(VendorDetailsUpdateDataJson?.open_time);
  const [closeTimeValue, setcloseTimeValue] = React.useState(VendorDetailsUpdateDataJson?.close_time);
  const [loader, setLoader] = React.useState(false)
  const [store_name, setStore_name] = React.useState(false)
  const [categories, setCategories] = React.useState(false)
  const [description, setDescription] = React.useState(false)

  const [store_mobile, setStore_mobile] = React.useState(false);
  const [open_time, setOpen_time] = React.useState(false);
  const [close_time, setClose_time] = React.useState(false);
  const [value, setValue] = React.useState({
    store_name: VendorDetailsUpdateDataJson?.store_name,
    categories: VendorDetailsUpdateDataJson?.cat_id,
    gstin_Number: VendorDetailsUpdateDataJson?.gst_no,
    description: VendorDetailsUpdateDataJson?.description,
    status: 'Open',
    store_mobile: VendorDetailsUpdateDataJson?.store_mobile,
    store_landline: VendorDetailsUpdateDataJson?.store_landline,
    open_time: VendorDetailsUpdateDataJson?.open_time,
    close_time: VendorDetailsUpdateDataJson?.close_time,
    weekoffday: VendorDetailsUpdateDataJson?.weekoffday,
    store_logo: VendorDetailsUpdateDataJson?.store_logo,
  });

  // console.log(JSON.stringify(new Date(openTimeValue).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })));
  // console.log(JSON.stringify(openTimeValue));
  // new Date(openTimeValue).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})

  const handleChangeOpen = (newValue) => {
    setopenTimeValue(newValue/* .toLocaleTimeString('en-US') */);
    setValue({ ...value, open_time: openTimeValue/* .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', }) */ });
  };
  const handleChangeclose = (newValue) => {
    setcloseTimeValue(newValue);
    setValue({ ...value, close_time: closeTimeValue/* .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', }) */ });
  };

  const onChangeStore_name = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, store_name: e.target.value });
      setStore_name(false);
    } else {
      setValue({ ...value, store_name: e.target.value });
      setStore_name(false)
    };
  }
  const onChangeStore_mobile = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, store_mobile: e.target.value });
      setStore_mobile(false);
    } else {
      setValue({ ...value, store_mobile: e.target.value });
      setStore_mobile(false)
    };
  }
  const onChangeStore_landline = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, store_landline: e.target.value });
    } else {
      setValue({ ...value, store_landline: e.target.value });
    };
  }

  React.useEffect(() => {
    if (value.categories === '') {

    } else {
      setCategories(false)
    }
  })
  React.useEffect(() => {
    if (value.open_time === '') {

    } else {
      setOpen_time(false)
    }
  })
  React.useEffect(() => {
    if (value.close_time === '') {

    } else {
      setClose_time(false)
    }
  })

  const onChangeGstin_Number = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, gstin_Number: e.target.value });
    } else {
      setValue({ ...value, gstin_Number: e.target.value });
    };
  }
  const onChangeDescription = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, description: e.target.value });
      setDescription(false);
    } else {
      setValue({ ...value, description: e.target.value });
      setDescription(false)
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
    if (checkStringNullEmpty(value.store_name)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setStore_name(true)
    }
    if (checkStringNullEmpty(value.categories)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setCategories(true)
    }
    if (checkStringNullEmpty(value.description)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDescription(true)
    }
    if (checkStringNullEmpty(value.store_mobile)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setStore_mobile(true)
    }
    if (checkStringNullEmpty(value.open_time)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setOpen_time(true)
    }
    if (checkStringNullEmpty(value.close_time)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setClose_time(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  // const nowOpen = new Date(value.open_time);
  // const withOpenTime = nowOpen.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', });
  // const nowClose = new Date(value.close_time);
  // const withCloseTime = nowClose.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', });

  const photoUpload = (event) => {
    let files = event.target.files;
    //console.log(files)
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setValue({ ...value, store_logo: e.target.result })
    }
  };

  const vendor_id = localStorage.getItem('vendor_id')
  const latitude = localStorage.getItem('lat');
  const longitude = localStorage.getItem('lng');
  var Online_Store_update = JSON.stringify({
    sinfo: {
      store_id: storeIdProps,
      vendor_id: vendor_id,
      cat_id: value.categories,
      store_name: value.store_name,
      store_mobile: value.store_mobile,
      store_landline: value.store_landline,
      open_time: new Date(value.open_time).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' }),
      close_time: new Date(value.close_time).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' }),
      description: value.description,
      status: "",
      weekoffday: value.weekoffday,
      store_logo: value.store_logo,
      gst_no: value.gstin_Number,
      co_ordinates: `${latitude}, ${longitude}`
    }
  });
  // console.log(Online_Store_update)

  var config_update = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/updatestore`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: Online_Store_update
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    validatee();
    if (validation === '') {
      setLoader(true);
      await axios(config_update)
        .then(function (response) {
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
              Navigate.push('/VendorDetails')
              sessionStorage.removeItem('VendorDetailsUpdateData')
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
    sessionStorage.removeItem('VendorDetailsUpdateData')
    Navigate.push(`/VendorDetails`)
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
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader onBack={onBack} nav={nav} />

          <Grow in>
            <div>
              <Box sx={{ pt: 10 }}>
                <Container>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Update </Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Merchant Details</Typography>
                </Container>

                <Box>
                  <Container sx={{ pb: 2 }}>
                    <Box sx={{ pt: 5 }}>
                      <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                        <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Store Name</InputLabel>
                        <OutlinedInput
                          type="text"
                          name="store"
                          label="Store Name"
                          value={value.store_name}
                          onChange={(e) => onChangeStore_name(e)}
                          sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                        />
                        {store_name ?
                          <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                            Store name is required
                          </FormHelperText>
                          : ''
                        }
                      </FormControl>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                        <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Categories</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Categories"
                          value={value.categories}
                          onChange={(e) => setValue({ ...value, categories: e.target.value })}
                        >
                          {catlist.map((value, id) => (
                            <MenuItem key={id} value={value.cat_id}>{value.category}</MenuItem>
                          ))}

                        </Select>
                        {categories ?
                          <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                            Categories name is required
                          </FormHelperText>
                          : ''
                        }
                      </FormControl>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                        <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>GSTIN Number</InputLabel>
                        <OutlinedInput
                          type="text"
                          name="store"
                          label="GSTIN Number"
                          value={value.gstin_Number}
                          onChange={(e) => onChangeGstin_Number(e)}
                          sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                        />
                      </FormControl>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                        <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Merchant mobile</InputLabel>
                        <OutlinedInput
                          type="number"
                          label="Merchant mobile"
                          name='number'
                          value={value.store_mobile}
                          onChange={(e) => onChangeStore_mobile(e)}
                          sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                          inputComponent={TextMaskCustomMobile}
                        />
                        {store_mobile ?
                          <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                            store mobile is required
                          </FormHelperText>
                          : ''
                        }
                      </FormControl>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                        <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Merchant landline</InputLabel>
                        <OutlinedInput
                          type="number"
                          name='number'
                          label="Merchant landline"
                          value={value.store_landline}
                          onChange={(e) => onChangeStore_landline(e)}
                          sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                          inputComponent={TextMaskCustomLandline}
                        />
                      </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', pt: 2, justifyContent: 'center' }}>
                      <Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack spacing={3}>
                            <TimePicker
                              label="Open Time"
                              value={openTimeValue}
                              onChange={handleChangeOpen}
                              renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                          </Stack>
                        </LocalizationProvider>
                        {open_time ?
                          <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                            Open Time is required
                          </FormHelperText>
                          : ''
                        }
                      </Box>
                      <Box sx={{ m: 0.2 }} />
                      <Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack spacing={3}>
                            <TimePicker
                              label="Close Time"
                              value={closeTimeValue}
                              onChange={handleChangeclose}
                              renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                          </Stack>
                        </LocalizationProvider>
                        {close_time ?
                          <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                            Close Time is required
                          </FormHelperText>
                          : ''
                        }
                      </Box>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                        <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Off day</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Off day"
                          value={value.weekoffday}
                          onChange={(e) => setValue({ ...value, weekoffday: e.target.value })}
                        >
                          {weekday.map((value, id) => (
                            <MenuItem key={id} value={value.day}>{value.day}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                        <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Description</InputLabel>
                        <OutlinedInput
                          type="text"
                          name="store"
                          label="Description"
                          multiline
                          rows={4}
                          value={value.description}
                          onChange={(e) => onChangeDescription(e)}
                          sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                        />
                        {description ?
                          <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                            Description is required
                          </FormHelperText>
                          : ''
                        }
                      </FormControl>
                    </Box>
                    <Box sx={{ pt: 2 }}>
                      <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Outlet profile</InputLabel>
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
                        <Button onClick={() => setValue({ ...value, store_logo: "" })} size='small' sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}>Clear</Button>
                      </Box>
                    </Box>

                    <Box sx={{ pt: 5 }}>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={false}
                        onClick={(e) => onSubmit(e)}
                        sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
                      >
                        Update
                      </LoadingButton>
                    </Box>
                  </Container>
                </Box>
              </Box>
            </div>
          </Grow>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default VendorDetailsUpdate;




const catlist = [
  {
    cat_id: 1,
    category: "Food And Restaurant",
    isactive: true
  },
  {
    cat_id: 2,
    category: "Cafe",
    isactive: true
  },
  {
    cat_id: 3,
    category: "Clothing",
    isactive: true
  },
  {
    cat_id: 4,
    category: "Footware",
    isactive: true
  },
  {
    cat_id: 5,
    category: "Beauty Products",
    isactive: true
  },
  {
    cat_id: 6,
    category: "Mobile And Accessories",
    isactive: true
  },
  {
    cat_id: 7,
    category: "Computer Hardware And Accessories",
    isactive: true
  },
  {
    cat_id: 8,
    category: "Jewellary",
    isactive: true
  },
  {
    cat_id: 9,
    category: "Toy And Games",
    isactive: true
  },
  {
    cat_id: 10,
    category: "Baby Care Products",
    isactive: true
  },
  {
    cat_id: 11,
    category: "Salons",
    isactive: true
  }
];
const weekday = [
  { id: 0, day: "Sunday" },
  { id: 1, day: "Monday" },
  { id: 2, day: "Tuesday" },
  { id: 3, day: "Wednesday" },
  { id: 4, day: "Thursday" },
  { id: 5, day: "Friday" },
  { id: 6, day: "Saturday" }
];

const TextMaskCustomMobile = React.forwardRef(function TextMaskCustomMobile(props, ref) {
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

TextMaskCustomMobile.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const TextMaskCustomLandline = React.forwardRef(function TextMaskCustomLandline(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00000000000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustomLandline.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
