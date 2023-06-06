import React from 'react';
import { Box, Slide, Grow, Container, Typography, Divider } from '@mui/material';
import CommonHeader from '../../../navigators/CommonHeader';
import { useIonRouter } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const AccountDetails = ({ nav }) => {
  let Navigate = useIonRouter();

  const onBack = () => {
    Navigate.push(`/ProfileScreen`)
  }

  return (
    <>
      <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
        <CommonHeader onBack={onBack} nav={nav} />

        <Grow in>
          <div>
            <Box sx={{ pt: 10 }}>
              <Container>
                <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#ffffff', p: 1, borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: '#000000', fontSize: 15 }}>Owner Details</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', color: 'gray', fontSize: 13 }}>Edit</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ pt: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Name:</Typography>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>Prem Biswas</Typography>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Email:</Typography>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>prembiswas@gmail.com</Typography>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14, color: 'gray' }}>Contact:</Typography>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, color: 'gray', pl: 1 }}>+91 9078563412</Typography>
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

export default AccountDetails