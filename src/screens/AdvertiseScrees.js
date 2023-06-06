import React from 'react';
import { Box, Slide } from '@mui/material';
import CommonHeader from '../navigators/CommonHeader';
import AdVertise from '../component/AdVertiseComponent/AdVertise';
import { IonContent, IonPage, useIonRouter, } from '@ionic/react';
import { IonRefresher, IonRefresherContent } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const AdvertiseScrees = () => {
  let Navigate = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const Navigation = sessionStorage.getItem('VendorActiveTabs')
  const [refreshControll, setRefreshControll] = React.useState(false)

  const onBack = () => {
    Navigate.push(`/${Navigation}`)
  }
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!Navigate.canGoBack()) {
        Navigate.push(`/${Navigation}`)
      }
    });
  });

  function doRefresh(event) {
    // console.log('Begin async operation');
    setRefreshControll(refreshControll => !refreshControll)
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
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
        <IonRefresher slot="fixed" onIonRefresh={(event) => { doRefresh(event) }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader nav={nav} onBack={onBack} />
          <Box>
            <AdVertise refreshControll={refreshControll} />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default (AdvertiseScrees)