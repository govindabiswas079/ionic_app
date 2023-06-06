import React from 'react';
import { Grow, Typography, Box, Container, IconButton, FormControl, InputLabel, OutlinedInput, styled, FormHelperText, InputAdornment, Skeleton, Button, } from '@mui/material';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import trimg from '../../img/2953962.jpg'
import { LoadingButton } from '@mui/lab';
import { useIonRouter } from '@ionic/react';

const Discount = ({ getLoader, getcriteriaList, setShowFrom, showFrom, onChangeAmount, onChangeMinimun, onChangeMaxium, amount, minimun, maximum, value, onSubmitSetcriteria, onDeactivate, showSub, showSubPaln }) => {
  const theme = useTheme();
  let Navigate = useIonRouter();  
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [getcriteriaList, setGetcriteriaList] = React.useState([]);
  const [getcouponlistId, setGetCouponlistId] = React.useState('');
  const [getcouponlistActive, setGetCouponlistActive] = React.useState('');

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* var getcriteria_list = JSON.stringify({
    vendor_id: vendor_id,
  });
  // console.log(paymentrequest_list)

  var getcriteria_config = {
    method: 'post',
    url: sanitizeUrl('http://codefeverllp.com/katta/API.svc/getcriteria'),
    headers: {
      'Content-Type': 'application/json'
    },
    data: getcriteria_list
  };

  const getDiscountList = async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(getcriteria_config, { signal: signal })
      .then(function (response) {
        if (response.data.response.status === 1) {
          // console.log(response.data.dcinfo)
          setGetcriteriaList(response.data.dcinfo.reverse())
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
  };

  React.useEffect(() => {
    getDiscountList();
  }, []) */


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
          <Box sx={{ pt: 10 }}>
            <Container>
              <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Set</Typography>
              <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Discount criteria</Typography>
            </Container>
          </Box>
          <Box sx={{ pb: 5 }}>
            <Box>
              <Container >
                {showFrom ?
                  <Grow in>
                    <div>
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
                            <Box sx={{ pt: 2 }}>
                              <FormControl fullWidth error={amount} sx={{ ...theme.typography.customInput }}>
                                <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Max Amount</InputLabel>
                                <OutlinedInput
                                  type="number"
                                  label="Max Amount"
                                  sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                  value={value.amount}
                                  onChange={(e) => onChangeAmount(e)}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <CurrencyRupeeOutlinedIcon />
                                    </InputAdornment>}
                                />
                                {amount ?
                                  <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                    Amount is required
                                  </FormHelperText>
                                  : ''
                                }
                              </FormControl>
                            </Box>

                            <Box sx={{ pt: 2 }}>
                              <FormControl fullWidth error={minimun} sx={{ ...theme.typography.customInput }}>
                                <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Min Discount %</InputLabel>
                                <OutlinedInput
                                  type="number"
                                  label="Min Discount %"
                                  sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                  value={value.minimun}
                                  onChange={(e) => onChangeMinimun(e)}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <PercentOutlinedIcon />
                                    </InputAdornment>}
                                />
                                {minimun ?
                                  <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                    min discount is required
                                  </FormHelperText>
                                  : ''
                                }
                              </FormControl>
                            </Box>

                            <Box sx={{ pt: 2 }}>
                              <FormControl fullWidth error={maximum} sx={{ ...theme.typography.customInput }}>
                                <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Max Percentage %</InputLabel>
                                <OutlinedInput
                                  type="number"
                                  label="Max Percentage %"
                                  sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                                  value={value.maximum}
                                  onChange={(e) => onChangeMaxium(e)}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <PercentOutlinedIcon />
                                    </InputAdornment>}
                                />
                                {maximum ?
                                  <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                    MaX discount is required
                                  </FormHelperText>
                                  : ''
                                }
                              </FormControl>
                            </Box>
                            <Box sx={{ pt: 5 }}>
                              <LoadingButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={false}
                                onClick={(e) => onSubmitSetcriteria(e)}
                                sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
                              >
                                Submit
                              </LoadingButton>
                            </Box>
                          </>
                      }
                    </div>
                  </Grow>
                  :
                  <Button fullWidth onClick={() => setShowFrom(true)} sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, mt: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}>Set Discount</Button>
                }
              </Container>
            </Box>

            <Container sx={{ pt: 4 }}>
              <Typography sx={{ color: '#00000', fontFamily: 'Nunito', fontWeight: '700' }}>Discount List</Typography>
              {getLoader ?
                <Box sx={{ pt: 2 }}>
                  {[0, 1, 2,].map((id) => (
                    <Box key={id}>
                      <Skeleton variant="rectangular" animation="wave" height={80} sx={{ borderRadius: 1, mt: 0.7 }} />
                    </Box>
                  ))}
                </Box>
                :
                getcriteriaList.length === 0 ?
                  <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                    <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                  </Box>
                  :
                  getcriteriaList.map((value, index) => (
                    <Box key={index} sx={{ width: '100%', height: 'auto', backgroundColor: "#ffffff", marginTop: 0.5, borderRadius: 1, boxShadow: 9, p: 1 }}>
                      <Grow in>
                        <div>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700' }}>Min | {value.min}% - Max | {value.max}%</Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton onClick={(e) => { handleClick(e); setGetCouponlistId(value.id); setGetCouponlistActive(value.isactive) }}>
                              <MoreHorizOutlinedIcon />
                            </IconButton>
                          </Box>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem onClick={() => { handleClose(); onDeactivate({ vendor_id: value.vendor_id, criteria_id: getcouponlistId, isactive: getcouponlistActive === true ? false : true }); }} sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '600' }}>{getcouponlistActive === true ? 'Inactive' : "Active"}</MenuItem>
                          </Menu>
                          <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700' }}>On Purchase &#8377; {value.amount}</Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>

                            <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 11, pl: 1 }}>{new Date(parseInt(value.created_date.substr(6))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>

                            <Box sx={{ flexGrow: 1 }} />
                            <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', backgroundColor: value.isactive === true ? 'green' : 'red', borderRadius: 1, pl: 1, pr: 1, fontSize: 12 }}>{value.isactive === true ? 'Active' : "Inactive"}</Typography>
                          </Box>
                        </div>
                      </Grow>
                    </Box>
                  ))
              }
            </Container>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default Discount;

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
