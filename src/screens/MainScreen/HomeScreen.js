import React from 'react';
import { Box, Slide, } from '@mui/material';
import BottomNavigation from '../../navigators/BottomNavigation';
import HomeHeaderNavigation from '../../navigators/HomeHeaderNavigation';
import Home from '../../component/HomeComponent/Home';
import { IonContent, IonPage } from '@ionic/react';
import { IonRefresher, IonRefresherContent } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { Plugins } from '@capacitor/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const { App } = Plugins;
const HomeScreen = ({ storeinfo }) => {
  const ionRouter = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const [storeinfoHome, setStoreinfoHome] = React.useState({});
  const [refreshControll, setRefreshControll] = React.useState(false)

  React.useEffect(() => {
    setStoreinfoHome(storeinfo)
  });

  const changeBackground = (e) => {
    if (e.detail.scrollTop === 0) {
      setNav(false)
    } else {
      setNav(true)
    }
  }

  function doRefresh(event) {
    // console.log('Begin async operation');
    setRefreshControll(refreshControll => !refreshControll)
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  }

  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  return (
    <IonPage>
      <IonContent scrollEvents={true} onIonScroll={(e) => changeBackground(e)}>
        <IonRefresher slot="fixed" onIonRefresh={(event) => { doRefresh(event) }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <HomeHeaderNavigation nav={nav} storeinfoHome={storeinfoHome} />
          <BottomNavigation />
          <Box>
            <Home refreshControll={refreshControll} />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default (HomeScreen)