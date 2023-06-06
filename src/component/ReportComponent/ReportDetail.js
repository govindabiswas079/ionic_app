import React from 'react'
import { Box, Container, Grow, Typography, Divider, Button, } from '@mui/material';
import { Checkbox, } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Input, Slide, InputAdornment, IconButton, } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';
import trimg from '../../img/2953962.jpg'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import { useIonRouter } from '@ionic/react';

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

const APPBAR_MOBILE = 79;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: '#FFFFFF',
  backgroundColor: '#24e39',
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

const ReportDetail = ({ doubled }) => {
  let Navigate = useIonRouter();
  const [backDisable, setBackDisable] = React.useState(true)
  const [nextDisable, setNextDisable] = React.useState(true)
  const [isOpen, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [searchFilter, setSearchFilter] = React.useState("");
  const [sortFilter, setSortFilter] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [itemsToShow, setItemsToShow] = React.useState(10);
  const [itemsToShowSet, setItemsToShowSet] = React.useState(0);

  function onDismisssortFilter() {
    setSortFilter(false)
  }
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const allTrListFilter = doubled?.filter(
    monthYear => {
      return (
        monthYear
          .pay_type
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        monthYear
          .name
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        monthYear
          .fetch_type
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        monthYear
          .trx_code
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        monthYear
          .status
          .toLowerCase()
          .includes(searchFilter.toLowerCase())
      );
    }
  );

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scollTop = () => {
    scroll.scrollToTop();
  }

  const showmore = () => {
    setItemsToShowSet(itemsToShowSet + 10);
    setItemsToShow(itemsToShow + 10);
    scollTop();
  }
  const showless = () => {
    setItemsToShowSet(itemsToShowSet - 10);
    setItemsToShow(itemsToShow - 10);
    scollTop();
  }

  React.useEffect(() => {
    if (itemsToShowSet === 0) {
      setBackDisable(true)
    } else {
      setBackDisable(false)
    }

    if (allTrListFilter?.length > itemsToShow) {
      setNextDisable(false)
    } else {
      setNextDisable(true)
    }
  })

  return (
    <>
      {loader ?
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
        : ""}
      <Grow in>
        <div>
          <Box sx={{ pt: 10, pb: 11 }}>
            <Container>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 1 }}>
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 15.5 }}>Report History</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                  <Button variant='outlined' onClick={handleOpen} endIcon={<SearchOutlinedIcon />} sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 10 }} size="small">Search</Button>{" "}
                  <Button variant='outlined' onClick={() => setSortFilter(true)} endIcon={<ArrowDropDownOutlinedIcon />} sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 10 }} size="small">Filters</Button>
                </Box>
              </Box>
            </Container>
            {doubled === undefined ?
              <Container>
                <Grow in>
                  <div>
                    <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                      <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                    </Box>
                  </div>
                </Grow>
              </Container>
              :
              <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#FFFFFF', boxShadow: 3, borderRadius: 1, mt: 0.7 }}>
                {allTrListFilter?.length === 0 ?
                  <Container>
                    <Grow in>
                      <div>
                        <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                          <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                        </Box>
                      </div>
                    </Grow>
                  </Container>
                  :
                  allTrListFilter?.slice(itemsToShowSet, itemsToShow).map((value, id) => (
                    <Box onClick={() => { Navigate.push('/TransactionDetailsScreen'); sessionStorage.setItem('TransactionDetailsScreen', JSON.stringify(allTrListFilter[id])); sessionStorage.setItem('ReportDetails', 'ReportDetails') }} key={id} sx={{ width: '100%', height: 'auto' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1, pb: 1, pl: 1, pr: 1 }}>

                        <Box sx={{ pl: 1 }}>
                          <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 15, color: '#6500d8' }}>{value?.name} <span style={{ color: 'gray', fontSize: '12px' }}> {value?.trx_code}</span> </Typography>
                          <Box>
                            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 12, color: 'gray', }}>{value?.fetch_type} Payment</Typography>
                          </Box>
                          <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 12, color: 'gray', textTransform: 'uppercase' }}>{value?.created_date} | {value?.pay_type}</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box>
                          <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 16 }}> &#8377;  {value?.net_amount}</Typography>
                          <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 11.5, backgroundColor: 'yellowgreen', borderRadius: 0.2, textAlign: 'center', pl: 0.1, pr: 0.1, }}>{value?.status}</Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ ml: 1 }} />
                    </Box>
                  ))}
              </Box>
            }
          </Box>


          {doubled === undefined ?
            <Container>
              {/* <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
              </Box> */}
            </Container>
            :
            allTrListFilter?.length === 0 ?
              <Container>
                {/* <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                  <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                </Box> */}
              </Container>
              :
              <BottomContainer>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                  <Button disabled={backDisable} startIcon={<NavigateBeforeOutlinedIcon />} onClick={() => showless()} sx={{ boxShadow: 3, backgroundColor: '#6500d8', color: '#FFFFFF', '&:hover': { backgroundColor: '#6500d8' } }} disableElevation fullWidth size='medium' type="submit" variant="contained" color="secondary">
                    Previous
                  </Button>
                  <Box sx={{ margin: 1 }} />
                  <Button disabled={nextDisable} endIcon={<NavigateNextOutlinedIcon />} onClick={() => showmore()} sx={{ boxShadow: 3, backgroundColor: '#6500d8', color: '#FFFFFF', '&:hover': { backgroundColor: '#6500d8' } }} disableElevation fullWidth size="medium" type="submit" variant="contained" color="secondary">
                    Next
                  </Button>
                </Box>
              </BottomContainer>
          }

          <BottomSheet
            open={sortFilter}
            onDismiss={() => { onDismisssortFilter(); }}
            blocking={true}
            snapPoints={({ maxHeight }) => [
              maxHeight - maxHeight / 3,
              maxHeight * 0.6,
            ]}
            header={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ pb: 1, color: 'text.secondary', fontFamily: 'Nunito', fontWeight: '700' }}>Filter</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography onClick={() => { setSelectedValue(''); setSearchFilter('') }} sx={{ pb: 1, color: 'blue', fontFamily: 'Nunito', fontWeight: '700' }}>CLEAR</Typography>
              </Box>
            }
            footer={
              <Button fullWidth onClick={() => { onDismisssortFilter(); setSearchFilter(selectedValue) }}>
                Done
              </Button>
            }
          >
            <Container>
              <Divider sx={{ mb: 1, }} />
              <Box >
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, backgroundColor: '#ece6f585', color: 'gray' }}>Payment Type</Typography>
                {['BHIM UPI', 'Debit Card', 'Credit Card', 'Wallet', 'Cash'].map((value, id) => (
                  <Box key={id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700' }}>{value}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Checkbox checked={selectedValue === value} onChange={handleChange} value={value} />
                  </Box>
                ))}
              </Box>
              <Box >
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 18, backgroundColor: '#ece6f585', color: 'gray' }}>Status</Typography>
                {['Failed', 'Success'].map((value, id) => (
                  <Box key={id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700' }}>{value}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Checkbox checked={selectedValue === value} onChange={handleChange} value={value} />
                  </Box>
                ))}
              </Box>
            </Container>
          </BottomSheet>

          <div>
            <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
              <SearchbarStyle>
                <Input tyep="text" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} autoFocus fullWidth disableUnderline placeholder="Search…" sx={{ color: '#FFFFFF' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  }
                  style={{ margin: 1, fontFamily: 'Nunito', fontWeight: '500', color: '#FFFFFF' }}
                />
                <IconButton onClick={() => handleClose()} variant="contained" sx={{ fontFamily: 'Nunito', fontWeight: '500', backgroundColor: '#2d364c', color: '#000000', mr: 1, boxShadow: 3 }}>
                  <CloseOutlinedIcon sx={{ fontSize: 10, color: '#ffcf00' }} />
                </IconButton>
                <Button variant="contained" onClick={() => { handleClose(); setSearchFilter('') }} sx={{ fontFamily: 'Nunito', fontWeight: '500', backgroundColor: '#ffcf00', color: '#000000' }}>
                  Clear
                </Button>
              </SearchbarStyle>
            </Slide>
          </div>
        </div>
      </Grow>
    </>
  )
}

export default ReportDetail


const BottomContainer = styled(Container)(() => ({
  backgroundColor: '#f3f8fa',
  width: '100%',
  justifyContent: 'center',
  /* alignItems: 'center', */
  position: 'fixed',
  bottom: 0,
  // zIndex: 5,
  paddingBottom: 10,
}));