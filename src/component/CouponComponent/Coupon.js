import React from 'react';
import { Grow, Typography, Box, Container, Button, IconButton, Skeleton, } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import trimg from '../../img/2953962.jpg'
import { useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const Coupon = ({ onDeactivate }) => {
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loader, setLoader] = React.useState(null);
  const [getcouponlist, setGetCouponlist] = React.useState([]);
  const [getcouponlistId, setGetCouponlistId] = React.useState('');
  const [getcouponlistActive, setGetCouponlistActive] = React.useState('');

  var couponlist = JSON.stringify({
    vendor_id: vendor_id,
  });
  // console.log(getcouponlistActive)

  var couponlist_config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/couponlist`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: couponlist
  };

  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(couponlist_config, { signal: signal })
      .then(function (response) {
        if (response.data.response.status === 1) {
          // console.log(response.data.couponlist)
          setGetCouponlist(response.data.couponlist)
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
  }, [])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ pt: 10 }}>
            <Container>
              <Button onClick={() => Navigate.push('/CouponFrom')} fullWidth sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', backgroundColor: '#6500d8', '&:hover': { backgroundColor: '#6500d8' }, pt: 1, pb: 1 }}>Add Coupon Offer</Button>
            </Container>

            <Container sx={{ pt: 4 }}>
              <Typography sx={{ color: '#00000', fontFamily: 'Nunito', fontWeight: '700' }}>Coupon History</Typography>
              {loader ?
                <Box sx={{ pt: 2 }}>
                  {[0, 1, 2,].map((id) => (
                    <Box key={id}>
                      <Skeleton variant="rectangular" animation="wave" height={80} sx={{ borderRadius: 1, mt: 0.7 }} />
                    </Box>
                  ))}
                </Box>
                :
                getcouponlist.length === 0 ?
                  <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                    <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                  </Box>
                  :
                  getcouponlist.map((value) => (
                    <Box key={value.coupon_id} sx={{ width: '100%', height: 'auto', backgroundColor: "#ffffff", marginTop: 0.5, borderRadius: 1, boxShadow: 9, p: 1 }}>
                      <Grow in>
                        <div>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700' }}>{value.coupon_title} <span style={{ color: 'gray', fontSize: '11px' }}>| Discount on Purchase</span> </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton onClick={(e) => { handleClick(e); setGetCouponlistId(value.coupon_id); setGetCouponlistActive(value.isactive) }}>
                              <MoreHorizOutlinedIcon />
                            </IconButton>
                          </Box>
                          <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            /* MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }} */
                            components={Button}
                          >
                            <MenuItem onClick={() => onDeactivate({ vendor_id: value.created_by, coupon_id: getcouponlistId, isactive: getcouponlistActive === true ? false : true })} sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '600' }}>{getcouponlistActive === true ? 'Deactive' : 'Active'}</MenuItem>

                          </Menu>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                            <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', backgroundColor: 'blue', pl: 1, pr: 1 }}>{value.coupon_code}</Typography>
                            <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 11, pl: 1 }}>{new Date(parseInt(value.start_date.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })} - {new Date(parseInt(value.expired_date.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', backgroundColor: value.isactive === true ? 'green' : 'red', borderRadius: 1, pl: 1, pr: 1, fontSize: 12 }}>{value.isactive === true ? 'Active' : 'Inactive'}</Typography>
                          </Box>
                        </div>
                      </Grow>
                    </Box>
                  ))}
            </Container>
          </Box>
        </div>
      </Grow >
    </>
  )
}

export default Coupon