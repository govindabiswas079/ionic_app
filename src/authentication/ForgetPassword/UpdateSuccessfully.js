import React, { useState } from 'react';
import { AppBar, Toolbar, Avatar, Box, Grow, styled, Typography, Container, Stack, Chip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LoadingButton } from '@mui/lab';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../img/logo.png';
// import updateimg from '../../img/update.png';
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

const UpdateSuccessfully = () => {
  let Navigate = useIonRouter()
  const [loader, setLoader] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      Navigate.push('/SignIn')
    }, 30000)
  })

  const onSubmit = () => {
    setLoader(true)
    setTimeout(() => {
      Navigate.push('/SignIn')
      setLoader(false)
    }, 1000)
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
              <Stack direction="row" spacing={1} onClick={() => onSubmit()}>
                <Chip
                  icon={<AccountCircleIcon sx={{ color: 'red' }} />}
                  label={'sign in'}
                  variant="outlined"
                  sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '600' }}
                />
              </Stack>
            </Toolbar>
          </AppBar>

          <Grow in>
            <div>
              <Box sx={{ pt: 8 }}>
                <Container>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="400.994" height="300.173" viewBox="0 0 442.994 323.173"
                    className="thankyoubg mb-4">
                    <defs>
                      <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1"
                        gradientUnits="objectBoundingBox">
                        <stop offset="0" stopColor="#09b2fd" />
                        <stop offset="1" stopColor="#6b00e5" />
                      </linearGradient>
                    </defs>
                    <path id="password-bg"
                      d="M777.689,326.922c-33.846,30-40.769,106.154-96.153,104.615S640.766,400,563.844,372.306,494.285,294.077,528.9,247.154s5.917-85.116,48.7-111.97S700.5,179.79,765.381,166.922s61.285-31.4,87.179-48.505,80.458-13.872,92.018,21.733-24.507,55.951-16.184,90.169c3.9,16.048,6.938,35.382-4.447,51.041-16,20.622-34.073,21.193-60.29,16.47C817.288,289.476,794.138,312.342,777.689,326.922Z"
                      transform="translate(-503.892 -108.386)" fill="url(#linear-gradient)" />
                  </svg>
                  <div style={{ fontSize: '84px', opacity: 0.2, color: '#FFFFFF', position: 'absolute', textTransform: 'uppercase', fontWeight: 700, top: '25%', right: 0, }}>Secure</div>
                  <div className="circle small one"></div>
                  <div className="circle two"></div>
                  <div className="circle small three"></div>
                  {/* <img src={updateimg} alt="" style={{ margin: '0 auto', position: 'absolute', left: 0, right: 0, top: '-30px', }} /> */}
                </Container>
              </Box>

              <Box /* sx={{ pt: 10 }} */>
                <Container>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Successfully</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Updated!</Typography>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '500', fontSize: 15, pt: 4 }}>Your Password has been successfully updated and set. You can now login with new password you have updated.</Typography>
                </Container>
              </Box>
              <BottomContainer>
                <Box sx={{ pt: 3 }}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    onClick={() => onSubmit()}
                    sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
                  >
                    SIGN IN
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

export default UpdateSuccessfully