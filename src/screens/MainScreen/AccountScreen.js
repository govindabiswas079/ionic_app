import React from 'react';
import BottomNavigation from '../../navigators/BottomNavigation';
import HomeHeaderNavigation from '../../navigators/HomeHeaderNavigation';
import Account from '../../component/AccountComponent/Account'
import { IonContent, IonPage, } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { Plugins } from '@capacitor/core';


const { App } = Plugins;
const AccountScreen = ({ storeinfo, showSub, showSubPaln }) => {
  const ionRouter = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const [storeinfoHome, setStoreinfoHome] = React.useState({});

  React.useEffect(() => {
    setStoreinfoHome(storeinfo)
  });

  // React.useEffect(() => {
  //   setBackAccountScreen(true)
  //   sessionStorage.setItem('VendorActiveTabs', 'accountScreen')
  // });

  const changeBackground = (e) => {
    if (e.detail.scrollTop === 0) {
      setNav(false)
    } else {
      setNav(true)
    }
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
        {/* <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}> */}
        <HomeHeaderNavigation nav={nav} storeinfoHome={storeinfoHome} />
        <BottomNavigation />
        {/* <Box> */}
        <Account showSub={showSub} showSubPaln={showSubPaln} />
        {/* </Box> */}
        {/* </Box> */}
      </IonContent>
    </IonPage>
  )
}

export default AccountScreen