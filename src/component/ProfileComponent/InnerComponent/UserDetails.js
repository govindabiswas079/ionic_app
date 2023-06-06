import React from 'react';
import { Box, Slide, Grow, Container, Typography, OutlinedInput, InputLabel, FormControl, IconButton, InputAdornment, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CommonHeader from '../../../navigators/CommonHeader';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LoadingButton } from '@mui/lab';
import Select from '@mui/material/Select';
import dateFormat from "dateformat";
import { useIonRouter } from '@ionic/react';
const now = new Date();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const UserDetails = ({ nav }) => {
  const theme = useTheme();
  let Navigate = useIonRouter();
  const [showFrom, setShowFrom] = React.useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const [loader, setLoader] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onBack = () => {
    Navigate.push(`/ProfileScreen`)
  }
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!Navigate.canGoBack()) {
        Navigate.push(`/ProfileScreen`)
      }
    });
  });

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
        <CommonHeader onBack={onBack} nav={nav} />

        <Grow in>
          <div>
            <Box sx={{ pt: 10 }}>
              <Container>
                <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Create New User</Typography>

                {showFrom ?
                  <>
                    <Box sx={{ pb: 2 }} >
                      <Box sx={{ pt: 2 }}>
                        <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                          <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>User Name</InputLabel>
                          <OutlinedInput
                            type="text"
                            name="store"
                            label="User Name"
                            sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                          />
                        </FormControl>
                      </Box>
                      <Box sx={{ pt: 2 }}>
                        <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                          <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Mobile Number</InputLabel>
                          <OutlinedInput
                            type="number"
                            name="store"
                            label="Mobile Number"
                            sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                          />
                        </FormControl>
                      </Box>
                      <Box sx={{ pt: 2 }}>
                        <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                          <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Permision</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Permision"
                          >
                            <MenuItem value={10}>All</MenuItem>
                            <MenuItem value={20}>Limited</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ pt: 2 }}>
                        <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                          <InputLabel sx={{ fontFamily: 'Nunito', fontWeight: '600' }}>Password</InputLabel>
                          <OutlinedInput
                            type={showPasswordConfirm ? 'text' : 'password'}
                            name="store"
                            label="Password"
                            sx={{ fontFamily: 'Nunito', fontWeight: '700' }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPasswordConfirm} onMouseDown={handleMouseDownPasswordConfirm} edge="end" size="large">
                                  {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Box>

                      <Box sx={{ pt: 5 }}>
                        <LoadingButton
                          fullWidth
                          type="submit"
                          variant="contained"
                          loading={loader}
                          disabled={false}
                          sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}
                        >
                          Submit
                        </LoadingButton>
                      </Box>
                    </Box>
                  </>
                  :
                  <>
                    <Container sx={{ pt: 1, pb: 1 }}>
                      <Button onClick={() => setShowFrom(true)} fullWidth sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 1, pb: 1, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' } }}>
                        Add new user
                      </Button>
                    </Container>
                  </>
                }


                <Typography sx={{ color: '#00000', fontFamily: 'Nunito', fontWeight: '700' }}>User List</Typography>
                {[0, 1, 2].map((id) => (
                  <Box key={id} sx={{ width: '100%', height: 100, backgroundColor: "#ffffff", marginTop: 0.5, borderRadius: 1, boxShadow: 9, p: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700' }}>Dipali Makode <span style={{ color: 'gray', fontSize: '11px' }}>| 91 9078563412</span> </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <IconButton onClick={handleClick}>
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
                      <MenuItem onClick={() => { handleClose(); }} sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '600' }}>Profile</MenuItem>
                    </Menu>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                      {/* <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700' }}>Winter 2021 <span style={{ color: 'gray', fontSize: '11px' }}>| Discount on Purchase</span> </Typography> */}
                      <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', backgroundColor: 'blue', pl: 1, pr: 1 }}>Limited</Typography>
                      <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 11, pl: 1 }}>{dateFormat(now, "d mmmm, yy,")} - {dateFormat(now, "d mmmm, yy,")}</Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', backgroundColor: 'red', borderRadius: 1, pl: 1, pr: 1, fontSize: 12 }}>Deactive</Typography>
                    </Box>
                  </Box>
                ))}
              </Container>
            </Box>
          </div>
        </Grow>
      </Box>
    </>
  )
}

export default UserDetails