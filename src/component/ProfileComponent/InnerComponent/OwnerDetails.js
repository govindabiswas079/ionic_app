import React from 'react';
import { Box, Slide, Grow, Container, Typography, Divider, Skeleton, } from '@mui/material';
import CommonHeader from '../../../navigators/CommonHeader';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import Stack from '@mui/material/Stack';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../../ApiRequest'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const OwnerDetails = ({ nav, }) => {
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [vinfo, setVinfo] = React.useState({});
  const [loader, setLoader] = React.useState(false);

  var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });
  var config = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}//vendorinfo`),
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
        setLoader(true)
        if (response.data.response.status === 1) {
          setVinfo(response.data)
          setLoader(false)
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
  }, [])

  const onBack = () => {
    Navigate.push(`/ProfileScreen`)
  }
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!Navigate.canGoBack()) {
        Navigate.push(`/ProfileScreen`)
      }
    });
  });

  return (
    <IonPage>
      <IonContent>
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader onBack={onBack} nav={nav} />

          <Grow in>
            <div>
              <Box sx={{ pt: 10 }}>
                <Container>
                  {loader ?
                    <Stack spacing={1}>
                      <Skeleton variant="text" />
                      {/* <Skeleton variant="circular" width={40} height={40} /> */}
                      <Skeleton variant="rectangular" /* width={210} */ height={118} />
                      <Skeleton variant="text" />
                      {/* <Skeleton variant="circular" width={40} height={40} /> */}
                      <Skeleton variant="rectangular" /* width={210} */ height={118} />
                    </Stack>
                    :
                    <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#ffffff', p: 1, borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#000000', fontSize: 15 }}>Owner Details</Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        {/* <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: 'gray', fontSize: 13 }}>Edit</Typography> */}
                      </Box>
                      <Divider />
                      <Box sx={{ pt: 1 }}>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Name:</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>{vinfo.vendorinfo?.owner_name}</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Email:</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>{vinfo.vendorinfo?.email}</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Contact:</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>{vinfo.vendorinfo?.mobile}</Typography>
                      </Box>
                    </Box>
                  }
                </Container>
              </Box>
            </div>
          </Grow>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default OwnerDetails