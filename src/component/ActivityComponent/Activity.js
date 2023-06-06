import React from 'react';
import { Box, Container, Grow, Typography, Avatar, Skeleton, Backdrop, CircularProgress, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import trimg from '../../img/2953962.jpg';
import unscreen from '../../img/unscreen.gif';
import { IonRefresher, IonRefresherContent } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const Activity = () => {
  const vendor_id = localStorage.getItem('vendor_id');
  const [paymentrequest, setPaymentrequest] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [loaderPayment, setLoaderPayment] = React.useState(false);
  const [isapprove, setIsapprove] = React.useState(true);
  const [isapproveStatus, setIsapproveStatus] = React.useState(false);

  var paymentrequest_list = JSON.stringify({
    vendor_id: vendor_id,
  });
  // console.log(paymentrequest_list)

  var paymentrequest_config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/paymentrequest`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: paymentrequest_list
  };

  /* React.useEffect(async () => {
    setLoader(true)
    const controller = new AbortController();
    const signal = controller.signal
    await axios(paymentrequest_config, { signal: signal })
      .then(function (response) {
        if (response.data.response.status === 1) {
          // console.log(response.data.discountPaymentList)
          setPaymentrequest(response.data.discountPaymentList)
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
  }, []) */

  const onPaymentrequest = async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(paymentrequest_config, { signal: signal })
      .then(function (response) {
        if (response.data.response.status === 1) {
          // console.log(response.data.discountPaymentList)
          setPaymentrequest(response.data.discountPaymentList)
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

  React.useEffect(() => {
    onPaymentrequest();
  }, [])

  const onSubmitApprove = async (e) => {
    setLoaderPayment(true)
    var isapprove_list = JSON.stringify({
      vendor_id: vendor_id,
      discount_id: e.discount_id,
      is_approve: e.is_approve,
      type: e.type
    });
    // console.log(isapprove_list)

    var isapprove_config = {
      method: 'post',
      url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/isapprove`),
      headers: {
        'Content-Type': 'application/json'
      },
      data: isapprove_list
    };

    const controller = new AbortController();
    const signal = controller.signal
    await axios(isapprove_config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setIsapprove(response.data.discount_id)
          setIsapproveStatus(response.data.type)
          setLoaderPayment(false)
          onPaymentrequest();
          /* setTimeout(() => {
            window.location.reload()
          }, 1000) */
        } else {
          if (response.data.response.status === -1) {
            setLoaderPayment(false)
          } else {
            alert('somethig worng')
          }
        }
      })
      .catch(function (err) {
        setLoaderPayment(true)
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }

  function doRefresh(event) {
    // console.log('Begin async operation');

    setTimeout(() => {
      // console.log('Async operation has ended');
      onPaymentrequest()
      event.detail.complete();
    }, 2000);
  }

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={(event) => { doRefresh(event) }}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <Grow in>
        <div>
          <Box sx={{ pt: 10, backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
            <Container sx={{ pb: 1 }}>
              <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>New </Typography>
              <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Order Requests</Typography>
            </Container>
            <Container sx={{ pb: 10 }}>
              {loader ?
                <Box sx={{ pt: 2 }}>
                  {[0, 1, 2,].map((id) => (
                    <Box key={id}>
                      <Skeleton variant="rectangular" animation="wave" height={130} sx={{ borderRadius: 1, mt: 0.7 }} />
                    </Box>
                  ))}
                </Box>
                :
                paymentrequest.length === null ?
                  <Grow in>
                    <div>
                      <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                        <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                      </Box>
                    </div>
                  </Grow>
                  :
                  paymentrequest.length === 0 ?
                    <Grow in>
                      <div>
                        <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                          <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                        </Box>
                      </div>
                    </Grow>
                    :
                    paymentrequest.map((data, index) => (
                      <Box key={index} sx={{ width: '100%', height: 'auto', flexShrink: 0, mt: 0.9, boxShadow: 20, borderRadius: 1, backgroundColor: '#ffffff' }}>
                        <Box key={index} sx={{ padding: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={data.profile_url === null ? '/statisc/img.png' : data.profile_url} alt={data.customer_name} sx={{ width: 44, height: 44 }} />
                            <Box sx={{ pl: 1 }}>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 19 }}>{data.customer_name}</Typography>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '500', color: 'gray', fontSize: 11 }}>{new Date(parseInt(data.bill_date.substr(6))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box>
                              <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '600', color: 'gray', fontSize: 13 }}>Payble Amount</Typography>
                              <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 19 }}>&#x20b9; {data.net_amount}</Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                            <Box sx={{ flexGrow: 0.5 }} />
                            <Box>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '600', color: 'gray', fontSize: 13 }}>Bill Amount</Typography>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 19 }}>&#x20b9; {data.bill_amount}</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 2 }} />
                            <Box>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '600', color: 'gray', fontSize: 13 }}>Discount Amount</Typography>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 19 }}>&#x20b9; {data.discount_amount}</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 0.5 }} />
                          </Box>
                          {isapprove === data.discount_id ?
                            <Grow in>
                              <div>
                                <Button fullWidth variant="contained" sx={{ mt: 1 }} color={isapproveStatus === "Accept" ? 'success' : 'error'}>
                                  {isapproveStatus === "Accept" ? 'Accepted' : 'Rejected'}
                                </Button>
                              </div>
                            </Grow>
                            :
                            <Box sx={{ display: 'flex', }}>
                              <LoadingButton fullWidth type="submit" variant="contained" onClick={() => onSubmitApprove({ discount_id: data.discount_id, is_approve: true, type: "Accept" })} sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: 'blue', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' }, height: 40, margin: 1 }}>
                                Accept
                              </LoadingButton>
                              <LoadingButton type="submit" variant="contained" onClick={() => onSubmitApprove({ discount_id: data.discount_id, is_approve: false, type: "Reject" })} sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: 'red', boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: 'red' }, height: 40, margin: 1, fontWeight: 700, fontSize: 10 }}>
                                Reject
                              </LoadingButton>
                            </Box>
                          }
                          {/* <Box sx={{ display: 'flex', }}>
                          <LoadingButton fullWidth type="submit" variant="contained" onClick={() => onSubmitApprove({ discount_id: data.discount_id, is_approve: true, type: "Accept" })} sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' }, height: 40, margin: 1 }}>
                            Accept
                          </LoadingButton>
                          <LoadingButton type="submit" variant="contained" onClick={() => onSubmitApprove({ discount_id: data.discount_id, is_approve: false, type: "Reject" })} sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: 'red', boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: 'red' }, height: 40, margin: 1, fontWeight: 700, fontSize: 10 }}>
                            Reject
                          </LoadingButton>
                        </Box> */}
                        </Box>
                      </Box>
                    ))
              }
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loaderPayment}
              >
                {/* <CircularProgress color="inherit" /> */}
                <img src={unscreen} />
              </Backdrop>
            </Container>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default Activity;