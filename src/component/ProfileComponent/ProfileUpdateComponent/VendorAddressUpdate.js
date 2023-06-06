import React from 'react';
import { Box, Slide, Grow, Container, Typography, FormControl, InputLabel, OutlinedInput, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CommonHeader from '../../../navigators/CommonHeader';
import { LoadingButton } from '@mui/lab';
import { toast, ToastContainer } from 'react-toastify';
import { ApiRequestUrl } from '../../../ApiRequest';

import { FormHelperText } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { IonContent, IonPage, useIonRouter } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const VendorAddressUpdate = ({ nav, addrIdProps, storeIdProps, lat, lng }) => {
  let Navigate = useIonRouter()
  const theme = useTheme();
  const VendorAddressUpdateData = sessionStorage.getItem('VendorAddressUpdateData')
  const VendorAddressUpdateDataJson = JSON.parse(VendorAddressUpdateData)
  const [loader, setLoader] = React.useState(false)
  const [pin_Code, setPin_Code] = React.useState(false)
  const [state, setState] = React.useState(false)
  const [district, setDistrict] = React.useState(false)
  const [thasil, setThasil] = React.useState(false)
  const [city, setCity] = React.useState(false)
  const [street_address, setStreet_address] = React.useState(false)
  const [value, setValue] = React.useState({
    pin_Code: VendorAddressUpdateDataJson?.zipcode,
    state: VendorAddressUpdateDataJson?.state,
    district: VendorAddressUpdateDataJson?.district,
    thasil: VendorAddressUpdateDataJson?.tehsil,
    city: VendorAddressUpdateDataJson?.city,
    street_address: VendorAddressUpdateDataJson?.address
  });

  const onChangePin_Code = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, pin_Code: e.target.value });
      setPin_Code(false);
    } else {
      setValue({ ...value, pin_Code: e.target.value });
      setPin_Code(false)
    };
  }
  const onChangeState = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, state: e.target.value });
      setState(false);
    } else {
      setValue({ ...value, state: e.target.value });
      setState(false)
    };
  }
  const onChangeDistrict = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, district: e.target.value });
      setDistrict(false);
    } else {
      setValue({ ...value, district: e.target.value });
      setDistrict(false)
    };
  }
  const onChangeThasil = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, thasil: e.target.value });
      setThasil(false);
    } else {
      setValue({ ...value, thasil: e.target.value });
      setThasil(false)
    };
  }
  const onChangeCity = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, city: e.target.value });
      setCity(false);
    } else {
      setValue({ ...value, city: e.target.value });
      setCity(false)
    };
  }
  const onChangeStreet_address = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, street_address: e.target.value });
      setStreet_address(false);
    } else {
      setValue({ ...value, street_address: e.target.value });
      setStreet_address(false)
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
    if (checkStringNullEmpty(value.pin_Code)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setPin_Code(true)
    }
    if (checkStringNullEmpty(value.state)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setState(true)
    }
    if (checkStringNullEmpty(value.district)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDistrict(true)
    }
    if (checkStringNullEmpty(value.thasil)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setThasil(true)
    }
    if (checkStringNullEmpty(value.city)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setCity(true)
    }
    if (checkStringNullEmpty(value.street_address)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setStreet_address(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  var storeaddress = JSON.stringify({
    addrinfo: {
      addr_id: addrIdProps,
      store_id: storeIdProps,
      country: "India",
      state: value.state,
      district: value.district,
      tehsil: value.thasil,
      city: value.city,
      zipcode: value.pin_Code,
      address: value.street_address,
      co_ordinates: `${lat}, ${lng}`
    }
  });
  // console.log(storeaddress)

  var config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/updateaddress`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: storeaddress
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const signal = controller.signal
    validatee();
    if (validation === '') {
      setLoader(true);
      await axios(config, { signal: signal })
        .then(function (response) {
          //console.log(response.data)
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
              setLoader(false)
              sessionStorage.removeItem('VendorAddressUpdateData')
              Navigate.push('/ProfileScreen')
            }, 2000)
          } else {
            alert('somthing wrong');
          }
        })
        .catch(function (error) {
          setLoader(false)
          // console.log(error);
          // alert(error)
        });
      return () => controller.abort();
    } else {

    }
  }

  const onBack = () => {
    sessionStorage.removeItem('VendorAddressUpdateData')
    Navigate.push(`/ProfileScreen`)
  }
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
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Update</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Store Address</Typography>
                </Container>
              </Box>

              <Container sx={{ pt: 2 }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53231.962811927515!2d-117.15726395005734!3d33.5014375970648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db6252f51abe23%3A0x68bc0e88a03806a8!2sTemecula%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1623665123540!5m2!1sen!2sin" style={{ width: '100%', height: '100%', borderRadius: '10px', border: 'none' }} ></iframe>
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53231.962811927515!2d-117.15726395005734!3d33.5014375970648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db6252f51abe23%3A0x68bc0e88a03806a8!2sTemecula%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1623665123540!5m2!1sen!2sin" style={{ width: '100%', height: '100%', borderRadius: '10px', border: 'none' }} ></iframe> */}
              </Container>

              <Box>
                <Container sx={{ pb: 2 }}>
                  <Box sx={{ pt: 3 }}>
                    <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                      <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Pin Code</InputLabel>
                      <OutlinedInput
                        type="number"
                        name="store"
                        label="Pin Code"
                        value={value.pin_Code}
                        onChange={(e) => onChangePin_Code(e)}
                        sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                        inputComponent={TextMaskCustom}
                      />
                      {pin_Code ?
                        <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                          pin code is required
                        </FormHelperText>
                        : ''
                      }
                    </FormControl>
                  </Box>

                  <Box sx={{ pt: 2 }}>
                    <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                      <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>State</InputLabel>
                      <OutlinedInput
                        type="text"
                        name="store"
                        label="State"
                        value={value.state}
                        onChange={(e) => onChangeState(e)}
                        sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                      />
                      {state ?
                        <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                          State is required
                        </FormHelperText>
                        : ''
                      }
                    </FormControl>
                  </Box>

                  <Box sx={{ pt: 2 }}>
                    <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                      <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>District</InputLabel>
                      <OutlinedInput
                        type="text"
                        name="store"
                        label="District"
                        value={value.district}
                        onChange={(e) => onChangeDistrict(e)}
                        sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                      />
                      {district ?
                        <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                          District is required
                        </FormHelperText>
                        : ''
                      }
                    </FormControl>
                  </Box>

                  <Box sx={{ pt: 2 }}>
                    <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                      <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Thasil</InputLabel>
                      <OutlinedInput
                        type="text"
                        name="store"
                        label="Thasil"
                        value={value.thasil}
                        onChange={(e) => onChangeThasil(e)}
                        sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                      />
                      {thasil ?
                        <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                          Thasil is required
                        </FormHelperText>
                        : ''
                      }
                    </FormControl>
                  </Box>

                  <Box sx={{ pt: 2 }}>
                    <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                      <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>City</InputLabel>
                      <OutlinedInput
                        type="text"
                        name="store"
                        label="City"
                        sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                        value={value.city}
                        onChange={(e) => onChangeCity(e)}
                      />
                      {city ?
                        <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                          City is required
                        </FormHelperText>
                        : ''
                      }
                    </FormControl>
                  </Box>

                  <Box sx={{ pt: 2 }}>
                    <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                      <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Street Address</InputLabel>
                      <OutlinedInput
                        type="text"
                        name="store"
                        label="Street Address"
                        value={value.street_address}
                        onChange={(e) => onChangeStreet_address(e)}
                        sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                      />
                      {street_address ?
                        <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                          Thasil is required
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
                      Update
                    </LoadingButton>
                  </Box>
                </Container>
              </Box>
            </div>
          </Grow>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default VendorAddressUpdate;

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000000"
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