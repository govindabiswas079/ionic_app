import React from 'react';
import { Grow, Typography, Box, Container, IconButton, Avatar, Rating, Divider, Chip, Tooltip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useIonRouter } from '@ionic/react';
// import { toast, ToastContainer } from 'react-toastify'

const Profile = ({ vinfo, loader, showSub }) => {
  let Navigate = useIonRouter();

  const LogOut = () => {
    localStorage.removeItem('vendor_id')
    localStorage.removeItem('addrId')
    localStorage.removeItem('storeId')
    Navigate.push('/StartScreen')
  }

  const VendorAddressUpdate = () => {
    sessionStorage.setItem('VendorAddressUpdateData', JSON.stringify(vinfo.addrinfo))
    Navigate.push('/VendorAddressUpdate')
  };

  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ pt: 10, pb: 3 }}>
            <Container>
              <Box sx={{ boxShadow: 9, width: '100%', height: 'auot', backgroundColor: '#ffffff', borderRadius: 1, pb: 2,  }}>
                {loader ?
                  <Stack spacing={1}>
                    <Box sx={{ justifyContent: 'center', display: 'center' }}>
                      <Skeleton variant="circular" width={90} height={90} sx={{ mt: 3 }} />
                    </Box>
                    <Box sx={{ justifyContent: 'center', display: 'center' }}>
                      <Skeleton variant="text" width={150} />
                    </Box>
                    <Box sx={{ justifyContent: 'center', display: 'center' }}>
                      <Skeleton variant="text" width={180} />
                    </Box>
                    <Box sx={{ justifyContent: 'center', display: 'center' }}>
                      <Skeleton variant="text" width={130} />
                    </Box>
                    <Box sx={{ justifyContent: 'center', display: 'center' }}>
                      <Skeleton variant="text" width={100} />
                    </Box>
                  </Stack>
                  :
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>
                      {loader ?
                        <IconButton onClick={() => LogOut()}>
                          <Tooltip title="Log Out" placement="left">
                            <Chip icon={<LoginOutlinedIcon sx={{ fontSize: 16, }} />} label="Log Out" color="primary" variant="outlined" sx={{ fontFamily: 'Nunito', fontWeight: 600, color: 'gray', backgroundColor: '#f3f8fa', fontSize: 12, height: '22px' }} />
                          </Tooltip>
                        </IconButton>
                        :
                        <IconButton onClick={() => LogOut()}>
                          <Tooltip title="Log Out" placement="left">
                            <Chip icon={<LoginOutlinedIcon sx={{ fontSize: 16, }} />} label="Log Out" color="primary" variant="outlined" sx={{ fontFamily: 'Nunito', fontWeight: 600, color: 'gray', backgroundColor: '#f3f8fa', fontSize: 12, height: '22px' }} />
                          </Tooltip>
                        </IconButton>
                      }

                      <Box sx={{ flexGrow: 1 }} />
                      <IconButton>
                        {/* <SettingsIcon /> */}
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '', width: 60, height: 60, borderRadius: '20px 20px' }}>
                        <Avatar src={vinfo.storeinfo?.store_logo === '' ? '/static/images/avatar/1.jpg' : vinfo.storeinfo?.store_logo} alt={vinfo.storeinfo?.store_name} sx={{ width: 90, height: 90 }} />{/* BM</Avatar> */}
                      </Box>
                    </Box>
                    <Box sx={{ pt: 2.5 }}>
                      <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 20, color: '#000000', }}>{vinfo.storeinfo?.store_name}</Typography>
                      <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 15, color: 'gray', }}>{vinfo.storeinfo?.category_name}</Typography>
                    </Box>
                    <Box sx={{ justifyContent: 'center', display: 'center', pt: 1 }}>
                      <Rating name="read-only" value={vinfo.storeinfo?.rating} readOnly />
                    </Box>
                    <Box sx={{ justifyContent: 'center', display: 'center', pt: 1 }}>
                      <Typography sx={{ textAlign: 'center', fontFamily: 'Nunito', fontWeight: '700', fontSize: 15, color: '#ffffff', backgroundColor: vinfo.storeinfo?.isactive === true ? showSub ? 'red' : 'blue' : 'red', borderRadius: 1, pl: 1, pr: 1, }}>{vinfo.storeinfo?.isactive === true ? showSub ? 'inactive' : 'active' : 'inactive'}</Typography>
                    </Box>
                  </>
                }
              </Box>
              <Box sx={{ boxShadow: 3, width: '100%', height: 'auto', backgroundColor: '#ffffff', borderRadius: 1, pb: 2, mt: 3 }}>
                <Box sx={{ p: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ color: '#00000', fontFamily: 'Nunito', fontWeight: '700' }}>Location:</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography onClick={() => VendorAddressUpdate()} sx={{ color: 'Blue', fontFamily: 'Nunito', fontWeight: '700', fontSize: 12 }}>Change</Typography>
                  </Box>
                  <Box sx={{ pl: 2 }}>
                    {loader ?
                      <Skeleton variant="text" />
                      :
                      <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700' }}>{vinfo.addrinfo?.address}, {vinfo.addrinfo?.district}, {vinfo.addrinfo?.state}, {vinfo.addrinfo?.country}, {vinfo.addrinfo?.zipcode} </Typography>
                    }
                  </Box>
                </Box>

                <Box sx={{ p: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ color: '#00000', fontFamily: 'Nunito', fontWeight: '700' }}>Description:</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {/* <Typography sx={{ color: 'Blue', fontFamily: 'Nunito', fontWeight: '700', fontSize: 12 }}>Change</Typography> */}
                  </Box>
                  <Box sx={{ pl: 2 }}>
                    {loader ?
                      <Skeleton variant="text" height={80} />
                      :
                      <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700' }}>{vinfo.storeinfo?.description}</Typography>
                    }
                  </Box>
                </Box>

              </Box>

              <Box sx={{ boxShadow: 3, width: '100%', height: 'auto', backgroundColor: '#ffffff', borderRadius: 1, mt: 3, }}>
                <Box sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1.5, mb: 1.5 }} onClick={() => Navigate.push('/OwnerDetails')} >
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 17 }}>Owner Details</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <AccountCircleOutlinedIcon />
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1.5, mb: 1.5 }} onClick={() => Navigate.push('/VendorDetails')} >
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 17 }}>Outlet Details</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <StorefrontOutlinedIcon />
                  </Box>
                  {/* <Divider /> */}
                  {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1.5, mb: 1.5 }} onClick={() => Navigate.push('/BankDetailes')} >
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 17 }}>Bank Details</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <AccountBalanceOutlinedIcon />
                  </Box>
                  <Divider /> */}
                  {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1.5, mb: 1.5 }} onClick={() => Navigate.push('/AccountDetails')} >
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 17 }}>Account Details</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <ManageAccountsIcon />
                  </Box>
                  <Divider /> */}
                  {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1.5, }} onClick={() => Navigate.push('/UserDetails')} >
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 17 }}>User Details</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <PersonAddAltOutlinedIcon />
                  </Box> */}
                </Box>
              </Box>
            </Container>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default Profile