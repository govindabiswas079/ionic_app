import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Skeleton, Grow } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { ApiRequestUrl } from '../../ApiRequest';

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

const Plan = ({ refreshControll }) => {
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
            setLoader(true)
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
        <Skeleton variant="rectangular" width="100%" height={118} sx={{ borderRadius: 1, }} />
        :
        <>
          <Grow in>
            <div>
              <CardWrapperGolden sx={{ p: 1, boxShadow: 3, }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', fontSize: 25 }}>{vinfo?.plan_name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'blue', borderRadius: 0.5, pl: 0.1, ml: 0.3, pr: 0.2, mt: 0.6 }}>
                    <CheckIcon sx={{ fontSize: 8 }} />
                    <Typography sx={{ fontSize: 8, fontFamily: 'Nunito', fontWeight: '700', }}>Katta {vinfo?.plan_name}</Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 3 }}>
                  <Box>
                    <Typography sx={{ color: '#FFD700', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>{vinfo?.plan_code}</Typography>
                    <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito', fontWeight: '700', fontSize: 13 }}>Last recharge date <span style={{ color: '#000000' }}>{new Date(parseInt(vinfo.created_date.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span> </Typography>
                    {sessionStorage.setItem('vinfo_created_date', vinfo.created_date)}
                    <Typography sx={{ color: '#625959', fontFamily: 'Nunito', fontWeight: '700', fontSize: 13 }}>Expiry after {vinfo?.plan_validity.split('/')[0]} days</Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ pt: 5, pb: 2 }}>
                    <Button size='small' variant='contained' sx={{ zIndex: 1, fontFamily: 'Nunito', fontWeight: '700', fontSize: 10 }}>Change Plan</Button>
                  </Box>
                </Box>
              </CardWrapperGolden>
            </div>
          </Grow>
        </>
      }
    </>
  )
}

export default Plan