import React from 'react';
import BottomNavigation from '../../navigators/BottomNavigation';
import HomeHeaderNavigation from '../../navigators/HomeHeaderNavigation';
import Activity from '../../component/ActivityComponent/Activity';
import { IonContent, IonPage, } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { Plugins } from '@capacitor/core';


const { App } = Plugins;
const ActivityScreen = ({ storeinfo }) => {
  const ionRouter = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const [storeinfoHome, setStoreinfoHome] = React.useState({});

  React.useEffect(() => {
    setStoreinfoHome(storeinfo);
  });

  // React.useEffect(() => {
  //   setBackActivityScreen(true)
  //   sessionStorage.setItem('VendorActiveTabs', 'activityScreen')
  // });

  const changeBackground = (e) => {
    if (e.detail.scrollTop === 0) {
      setNav(false)
    } else {
      setNav(true)
    }
  }


  function doRefresh(event) {
    console.log(event);

    setTimeout(() => {
      console.log('Async operation has ended');
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
        <BottomNavigation />
        <HomeHeaderNavigation nav={nav} storeinfoHome={storeinfoHome} />
        {/* <Box sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}> */}
        <Activity />
        {/* </Box> */}
      </IonContent>
    </IonPage>
  )
}

export default (ActivityScreen);