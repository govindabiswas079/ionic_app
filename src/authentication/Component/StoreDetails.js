import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Container, OutlinedInput, InputLabel, FormControl, Grow, IconButton, Avatar, FormHelperText, Select, MenuItem } from '@mui/material';
import logo from '../../img/logo.png';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { IonContent, useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const StoreDetails = ({ lat, lng }) => {
  let Navigate = useIonRouter()
  const theme = useTheme();

  const [loader, setLoader] = useState(false);
  const [store_name, setStore_name] = React.useState(false)
  const [categories, setCategories] = React.useState(false)
  const [description, setDescription] = React.useState(false)
  const [value, setValue] = useState({
    store_name: '',
    categories: '',
    gstin_Number: '',
    description: ''
  });

  const onChangeStore_name = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, store_name: e.target.value });
      setStore_name(false);
    } else {
      setValue({ ...value, store_name: e.target.value });
      setStore_name(false)
    };
  }

  React.useEffect(() => {
    if (value.categories === '') {
      // setCategories(true)
    } else {
      setCategories(false)
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
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  const vendor_id = localStorage.getItem('vendor_id')
  const latitude = localStorage.getItem('lat');
  const longitude = localStorage.getItem('lng');
  var Online_Store = JSON.stringify({
    sinfo: {
      vendor_id: vendor_id,
      cat_id: value.categories,
      store_name: value.store_name,
      store_mobile: "",
      store_landline: "",
      open_time: "",
      close_time: "",
      description: value.description,
      status: "",
      weekoffday: "",
      store_logo: "",
      gst_no: value.gstin_Number,
      co_ordinates: `${lat}, ${lng}`

    }
  });
  console.log(Online_Store)

  var config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/addstore`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: Online_Store
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    validatee();
    if (validation === '') {
      setLoader(true);
      await axios(config)
        .then(function (response) {
          console.log(response.data)
          // localStorage.setItem('addstore', response.data.otp)
          var status = response.data.response.status
          if (status === 1) {
            window.location.replace('/StoreAddress')
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

  return (
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
              <IconButton onClick={() => Navigate.push('/SignIn')}>
                <KeyboardBackspaceIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Grow in>
          <div>
            <Box sx={{ pt: 10 }}>
              <Container>
                <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Create</Typography>
                <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Online Store</Typography>
              </Container>
            </Box>

            <Box >
              <Container sx={{ pb: 2 }}>
                <Box sx={{ pt: 5 }}>
                  <FormControl fullWidth error={store_name} sx={{ ...theme.typography.customInput }}>
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
                  <FormControl fullWidth error={categories} sx={{ ...theme.typography.customInput }}>
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
                  <FormControl fullWidth error={description} sx={{ ...theme.typography.customInput }}>
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
                <Box sx={{ pt: 5 }}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={false}
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
      </Box>
    </IonContent>
  )
}

export default StoreDetails;


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





/* var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });
  var config_vendor_id = {
    method: 'post',
    url: sanitizeUrl(`http://codefeverllp.com/katta/API.svc/vinfo`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vinfo
  };
  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await axios(config_vendor_id, { signal: signal })
      .then(function (response) {
        // console.log(response.data.vinfo.vendor_id)
        if (response.data.response.status === 1) {
          setVinfo(response.data.vinfo.vendor_id)
        }
      })
      .catch(function (error) {
        if (error.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(error);
        }
      });
    return () => controller.abort();
  }, []) */


/* React.useEffect(() => {
  if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by your browser');
  } else {
    setStatus('Locating...');
    navigator.geolocation.getCurrentPosition((position) => {
      const data = position.coords;
      const latitude = data.latitude;
      const longitude = data.longitude

      setStatus(null);
      setLat(latitude);
      setLng(longitude);
    }, () => {
      setStatus('Unable to retrieve your location');
    });
  }
}); */