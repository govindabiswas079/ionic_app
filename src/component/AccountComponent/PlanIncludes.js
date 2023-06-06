import { styled } from '@mui/material/styles';
import { Box, Typography, Grow } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const CardWrapper = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const PlanIncludes = () => {
  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ boxShadow: 3, backgroundColor: '#ffffff', padding: 1, borderRadius: 1, mt: 3, }}>
            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 25 }}>Plan Includes</Typography>
            <CardWrapper sx={{ p: 1, boxShadow: 3, mt: 2, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 40, height: 40 }}>
                  <CheckIcon sx={{ borderRadius: 50, color: 'blue', border: '1px solid #000000' }} />
                </Box>
                <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 15, pl: 1 }}>Plan Includes</Typography>
              </Box>
            </CardWrapper>
            <CardWrapper sx={{ p: 1, boxShadow: 3, mt: 2, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 40, height: 40 }}>
                  <CheckIcon sx={{ borderRadius: 50, color: 'blue', border: '1px solid #000000' }} />
                </Box>
                <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 15, pl: 1 }}>Plan Includes</Typography>
              </Box>
            </CardWrapper>
            <CardWrapper sx={{ p: 1, boxShadow: 3, mt: 2, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ece6f585', borderRadius: 50, width: 40, height: 40 }}>
                  <CheckIcon sx={{ borderRadius: 50, color: 'blue', border: '1px solid #000000' }} />
                </Box>
                <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 15, pl: 1 }}>Plan Includes</Typography>
              </Box>
            </CardWrapper>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default PlanIncludes