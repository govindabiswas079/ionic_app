import React from 'react';
import { Box, Slide } from '@mui/material';
import Coupon from '../component/CouponComponent/Coupon';
import CommonHeader from '../navigators/CommonHeader';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import { IonContent, IonPage, useIonRouter, } from '@ionic/react';
import { ApiRequestUrl } from '../ApiRequest';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CouponScreen = () => {
  let Navigate = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const Navigation = sessionStorage.getItem('VendorActiveTabs')
  const [loader, setLoader] = React.useState(false)


  const onDeactivate = async (e) => {
    setLoader(true)
    var disablecriteria = JSON.stringify({
      vendor_id: e.vendor_id,
      coupon_id: e.coupon_id,
      isactive: e.isactive
    });
    // console.log(disablecriteria)

    var disablecriteria_config = {
      method: 'post',
      url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/disableCoupon`),
      headers: {
        'Content-Type': 'application/json'
      },
      data: disablecriteria
    };

    const controller = new AbortController();
    const signal = controller.signal
    await axios(disablecriteria_config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          toast('Successfully Updated', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoader(false)
        } else {
          if (response.data.response.status === -1) {
            setLoader(false)
          } else {
            alert('somethig worng')
          }
        }
      })
      .catch(function (err) {
        setLoader(true)
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }

  const onBack = () => {
    Navigate.push(`/${Navigation}`)
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader nav={nav} onBack={onBack} />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loader}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box>
            <Coupon onDeactivate={onDeactivate} />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default (CouponScreen)