import React from 'react';
import { Box, AppBar, Toolbar, Stack, Chip, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../img/logo.png';
import WonerInfo from '../Component/WonerInfo';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import { IonRefresher, IonRefresherContent } from '@ionic/react';


const SignUp = () => {
  let Navigate = useIonRouter();
  const [refreshControll, setRefreshControll] = React.useState(false)

  function doRefresh(event) {
    // console.log(event);

    setTimeout(() => {
      // console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);

  }

  return (
    <IonPage>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(event) => { doRefresh(event); setRefreshControll(refreshControll => !refreshControll) }} /* pullFactor={0.5} pullMin={100} pullMax={100} */ /* style={{ margin: '50px' }}  */>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
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
                  avatar={<AccountCircleIcon sx={{ color: 'red' }} />}
                  label={'sign in'}
                  variant="outlined"
                  sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '600' }}
                />
              </Stack>
            </Toolbar>
          </AppBar>
          <Box>
            <WonerInfo refreshControll={refreshControll} />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default SignUp