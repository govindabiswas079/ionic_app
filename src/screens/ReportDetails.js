import React from 'react';
import { Box, Slide } from '@mui/material';
import CommonHeader from '../navigators/CommonHeader';
import ReportDetail from '../component/ReportComponent/ReportDetail'
import { IonContent, IonPage, useIonRouter, } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ReportDetails = () => {
  let Navigate = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const transaction = sessionStorage.getItem('transaction');
  const transactionJSON = JSON.parse(transaction)

  const onBack = () => {
    Navigate.push(`/ReportScreen`)
    // sessionStorage.removeItem('transaction')
  };

  const doubled = transactionJSON?.map((value) => ({
    created_date: new Date(parseInt(value.created_date.substr(6))).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric" }),
    currency: value.currency,
    disc_amount: value.disc_amount,
    from_cust_id: value.from_cust_id,
    location: value.location,
    name: value.name,
    net_amount: value.net_amount,
    pay_type: value.pay_type,
    status: value.status,
    store_id: value.store_id,
    store_name: value.store_name,
    to_vendor_id: value.to_vendor_id,
    total_amount: value.total_amount,
    tr_id: value.tr_id,
    tr_online_id: value.tr_online_id,
    tr_type: value.tr_type,
    trx_code: value.trx_code,
    fetch_type: value.fetch_type,
  }));


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
            <ReportDetail doubled={doubled} />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default (ReportDetails)