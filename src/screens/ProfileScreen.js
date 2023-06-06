import React from 'react';
import { Box } from '@mui/material';
import Profile from '../component/ProfileComponent/Profile';
import CommonHeader from '../navigators/CommonHeader';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { IonContent, IonPage, useIonRouter, } from '@ionic/react';
import { ApiRequestUrl } from '../ApiRequest';

const ProfileScreen = ({ showSub }) => {
  let Navigate = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const Navigation = sessionStorage.getItem('VendorActiveTabs')
  const vendor_id = localStorage.getItem('vendor_id');
  const [vinfo, setVinfo] = React.useState({});
  const [loader, setLoader] = React.useState(true)

  var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });
  var config = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/vendorinfo`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vinfo
  };
  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setVinfo(response.data)
          setLoader(false)
        } else {
          setLoader(true)
        }
      })
      .catch(function (err) {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
          setLoader(true)
        }
      });
    return () => controller.abort();
  }, [])

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
        <Box sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader nav={nav} onBack={onBack} />
          <Box>
            <Profile vinfo={vinfo} loader={loader} showSub={showSub} />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default (ProfileScreen)