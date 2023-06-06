import React from 'react'
import { Grow, Box, Typography, Divider, Skeleton } from '@mui/material';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CleanHandsOutlinedIcon from '@mui/icons-material/CleanHandsOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { ApiRequestUrl } from '../../../ApiRequest';

const OrderStatistic = ({ refreshControll }) => {
  const vendor_id = localStorage.getItem('vendor_id');
  const [vendorDashboardinfo, setVendorDashboardinfo] = React.useState({});
  const [loadervinfo, setLoadervinfo] = React.useState(true);

  var get_vendorDashboardinfo = JSON.stringify({
    vendor_id: vendor_id
  });

  var config_vendorDashboardinfo = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/vendordashcounts`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vendorDashboardinfo
  };
  React.useEffect(async () => {
    // console.log('OrderStatistic')
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config_vendorDashboardinfo, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setVendorDashboardinfo(response.data?.dashCounts)
          setLoadervinfo(false)
        } else {
          if (response.data.response.status === -1) {
            setLoadervinfo(false)
          }
        }
      })
      .catch(function (err) {
        setLoadervinfo(true)
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
      {loadervinfo ?
        <Box sx={{ pt: 2 }}>
          {[0, 1, 2, 3, 4].map((id) => (
            <Box key={id}>
              <Skeleton animation="wave" sx={{ height: 115, mt: '-33px' }} />
            </Box>
          ))}
        </Box>
        :
        <Grow in>
          <div>
            <Box sx={{ backgroundColor: '#FFFFFF', height: 'auto', width: 'auto', borderRadius: 1, boxShadow: 3, pb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2, pr: 2, pt: 2 }}>
                <Box>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textTransform: 'uppercase' }}>Total Customer</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>{vendorDashboardinfo.total_customer === undefined ? '0' : vendorDashboardinfo.total_customer}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 45, height: 45 }}>
                  <VerifiedUserOutlinedIcon sx={{ color: '#000000', }} />
                </Box>
              </Box>
              <Divider sx={{ ml: 2, mr: 2, pt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2, pr: 2, pt: 2 }}>
                <Box>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textTransform: 'uppercase' }}>Last 7 day's income</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>&#8377; {vendorDashboardinfo.last_seven_days === undefined ? '0' : vendorDashboardinfo.last_seven_days}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 45, height: 45 }}>
                  <CleanHandsOutlinedIcon sx={{ color: '#000000', }} />
                </Box>
              </Box>
              <Divider sx={{ ml: 2, mr: 2, pt: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2, pr: 2, pt: 2 }}>
                <Box>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textTransform: 'uppercase' }}>Last 30 day's income</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>&#8377; {vendorDashboardinfo.last_thirth_days === undefined ? '0' : vendorDashboardinfo.last_thirth_days}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 45, height: 45 }}>
                  <CalendarTodayOutlinedIcon sx={{ color: '#000000', }} />
                </Box>
              </Box>
              <Divider sx={{ ml: 2, mr: 2, pt: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2, pr: 2, pt: 2 }}>
                <Box>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textTransform: 'uppercase' }}>Total Profit</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>&#8377; {vendorDashboardinfo.total_net_amount === undefined ? '0' : vendorDashboardinfo.total_net_amount}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 45, height: 45 }}>
                  <AutoGraphOutlinedIcon sx={{ color: '#000000', }} />
                </Box>
              </Box>
              <Divider sx={{ ml: 2, mr: 2, pt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2, pr: 2, pt: 2 }}>
                <Box>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textTransform: 'uppercase' }}>Total Discount</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>&#8377; {vendorDashboardinfo.total_dis_amount === undefined ? '0' : vendorDashboardinfo.total_dis_amount}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 45, height: 45 }}>
                  <LocalOfferOutlinedIcon sx={{ color: '#000000', }} />
                </Box>
              </Box>
              <Divider sx={{ ml: 2, mr: 2, pt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2, pr: 2, pt: 2 }}>
                <Box>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textTransform: 'uppercase' }}>total order success</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>{vendorDashboardinfo.order_success === undefined ? '0' : vendorDashboardinfo.order_success}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 45, height: 45 }}>
                  <CheckBoxOutlinedIcon sx={{ color: '#000000', }} />
                </Box>
              </Box>
              <Divider sx={{ ml: 2, mr: 2, pt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2, pr: 2, pt: 2 }}>
                <Box>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textTransform: 'uppercase' }}>total order failed</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>{vendorDashboardinfo.order_failed === undefined ? '0' : vendorDashboardinfo.order_failed}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 45, height: 45 }}>
                  <SmsFailedIcon sx={{ color: '#000000', }} />
                </Box>
              </Box>
              <Divider sx={{ ml: 2, mr: 2, pt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2, pr: 2, pt: 2 }}>
                <Box>
                  <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', textTransform: 'uppercase' }}>Total order pending</Typography>
                  <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>{vendorDashboardinfo.order_pending === undefined ? '0' : vendorDashboardinfo.order_pending}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 45, height: 45 }}>
                  <PendingActionsOutlinedIcon sx={{ color: '#000000', }} />
                </Box>
              </Box>
            </Box>
          </div>
        </Grow>
      }
    </>
  )
}

export default OrderStatistic