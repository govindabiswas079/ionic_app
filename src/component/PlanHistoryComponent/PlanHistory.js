import React from 'react';
import { Grow, Typography, Box, Container, } from '@mui/material';

const PlanHistory = ({ vendorplanhistoryJson }) => {


  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ pt: 10 }}>
            <Container>
              <Typography sx={{ color: 'green', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 21 }}>payment successful</Typography>
              <Typography sx={{ pt: 1, color: 'gray', fontFamily: 'NUnito', fontWeight: 600, textTransform: 'capitalize', fontSize: 12 }}>Thank you for using TheKatta Business app, we hope you had an awesome experience</Typography>
              <Box sx={{ borderTop: '1px dashed #bbb', mt: 2 }} />
            </Container>
          </Box>

          <Box sx={{ backgroundColor: '#FFFFFF', mt: 3, pt: 2 }}>
            <Container>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>Transaction Id</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>TKBCHMH442401-{vendorplanhistoryJson?.subscribe_id}</Typography>
              </Box>
              <Box sx={{ borderTop: '1px dashed #bbb', mt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>Payment Date</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>{new Date(parseInt(vendorplanhistoryJson?.created_date.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric" })}</Typography>
              </Box>
              <Box sx={{ borderTop: '1px dashed #bbb', mt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>plan validity</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>{vendorplanhistoryJson?.plan_validity} days</Typography>
              </Box>
              <Box sx={{ borderTop: '1px dashed #bbb', mt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>Expiry Date</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>{new Date(parseInt(vendorplanhistoryJson?.expired_date.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric" })}</Typography>
              </Box>
              <Box sx={{ borderTop: '1px dashed #bbb', mt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>Name</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>{vendorplanhistoryJson?.owner_name}</Typography>
              </Box>
              <Box sx={{ borderTop: '1px dashed #bbb', mt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>Store Name</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>{vendorplanhistoryJson?.store_name}</Typography>
              </Box>
              <Box sx={{ borderTop: '1px dashed #bbb', mt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>Plan Name</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 13 }}>{vendorplanhistoryJson?.plan_name}</Typography>
              </Box>
              <Box sx={{ borderTop: '1px dashed #bbb', mt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2, pb: 2 }}>
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 15 }}>Amount Paid</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#000000', fontFamily: 'NUnito', fontWeight: 700, textTransform: 'capitalize', fontSize: 15 }}>&#8377; {vendorplanhistoryJson?.amount}.0</Typography>
              </Box>
              {/* <Box sx={{ borderTop: '1px dashed #bbb', mt: 2 }} /> */}
            </Container>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default PlanHistory