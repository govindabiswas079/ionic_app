import React from 'react';
import { Grow, Typography, Box, Container, Button, IconButton, Skeleton } from '@mui/material';
import trimg from '../../img/2953962.jpg'
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const Notification = ({ refreshControll }) => {
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loader, setLoader] = React.useState(null);
  const [getlistnotifications, setGetListNotifications] = React.useState([]);


  var listnotifications = JSON.stringify({
    vendor_id: vendor_id,
  });
  // console.log(listnotifications)

  var listnotifications_config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/listnotifications`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: listnotifications
  };

  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(listnotifications_config, { signal: signal })
      .then(function (response) {
        if (response.data.response.status === 1) {
          // console.log(response.data)
          setGetListNotifications(response.data.pushnlist.reverse())
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
        // setLoader(true)
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }, [refreshControll])


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
          <Box sx={{ pt: 10, pb: 3 }}>
            <Container>
              <Button onClick={() => Navigate.push('/NotificationFrom')} fullWidth sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', backgroundColor: '#6500d8', '&:hover': { backgroundColor: '#6500d8' }, pt: 1, pb: 1 }}>Create push notification</Button>
            </Container>

            <Container sx={{ pt: 4 }}>
              <Typography sx={{ color: '#00000', fontFamily: 'Nunito', fontWeight: '700' }}>Push Notification History</Typography>
              {loader ?
                <Box sx={{ pt: 2 }}>
                  {[0, 1, 2,].map((id) => (
                    <Box key={id}>
                      <Skeleton variant="rectangular" animation="wave" height={80} sx={{ borderRadius: 1, mt: 0.7 }} />
                    </Box>
                  ))}
                </Box>
                :
                getlistnotifications === null ?
                  <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                    <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                  </Box>
                  :
                  getlistnotifications.length === 0 ?
                    <Box>
                      <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                    </Box>
                    :
                    getlistnotifications.map((value, id) => (
                      <Box key={id} sx={{ width: '100%', height: 'auto', backgroundColor: "#ffffff", marginTop: 0.5, borderRadius: 1, boxShadow: 9, p: 1 }}>
                        <Grow in>
                          <div>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: '1.2rem', }}>{value.title}</Typography>
                              <Box sx={{ flexGrow: 1 }} />
                              <IconButton onClick={(e) => handleClick(e)}>
                                {/* <MoreHorizOutlinedIcon /> */}
                              </IconButton>
                            </Box>
                            <Box>
                              <Typography sx={{ color: '#b3aeae', fontFamily: 'Nunito', fontWeight: '700', fontSize: '1rem', height: value.message.length > 50 ? '150px' : '', overflow: value.message.length > 50 ? 'scroll' : '' }}>{value.message}</Typography>

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
                              <MenuItem onClick={() => { handleClose(); }} sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '600' }}>Profile</MenuItem>
                            </Menu>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                              <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 13, pl: 1 }}>{new Date(parseInt(value.created_date.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                              <Box sx={{ flexGrow: 1 }} />
                              <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', backgroundColor: 'green', borderRadius: 1, pl: 1, pr: 1, fontSize: 12 }}>Published</Typography>
                            </Box>
                          </div>
                        </Grow>
                      </Box>
                    ))}
            </Container>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default Notification