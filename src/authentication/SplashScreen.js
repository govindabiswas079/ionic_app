import { Box, AppBar, Toolbar, Typography, Avatar, } from '@mui/material';
import React from 'react';
import logo from '../img/logo.png'
import { IonContent, IonPage, useIonRouter } from '@ionic/react';

const SplashScreen = () => {
  let Navigate = useIonRouter();

  React.useEffect(() => {
    setTimeout(() => {
      Navigate.push('/StartScreen')
    }, 3000)
  })

  return (
    <IonPage>
      <IonContent>
        <div style={{ minHeight: '100vh', padding: 0, margin: 0, backgroundImage: 'linear-gradient(#fff, #d4d8f5)', }}>
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>

          <AppBar elevation={0} position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'transparent', }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ borderRadius: 1 }} src={logo} alt='' />
                <Box>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pl: 1, lineHeight: '15px' }}>TheKatta <br /> <span style={{ color: 'gray', fontFamily: 'Nunito', }}>Business</span> </Typography>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
          </AppBar>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SplashScreen