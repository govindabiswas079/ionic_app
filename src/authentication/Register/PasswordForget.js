import React from 'react';
import { Box, AppBar, Toolbar, Stack, Chip, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../img/logo.png';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';

const PasswordForget = () => {
  let Navigate = useIonRouter();

  return (
    <IonPage>
      <IonContent>
        <Box sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh', padding: 0, margin: 0 }}>
          <AppBar elevation={0} sx={{ backgroundColor: '#f3f8fa', }}>
            <Toolbar sx={{ pt: 1.5, pb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ borderRadius: 1 }} src={logo} alt='' />
                <Box>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pl: 1, lineHeight: '15px' }}>TheKatta <br /> <span style={{ color: 'gray', fontFamily: 'Nunito', }}>Business</span> </Typography>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 0.9 }} />
              <Stack direction="row" spacing={1} onClick={() => Navigate.push('/SignIn')}>
                <Chip
                  icon={<AccountCircleIcon sx={{ color: 'red' }} />}
                  label={'sign in'}
                  variant="outlined"
                  sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '600' }}
                />
              </Stack>
            </Toolbar>
          </AppBar>
          <Box>
            <ForgetPassword />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default PasswordForget