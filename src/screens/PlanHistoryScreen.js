import React from 'react';
import { Box, Slide } from '@mui/material';
import PlanHistory from '../component/PlanHistoryComponent/PlanHistory';
import CommonHeader from '../navigators/CommonHeader';
import { IonContent, IonPage, useIonRouter, } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const PlanHistoryScreen = () => {
  let Navigate = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const Navigation = sessionStorage.getItem('VendorActiveTabs')
  const vendorplanhistory = sessionStorage.getItem('vendorplanhistory')
  const vendorplanhistoryJson = JSON.parse(vendorplanhistory);


  const onBack = () => {
    Navigate.push(`/${Navigation}`)
    sessionStorage.removeItem('vendorplanhistory')
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
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader nav={nav} onBack={onBack} />
          <Box>
            <PlanHistory vendorplanhistoryJson={vendorplanhistoryJson} />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default (PlanHistoryScreen)