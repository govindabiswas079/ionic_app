import React from 'react';
import { Avatar, Box, Container, Divider, Grow, Typography, Button, useTheme, styled, Skeleton } from '@mui/material';
import CurrentPlan from './CurrentPlan';
import Plan from './Plan';
import PlanIncludes from './PlanIncludes';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { useIonRouter } from '@ionic/react';
import { IonRefresher, IonRefresherContent } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const Account = ({ showSub, showSubPaln }) => {
  const theme = useTheme();
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [vendorplanhistory, seTvendorplanhistory] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [refreshControll, setRefreshControll] = React.useState(false)

  var get_vendorplanhistory = JSON.stringify({
    vendor_id: vendor_id
  });

  var config_vendorplanhistory = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/vendorplanhistory`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vendorplanhistory
  };
  const vendorplanhistory_data = async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config_vendorplanhistory, { signal: signal })
      .then(function (response) {
        // console.log(response.data.planhistory)
        if (response.data.response.status === 1) {
          seTvendorplanhistory(response.data.planhistory.reverse())
          setLoader(false)
        } else {
          if (response.data.response.status === -1) {
            setLoader(true)
          }
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
  }
  React.useEffect(() => {
    vendorplanhistory_data();
  }, [])

  // var options = { year: 'numeric', month: 'long', day: 'numeric' };
  // var date_new = new Date().toLocaleDateString("en-US", options);

  const VendorSubscription = (e) => {
    sessionStorage.setItem('VendorSubscription', e)
    setTimeout(() => {
      Navigate.push('/VendorSubscription');
    }, 100)
  }

  function doRefresh(event) {
    // console.log('Begin async operation');

    setTimeout(() => {
      // console.log('Async operation has ended');
      vendorplanhistory_data()
      event.detail.complete();
    }, 2000);
  }

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={(event) => { doRefresh(event); setRefreshControll(refreshControll => !refreshControll) }}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <Grow in>
        <div>
          <Box sx={{ pt: 10, pb: 10, backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
            <Container>
              {showSubPaln ?
                <Box sx={{ pt: 0 }}>
                  <CardWrapperGolden sx={{ p: 1, boxShadow: 3, }}>
                    <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 12, pt: 3, zIndex: 1, }}>no any subscription plan!</Typography>
                    <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 20, pt: 3, zIndex: 1, }}>Boost Your Brand <br /> Visibility</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                      <Button onClick={() => VendorSubscription('VendorSubscription')} fullWidth size="large" sx={{ backgroundColor: 'green', fontFamily: 'Nunito', fontWeight: '700', color: '#FFFFFF', zIndex: 1, '&:hover': { backgroundColor: 'green' } }}>Get Katta Prime</Button>
                    </Box>
                  </CardWrapperGolden>
                </Box>
                :
                showSub ?
                  <Box sx={{ pt: 2 }}>
                    <Box sx={{
                      p: 1, boxShadow: 3, backgroundColor: theme.palette.secondary.light, width: '100%', height: 'auto', borderRadius: 1, color: '#fff', overflow: 'hidden', position: 'relative',
                    }}>
                      <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 20, pt: 3, }}>Your subscription has expired</Typography>
                      <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 15, pt: 1, }}>To get a new subscription or contact our executive support</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                        <Button onClick={() => VendorSubscription('VendorSubscription')} fullWidth size="large" sx={{ backgroundColor: 'green', fontFamily: 'Nunito', fontWeight: '700', color: '#FFFFFF', zIndex: 1, '&:hover': { backgroundColor: 'green' } }}>Get subscription</Button>
                      </Box>
                    </Box>
                  </Box>
                  :
                  <>
                    <Plan refreshControll={refreshControll} />
                    <CurrentPlan refreshControll={refreshControll} />
                    <PlanIncludes refreshControll={refreshControll} />
                  </>
              }

            </Container>
            <Typography sx={{ p: 2, fontFamily: 'Nunito', fontWeight: '700' }}>Plan History</Typography>
            {loader ?
              <>
                <Container>
                  {[0, 1, 2,].map((id) => (
                    <Box key={id}>
                      <Skeleton animation="wave" sx={{ height: 80, mt: '-24px' }} />
                    </Box>
                  ))}
                </Container>
              </>
              :
              vendorplanhistory.length === 0 ?
                ''
                :
                vendorplanhistory.map((value, id) => (
                  <Box onClick={() => Navigate.push('/PlanHistoryScreen', sessionStorage.setItem('vendorplanhistory', JSON.stringify(vendorplanhistory[id])))} key={id} sx={{ backgroundColor: '#ffffff' }}>
                    <Grow in>
                      <div>
                        <Box sx={{ p: 1, display: 'flex' }}>
                          <Avatar src='' sx={{ borderRadius: 1 }} />
                          <Box sx={{ pl: 1.5 }}>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 15 }}>{value.plan_name} <span style={{ color: 'gray', fontSize: '12px' }}>- {value.plan_validity} days</span> </Typography>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: 'gray', fontSize: 12 }}>{new Date(parseInt(value.created_date.substr(6))).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric', })}</Typography>
                          </Box>
                          <Box sx={{ flexGrow: 1 }} />
                          <Box>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 15 }}>Rs {value.amount}</Typography>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#FFFFFF', fontSize: 12, backgroundColor: 'green', textAlign: 'center', borderRadius: 1 }}>success</Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ backgroundColor: '#8080803b' }} />
                      </div>
                    </Grow>
                  </Box>
                ))}
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default Account;

const CardWrapperGolden = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  width: '100%',
  height: 'auto',
  borderRadius: 10,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: 'blue',
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: 'blue',
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));
