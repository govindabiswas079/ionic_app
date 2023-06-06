import React from 'react';
import { Box, Slide, Grow, Container, Typography, FormControl, InputLabel, OutlinedInput, FormHelperText, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CommonHeader from '../../navigators/CommonHeader';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const NotificationFrom = ({ showSub, showSubPaln }) => {
  const theme = useTheme();
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [nav, setNav] = React.useState(false);
  const [loader, setLoader] = React.useState(false)
  const [title, setTitle] = React.useState(false)
  const [message, setMessage] = React.useState(false)
  const [value, setValue] = React.useState({
    title: '',
    message: ''
  });

  const onChangeTitle = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, title: e.target.value });
      setTitle(false);
    } else {
      setValue({ ...value, title: e.target.value });
      setTitle(false)
    };
  }
  const onChangeMessage = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, message: e.target.value });
      setMessage(false);
    } else {
      setValue({ ...value, message: e.target.value });
      setMessage(false)
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
    if (checkStringNullEmpty(value.title)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setTitle(true)
    }
    if (checkStringNullEmpty(value.message)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setMessage(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  var create_Notificaction = JSON.stringify({
    msginfo: {
      type: "Notificaction",
      vendor_id: vendor_id,
      title: value.title,
      message: value.message,
      logo: "",
      urllink: ""
    }
  });
  // console.log(create_Notificaction)

  var create_Notificaction_config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/createnotifications`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: create_Notificaction
  };

  const onSubmitNotification = async (e) => {
    e.preventDefault()
    validatee();
    if (validation === '') {
      setLoader(true)
      const controller = new AbortController();
      const signal = controller.signal
      await axios(create_Notificaction_config, { signal: signal })
        .then(function (response) {
          // console.log(response.data)
          if (response.data.response.status === 1) {
            window.location.replace('/NotificationScreen')
            setValue({ ...value, title: '', message: '' })
            setLoader(false)
            //window.location.reload(false);
          } else {
            if (response.data.response.status === -1) {
              setLoader(false)
            } else {
              alert('somethig worng')
            }
          }
        })
        .catch(function (err) {
          setLoader(false)
          if (err.name === "AbortError") {
            console.log("successfully aborted");
          } else {
            console.log(err);
          }
        });
      return () => controller.abort();
    } else {

    }
  }

  const onBack = () => {
    Navigate.push(`/NotificationScreen`)
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
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Push Notification</Typography>
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
                          <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth error={title} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Title</InputLabel>
                              <OutlinedInput
                                type="text"
                                name="store"
                                placeholder='Ex: winter 2021'
                                label="Title"
                                value={value.title}
                                onChange={(e) => onChangeTitle(e)}
                                sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
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
                            <FormControl fullWidth error={message} sx={{ ...theme.typography.customInput }}>
                              <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Description</InputLabel>
                              <OutlinedInput
                                type="text"
                                name="store"
                                label="Description"
                                multiline
                                rows={3}
                                value={value.message}
                                onChange={(e) => onChangeMessage(e)}
                                placeholder='Ex: WINTER30'
                                sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                              />
                              {message ?
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
                              onClick={(e) => onSubmitNotification(e)}
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
      </IonContent>
    </IonPage>
  )
}

export default NotificationFrom

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
