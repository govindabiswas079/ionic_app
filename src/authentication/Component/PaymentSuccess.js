import React from 'react';
import { Box, Typography, Container, Grow, Button, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const PaymentSuccess = () => {
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [vinfo, setVinfo] = React.useState({});
  const [loader, setLoader] = React.useState(false);

  var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });
  var config = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/vinfo`),
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
        //console.log(response.data)
        if (response.data.response.status === 1) {
          setVinfo(response.data.vinfo)
          setLoader(false)
        }
      })
      .catch(function (err) {
        setLoader(false)
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }, [])

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var date_new = new Date().toLocaleDateString("en-US", options);


  console.log(vinfo)
  return (
    <Grow in>
      <div>
        <Box sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh', padding: 0, margin: 0, }}>
          <Box sx={{ width: '100%', height: 300, backgroundColor: '#6500d8' }}>
            <Container sx={{ pt: 3 }}>
              <Box sx={{ padding: 2 }}>
                <CheckIcon sx={{ borderRadius: 50, width: 50, height: 50, backgroundColor: 'green', color: '#FFFFFF' }} />
                <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '600', fontSize: 17 }}>Hi, {vinfo.owner_name},</Typography>
                <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', fontSize: 24, pt: 2 }}>Thank you for buying subscription.</Typography>
              </Box>
            </Container>
          </Box>
          <Box sx={{ backgroundColor: '#ffffff', padding: 1 }}>
            <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700' }}>Transaction ID</Typography>
            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '800' }}>TK12345678654CH34</Typography>
          </Box>
          <Container sx={{ pt: 3 }}>
            <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700' }}>Subscription Details:</Typography>
            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pt: 1 }}>Plan Name: Silver</Typography>
            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pt: 1 }}>Plan Amount: &#8377;  5000</Typography>
            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', pt: 1 }}>Date: {date_new}</Typography>
          </Container>

          <Container sx={{ pt: 3, pb: 4 }}>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: "gray" }}>We hope you enjoy the premium experience. Thank you for supporting TheKatta, your contribution is a big deal to our company </Typography>
          </Container>

          <Box sx={{ position: 'fixed', bottom: 0, backgroundColor: '#6500d8', display: 'flex', width: '100%', height: 55, boxShadow: 3 }}>
            <LoadingButton onClick={() => Navigate.push('/HomeScreen')} fullWidth sx={{ color: 'Blue', fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', backgroundColor: '#6500d8' }}>DONE</LoadingButton>
          </Box>
        </Box >
      </div>
    </Grow >
  )
}

export default PaymentSuccess