import React from 'react';
import { Box, Typography, Divider, Grow } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import { LoadingButton } from '@mui/lab';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';
import { useIonRouter } from '@ionic/react';

const SilverPlan = ({ checked, silverPlanObj, loaderData }) => {
  let Navigate = useIonRouter()
  const vendor_id = localStorage.getItem('vendor_id');
  const [loader, setLoader] = React.useState(false)

  var subscription = JSON.stringify({
    subsinfo: {
      plan_id: silverPlanObj.plan_id,
      vendor_id: vendor_id,
      amount: silverPlanObj.amount,
      plan_code: silverPlanObj.plan_code
    }
  });

  const Submit_Sub = (e) => {
    e.preventDefault();
    setLoader(true)
    sessionStorage.setItem('subscription', subscription);
    setTimeout(() => {
      Navigate('/SubscriptionCheckout')
    }, 1000)
  }

  const planData = silverPlanObj.plan_desc
  let planDataobj = eval(planData);

  return (
    <>
      {loader ?
        <Backdrop
          sx={{ color: 'red', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress sx={{ color: '#ffcf00' }} />
        </Backdrop>
        : ''}
      <Grow in>
        <div>
          <Box sx={{ pt: 3, display: 'flex', justifyContent: 'center', }}>
            {loaderData ?
              ''
              :
              <Box sx={{ width: "100%", height: 'auto', backgroundColor: '#FFFFFF', borderRadius: 1, transition: 'ease all 0.5s', boxShadow: 9 }}>
                <Typography sx={{ color: '#000000', textAlign: 'center', pt: 1, pb: 1, fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>Silver</Typography>
                <Divider />
                <Typography sx={{ color: '#000000', textAlign: 'center', pt: 1, pb: 1, fontFamily: 'Nunito', fontWeight: '700', fontSize: 20 }}>&#x20b9; {checked ? '55,000' : silverPlanObj.amount}{" "}<small style={{ fontSize: '10px' }}>/{" "}{checked ? 'year' : 'month'}</small></Typography>
                <Typography sx={{ color: '#FFFFFF', textAlign: 'center', pt: 0.2, /* pb: 1, */ fontFamily: 'Nunito', fontWeight: '700', fontSize: 15, backgroundColor: '#6500d8', width: 'auto' }}>{silverPlanObj.plan_name}</Typography>
                {/* <Typography sx={{ color: '#000000', textAlign: 'center', pt: 1, pb: 1, fontFamily: 'Nunito', fontWeight: '700', fontSize: 15 }}>{silverPlanObj.plan_desc}</Typography> */}
                <Box sx={{ pt: 1, pl: 2 }}>
                  {planDataobj.map((value, id) => (
                    <Box key={id} sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckIcon sx={{ border: '1px solid #6500d8', borderRadius: 50, backgroundColor: '#6500d8', color: '#ffffff', fontSize: 14 }} />
                      <Typography sx={{ pl: 1, fontSize: 14, fontFamily: 'Nunito', fontWeight: '600' }}>{value.PlanItem}</Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ pl: 1, pr: 1, pt: 2, pb: 2 }}>
                  <LoadingButton onClick={(e) => Submit_Sub(e)} fullWidth sx={{ backgroundColor: '#6500d8', color: '#ffffff', transition: 'ease all 0.5s', '&:hover': { backgroundColor: '#6500d8' } }}>Get Start</LoadingButton>
                </Box>
              </Box>
            }
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default SilverPlan