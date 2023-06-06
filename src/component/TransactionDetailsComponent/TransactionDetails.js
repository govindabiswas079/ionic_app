import React from 'react';
import { Grow, Typography, Box, Container, Avatar, Divider, } from '@mui/material';
import suss from '../../img/suss.png'

const TransactionDetails = () => {  
  const TransactionDetailsScreen = sessionStorage.getItem('TransactionDetailsScreen')
  const TransactionDetailsScreenJSON = JSON.parse(TransactionDetailsScreen);

  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ pt: 10 }}>
            <Container>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar src={suss} alt='' sx={{ borderRadius: 0, width: '100%', height: '100%' }} />
              </Box>
              <Typography sx={{ color: 'green', fontFamily: 'NUnito', fontWeight: 700, textAlign: "center", textTransform: 'capitalize', fontSize: 19 }}>payment successful</Typography>
              <Typography sx={{ pt: 1, color: 'gray', fontFamily: 'NUnito', fontWeight: 600, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>Your payment has been successed <br /> Details of transaction are included below  </Typography>
              <Divider sx={{ pt: 2, }} />
              <Typography sx={{ pt: 1.5, color: 'blue', fontFamily: 'NUnito', fontWeight: 700, textAlign: "center", textTransform: 'capitalize', fontSize: 15 }}>transaction number: {TransactionDetailsScreenJSON?.trx_code}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 3 }}>
                <Typography sx={{ color: 'gray', fontFamily: 'NUnito', fontWeight: 700, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>total amount received</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 600, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>&#8377; {TransactionDetailsScreenJSON?.net_amount}</Typography>
              </Box>
              <Divider sx={{ pt: 2, }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 3 }}>
                <Typography sx={{ color: 'gray', fontFamily: 'NUnito', fontWeight: 700, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>total discount approved</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 600, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>&#8377; {TransactionDetailsScreenJSON?.disc_amount}</Typography>
              </Box>
              <Divider sx={{ pt: 2, }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 3 }}>
                <Typography sx={{ color: 'gray', fontFamily: 'NUnito', fontWeight: 700, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>Payment Type</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 600, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>{TransactionDetailsScreenJSON?.fetch_type}</Typography>
              </Box>
              <Divider sx={{ pt: 2, }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 3 }}>
                <Typography sx={{ color: 'gray', fontFamily: 'NUnito', fontWeight: 700, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>payment mode</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 600, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>{TransactionDetailsScreenJSON?.pay_type}</Typography>
              </Box>
              <Divider sx={{ pt: 2, }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 3 }}>
                <Typography sx={{ color: 'gray', fontFamily: 'NUnito', fontWeight: 700, textAlign: "center", textTransform: 'capitalize', fontSize: 12 }}>transaction date</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 600, textAlign: "center", textTransform: 'uppercase', fontSize: 12 }}>{TransactionDetailsScreenJSON?.created_date}</Typography>
              </Box>
              <Divider sx={{ pt: 2, }} />
            </Container>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default TransactionDetails