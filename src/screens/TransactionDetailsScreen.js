import React from 'react';
import { Box, Slide } from '@mui/material';
import TransactionDetails from '../component/TransactionDetailsComponent/TransactionDetails';
import CommonHeader from '../navigators/CommonHeader';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IonContent, IonPage, useIonRouter, } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


const TransactionDetailsScreen = () => {
  let Navigate = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const ReportDetails = sessionStorage.getItem('ReportDetails')
  const Navigation = sessionStorage.getItem('VendorActiveTabs')
  const [loader, setLoader] = React.useState(false)

  const onBack = () => {
    ReportDetails ? Navigate.push(`/${ReportDetails}`) : Navigate.push(`/${Navigation}`)
    sessionStorage.removeItem('TransactionDetailsScreen')
    sessionStorage.removeItem('ReportDetails')
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
          <Backdrop
            sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loader}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box>
            <TransactionDetails />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default (TransactionDetailsScreen)