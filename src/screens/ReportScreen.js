import React from 'react';
import { Box, Slide } from '@mui/material';
import CommonHeader from '../navigators/CommonHeader';
import Report from '../component/ReportComponent/Report';
import { IonContent, IonPage, useIonRouter, } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ReportScreen = () => {
  let Navigate = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const Navigation = sessionStorage.getItem('VendorActiveTabs')

  const onBack = () => {
    Navigate.push(`/${Navigation}`)
    sessionStorage.removeItem('transaction')
  }
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!Navigate.canGoBack()) {
        Navigate.push(`/${Navigation}`)
        sessionStorage.removeItem('transaction')
      }
    });
  });

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
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader nav={nav} onBack={onBack} />
          <Box>
            <Report />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default (ReportScreen)