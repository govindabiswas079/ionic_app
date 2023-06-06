import React from 'react';
import { Box, Slide, Grow, Container, Typography, Divider, Skeleton } from '@mui/material';
import CommonHeader from '../../../navigators/CommonHeader';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../../ApiRequest'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


const VendorDetails = ({ nav, }) => {
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [vinfo, setVinfo] = React.useState({});
  const [loader, setLoader] = React.useState(false);

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
    setLoader(true)
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        // console.log(response.data.storeinfo)
        if (response.data.response.status === 1) {
          setVinfo(response.data.storeinfo)
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
  // console.log(vinfo)

  const VendorDetailsUpdate = () => {
    sessionStorage.setItem('VendorDetailsUpdateData', JSON.stringify(vinfo))
    Navigate.push('/VendorDetailsUpdate')
  }

  return (
    <IonPage>
      <IonContent>
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader onBack={onBack} nav={nav} />

          <Grow in>
            <div>
              <Box sx={{ pt: 10, pb: 2 }}>
                <Container>
                  {loader ?
                    <Stack spacing={1}>
                      <Skeleton variant="text" />

                      <Skeleton variant="rectangular" /* width={210} */ height={118} />
                      <Skeleton variant="text" />

                      <Skeleton variant="rectangular" /* width={210} */ height={118} />
                    </Stack>
                    :
                    <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#ffffff', p: 1, borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#000000', fontSize: 15 }}>Outlet Details</Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography onClick={() => VendorDetailsUpdate()} sx={{ fontFamily: 'Nunito', fontWeight: '700', color: 'gray', fontSize: 13 }}>Edit</Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ pt: 1 }}>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Outlet name:</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>{vinfo?.store_name}</Typography>
                        <Divider sx={{ pt: 1 }} />
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Category name:</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>{vinfo?.category_name}</Typography>
                        <Divider sx={{ pt: 1 }} />
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Outlet mobile:</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>{vinfo?.store_mobile === '' ? 'none' : vinfo?.store_mobile}</Typography>
                        <Divider sx={{ pt: 1 }} />
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Outlet landline:</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>{vinfo?.store_landline === '' ? 'none' : vinfo?.store_landline}</Typography>
                        <Divider sx={{ pt: 1 }} />
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Description:</Typography>
                        <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1, }}>{vinfo?.description}</Typography>
                        <Divider sx={{ pt: 1 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                          <Box>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Opening time:</Typography>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray' }}>{vinfo?.open_time === '' ? "none" : new Date(vinfo?.open_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', })}</Typography>
                          </Box>
                          <Box sx={{ flexGrow: 1 }} />
                          <Box>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Closing time:</Typography>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray' }}>{vinfo?.close_time === '' ? 'none' : new Date(vinfo?.close_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', })}</Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ pt: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                          <Box>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Weekoff day:</Typography>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray' }}>{vinfo?.weekoffday === '' ? 'none' : vinfo?.weekoffday}</Typography>
                          </Box>
                          <Box sx={{ flexGrow: 1 }} />
                          <Box>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Account status:</Typography>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray' }}>{vinfo?.isactive === true ? 'active' : 'inactive'}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  }
                </Container>
              </Box>
            </div>
          </Grow >
        </Box >
      </IonContent>
    </IonPage>
  )
}

export default VendorDetails;
