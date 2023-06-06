import React from 'react';
import { Box, Slide, Grow, Container, Typography, Divider } from '@mui/material';
import CommonHeader from '../../../navigators/CommonHeader';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { LoadingButton } from '@mui/lab';
import useSound from 'use-sound';
import nokiatune from '../../../nokiatune.mp3'
import { useIonRouter } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const BankDetailes = ({ nav }) => {
  const [play] = useSound(nokiatune);
  let Navigate = useIonRouter();

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

  return (
    <>
      <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
        <CommonHeader onBack={onBack} nav={nav} />

        <Grow in>
          <div>
            <Box sx={{ pt: 10 }}>
              <Container sx={{ pb: 2 }}>
                <LoadingButton onClick={play} fullWidth sx={{ backgroundColor: '#6500df', pt: 1, pb: 1, color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', '&:hover': { backgroundColor: '#6500df' } }}>
                  Add New Account
                </LoadingButton>
              </Container>
              <Container>
                <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#1a6ba4', p: 1, borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box>
                      <AccountBalanceOutlinedIcon sx={{ color: '#ffffff', fontSize: 45, ml: 1.5 }} />
                      <Typography sx={{ textAlign: 'center', backgroundColor: '#ffffffb8', fontFamily: 'Nunito', fontWeight: '700', pl: 0.5, pr: 0.5, borderRadius: 50 }}>Primary</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0.3 }} />
                    <Box sx={{ width: 0.0002, height: 100, backgroundColor: '#ffffff' }} />
                    <Box sx={{ flexGrow: 0.2 }} />
                    <Box sx={{ pt: 1 }}>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: '#ffffff', pl: 1 }}>HDFC Bank</Typography>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: '#ffffffb8', pl: 1, pt: 0.6 }}>XXXXXXXXXX1234</Typography>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: '#ffffffb8', pl: 1, pt: 0.6 }}>HDFC0001053</Typography>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: '#ffffff', pl: 1, pt: 0.6 }}>Prem Biswas</Typography>
                    </Box>
                  </Box>
                </Box>
              </Container>
              <Container sx={{ pt: 2 }}>
                <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#1a6ba4', p: 1, borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box>
                      <AccountBalanceOutlinedIcon sx={{ color: '#ffffff', fontSize: 45, ml: 1.5 }} />
                      <Typography sx={{ textAlign: 'center', backgroundColor: '#ffffffb8', fontFamily: 'Nunito', fontWeight: '700', pl: 0.5, pr: 0.5, borderRadius: 50 }}>Primary</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0.3 }} />
                    <Box sx={{ width: 0.0002, height: 100, backgroundColor: '#ffffff' }} />
                    <Box sx={{ flexGrow: 0.2 }} />
                    <Box sx={{ pt: 1 }}>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: '#ffffff', pl: 1 }}>Axis Bank</Typography>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: '#ffffffb8', pl: 1, pt: 0.6 }}>XXXXXXXXXX3421</Typography>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: '#ffffffb8', pl: 1, pt: 0.6 }}>UBIT0001053</Typography>
                      <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: '#ffffff', pl: 1, pt: 0.6 }}>Prem Biswas</Typography>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Box>
          </div>
        </Grow>
      </Box>
    </>
  )
}

export default BankDetailes