import React from 'react'
import { Box, Container, Grow, Typography, Paper, styled, Divider, Button, Skeleton, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TotalOrder from './IinnerComponent/TotalOrder';
import TotalIncome from './IinnerComponent/TotalIncome';
import OrderStatistic from './IinnerComponent/OrderStatistic';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';


const HorizontalScrrolBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  overflowX: 'auto',
}));
const HorizontalScrrolPaper = styled(Paper)(() => ({
  flexShrink: 0,
  // backgroundColor: '#242e39',
  backgroundColor: '#6500d8',
  // padding: '5px',
  boxShadow: '0px 3px 3px -2px rgb(145 158 171 / 20%), 0px 3px 4px 0px rgb(145 158 171 / 14%), 0px 1px 8px 0px rgb(145 158 171 / 12%)',

}));

const Home = ({ refreshControll }) => {
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [vinfo, setVinfo] = React.useState({});
  const [loader, setLoader] = React.useState(true);
  const [showSub, setShowSub] = React.useState(false);
  const [showSubPaln, setShowPaln] = React.useState(false);

  var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });

  var config_subscriptioncheck = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/subscriptioncheck`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vinfo
  };
  React.useEffect(async () => {
    // console.log('Home')
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config_subscriptioncheck, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setVinfo(response.data.subsinfo)
          setShowSub(false)
          setLoader(false)
        } else {
          if (response.data.response.status === -1) {
            setLoader(true)
            setShowSub(true)
          } else {
            if (response.data.response.status === 0) {
              setShowPaln(true)
            }
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
  }, [refreshControll])

  const VendorSubscription = (e) => {
    sessionStorage.setItem('VendorSubscription', e)
    setTimeout(() => {
      Navigate.push('/VendorSubscription');
    }, 100)
  }

  return (
    <>
      <Grow in>
        <div>
          {showSubPaln ?
            <Grow in>
              <div>
                <Container sx={{ pt: 10 }}>
                  <CardWrapperGolden sx={{ p: 1, boxShadow: 3, }}>
                    <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 12, pt: 3, zIndex: 1, }}>no any subscription plan!</Typography>
                    <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 20, pt: 3, zIndex: 1, }}>Boost Your Brand <br /> Visibility</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                      <Button onClick={() => VendorSubscription('VendorSubscription')} fullWidth size="large" sx={{ backgroundColor: 'green', fontFamily: 'Nunito', fontWeight: '700', color: '#FFFFFF', zIndex: 1, '&:hover': { backgroundColor: 'green' } }}>Get Katta Prime</Button>
                    </Box>
                  </CardWrapperGolden>
                </Container>
              </div>
            </Grow>
            :
            showSub ?
              <Grow in>
                <div>
                  <Container sx={{ pt: 10 }}>
                    <CardWrapperGolden sx={{ p: 1, boxShadow: 3, }}>
                      <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 20, pt: 3, zIndex: 1, }}>Boost Your Brand <br /> Visibility</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                        <Button onClick={() => VendorSubscription('VendorSubscription')} fullWidth size="large" sx={{ backgroundColor: 'green', fontFamily: 'Nunito', fontWeight: '700', color: '#FFFFFF', zIndex: 1, '&:hover': { backgroundColor: 'green' } }}>Get Katta Prime</Button>
                      </Box>
                    </CardWrapperGolden>
                  </Container>
                </div>
              </Grow>
              :
              <Container sx={{ pt: 10 }}>
                {loader ?
                  <Skeleton variant="rectangular" width="100%" height={118} sx={{ borderRadius: 1 }} />
                  :
                  <Grow in>
                    <div>
                      <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: 1, margin: 0.4, width: '100%', height: 'auto', boxShadow: 3, pb: 2 }}>
                        <CardWrapperGolden sx={{ backgroundColor: '#6500d8', borderRadius: 1 }}>
                          <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <Box>
                              <Typography sx={{ color: '#f3f8fa', fontFamily: 'Nunito', fontWeight: '700' }}>{vinfo.plan_name}</Typography>
                              <Typography sx={{ color: '#f3f8fa', fontFamily: 'Nunito', fontWeight: '700' }}>Plan ID: {vinfo.plan_code}</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ zIndex: 1 }}>
                              <Typography sx={{ color: '#f3f8fa', fontFamily: 'Nunito', fontWeight: '700' }}>Renaming days</Typography>
                              <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700' }}>{vinfo.plan_validity}</Typography>
                            </Box>
                          </Box>
                          <Divider sx={{ backgroundColor: 'gray', margin: 1 }} />
                          <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box>
                              <Typography sx={{ color: '#f3f8fa', fontFamily: 'Nunito', fontWeight: '700' }}>Plan Expire</Typography>
                              <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700' }}>{new Date(parseInt(vinfo.expired_date.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <LoadingButton onClick={() => Navigate.push('/VendorSubscription')} sx={{ backgroundColor: 'green', fontFamily: 'Nunito', fontWeight: '700', color: '#FFFFFF', zIndex: 1, '&:hover': { backgroundColor: 'green' } }}>Buy Subscription</LoadingButton>
                          </Box>
                        </CardWrapperGolden>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                          <Typography onClick={() => Navigate.push('/AccountScreen')} sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700' }}>More Details {'>'}{'>'}{'>'}</Typography>
                        </Box>
                      </Box>
                    </div>
                  </Grow>
                }
              </Container>
          }
          {/* <TextField value={tokenJsoon?.value} /> */}
          <Box sx={{ pt: 1 }}>
            <HorizontalScrrolBox sx={{ paddingLeft: 2 }} className='scroll'>
              {[0, 1].map((id) => (
                <HorizontalScrrolPaper key={id} sx={{ borderRadius: 1, margin: 0.4, width: '90%', pb: 1 }}>
                  <Grow in>
                    <div>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', textAlign: 'center', pt: 1, fontSize: 23 }}>Welcome Offer</Typography>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', textAlign: 'center', pt: 1, fontSize: 18 }}>Free subscription Get 100% off</Typography>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', textAlign: 'center', fontSize: 15 }}>(Only for silver plan)</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: 0.3, border: 'none', }}>
                          <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 10, pl: 0.3, pr: 0.3, pt: 0.1, pb: 0.1 }}>
                            use promo code <span style={{ fontFamily: 'Nunito', color: 'blue', fontWeight: '900' }}>THEKATTA</span> at checkout
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  </Grow>
                </HorizontalScrrolPaper>
              ))}
            </HorizontalScrrolBox>
          </Box>

          <Box sx={{ pt: 2, }}>
            <Container>
              <TotalOrder refreshControll={refreshControll} />
            </Container>
          </Box>
          <Box sx={{ pt: 2, }}>
            <Container>
              <TotalIncome refreshControll={refreshControll} />
            </Container>
          </Box>
          <Box sx={{ pt: 2, pb: 10 }}>
            <Container>
              <OrderStatistic refreshControll={refreshControll} />
            </Container>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default Home





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













