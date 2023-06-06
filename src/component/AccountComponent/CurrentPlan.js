import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Skeleton, Grow } from '@mui/material';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { ApiRequestUrl } from '../../ApiRequest';

const CardWrapperPlan = styled(Box)(({ theme }) => ({
  backgroundColor: '#1e88e5',
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
    background: '#1565c0',
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
    background: '#1565c0',
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

const CurrentPlan = ({ refreshControll }) => {
  const vendor_id = localStorage.getItem('vendor_id');
  const [vinfo, setVinfo] = React.useState({});
  const [loader, setLoader] = React.useState(true);
  const [showSub, setShowSub] = React.useState(false);

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
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config_subscriptioncheck, { signal: signal })
      .then(function (response) {
        // console.log(response.data.subsinfo)
        if (response.data.response.status === 1) {
          setVinfo(response.data.subsinfo)
          setShowSub(false)
          setLoader(false)
        } else {
          if (response.data.response.status === -1) {
            setLoader(false)
            setShowSub(true)
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

  return (
    <>
      {loader ?
        <>
          <br />
          <Skeleton variant="rectangular" width="100%" height={118} sx={{ borderRadius: 1, }} />
        </>
        :
        <>
          <Grow in>
            <div>
              <CardWrapperPlan sx={{ p: 1, boxShadow: 3, mt: 2 }}>
                <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', fontSize: 25 }}>Current Plan</Typography>
                <Typography sx={{ color: '#FFD700', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>RS {vinfo.amount} - {vinfo.plan_validity.split('/')[1]} days</Typography>
                {<Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', fontSize: 13 }}>Expiry Date <span style={{ color: '#000000' }}>{new Date(parseInt(vinfo.expired_date.substr(6))).toLocaleTimeString("en-US", { year: 'numeric', month: 'long', day: 'numeric', })}</span> </Typography>}
              </CardWrapperPlan>
            </div>
          </Grow>
        </>
      }
    </>
  )
}

export default CurrentPlan