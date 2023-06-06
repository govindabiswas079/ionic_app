import React from 'react'
import { Box, Container, Grow, Typography, Divider, Avatar, Button, Skeleton, Checkbox, } from '@mui/material';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import trimg from '../../img/2953962.jpg'

import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { useIonRouter } from '@ionic/react';
import { IonRefresher, IonRefresherContent } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const Transaction = () => {
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [sortMonth, setSortMonth] = React.useState(false);
  const [searchFilter, setSearchFilter] = React.useState("");
  const [sortFilter, setSortFilter] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [allTrList, setAllTrList] = React.useState([])
  const [loader, setLoader] = React.useState(true);

  function onDismisssortMonth() {
    setSortMonth(false)
  }
  function onDismisssortFilter() {
    setSortFilter(false)
  }

  var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });
  var config = {
    method: 'POST',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/vendorTrlist`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vinfo
  };
  const Transaction_data = async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setAllTrList(response.data.vendor_trlist.reverse())
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
        setLoader(true)
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });

    return () => controller.abort();
  }

  React.useEffect(() => {
    Transaction_data()
  }, [])

  var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
  var d = new Date();
  d.setDate(1);
  var arr = []
  for (var i = 0; i <= 11; i++) {
    const pMY = monthName[d.getMonth()] + ' ' + d.getFullYear()
    arr.push(pMY)
    // console.log(arr)
    d.setMonth(d.getMonth() - 1);
  }


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // const handleChangeSearch = e => {
  //   setSearchFilter(e.target.value);
  //   if(e.target.value===""){
  //     // setSearchShow(false);
  //   }
  //   else {
  //     // setSearchShow(true);
  //   }
  // };


  const doubled = allTrList.map((value) => ({
    created_date: new Date(parseInt(value.created_date.substr(6))).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric" }),
    currency: value.currency,
    disc_amount: value.disc_amount,
    from_cust_id: value.from_cust_id,
    location: value.location,
    name: value.name,
    net_amount: value.net_amount,
    pay_type: value.pay_type,
    status: value.status,
    store_id: value.store_id,
    store_name: value.store_name,
    to_vendor_id: value.to_vendor_id,
    total_amount: value.total_amount,
    tr_id: value.tr_id,
    tr_online_id: value.tr_online_id,
    tr_type: value.tr_type,
    trx_code: value.trx_code,
    fetch_type: value.fetch_type,
  }));
  // console.log(doubled);

  // console.log(searchFilter)
  const allTrListFilter = doubled.filter(
    monthYear => {
      return (
        monthYear
          .created_date
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        monthYear
          .pay_type
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        monthYear
          .status
          .toLowerCase()
          .includes(searchFilter.toLowerCase())
      );
    }
  );
  // console.log(allTrList)


  // var options = { year: 'numeric', day: 'numeric', month: 'long', hour12: true, hour: "numeric", minute: "numeric" };

  function doRefresh(event) {
    // console.log('Begin async operation');

    setTimeout(() => {
      // console.log('Async operation has ended');
      Transaction_data()
      event.detail.complete();
    }, 2000);
  }

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={(event) => { doRefresh(event) }}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <Grow in>
        <div>
          <Container sx={{ pt: 10, pb: 11, backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 1 }}>
              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 15.5 }}>Transaction History</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <Button variant='outlined' onClick={() => setSortMonth(true)} endIcon={<ArrowDropDownOutlinedIcon />} sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 10 }} size="small">Month</Button>{" "}
                <Button variant='outlined' onClick={() => setSortFilter(true)} endIcon={<ArrowDropDownOutlinedIcon />} sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 10 }} size="small">Filters</Button>
              </Box>
            </Box>
            {loader ?
              <Box sx={{ pt: 2 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                  <Box key={id}>
                    <Skeleton animation="wave" sx={{ height: 80, mt: '-24px' }} />
                  </Box>
                ))}
              </Box>
              :
              <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#FFFFFF', boxShadow: 3, borderRadius: 1, mt: 0.7, borderRadius: 1, pb: 2, }}>
                {allTrListFilter.length === null ?
                  <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                    <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                  </Box>
                  :
                  allTrListFilter.length === 0 ?
                    <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                      <img src={trimg} alt='' style={{ borderRadius: '10px' }} />
                    </Box>
                    :
                    allTrListFilter.map((value, id) => (
                      <Box onClick={() => { Navigate.push('/TransactionDetailsScreen'); sessionStorage.setItem('TransactionDetailsScreen', JSON.stringify(allTrListFilter[id])) }} key={id} sx={{ width: '100%', height: 'auto' }}>
                        <Grow in>
                          <div>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1, pb: 1, pl: 1, pr: 1 }}>
                              <Avatar src={'/static/images/avatar/1.jpg'} alt={value.name} sx={{ borderRadius: 1, zIndex: 0 }} />
                              <Box sx={{ pl: 1 }}>
                                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 13, color: '#6500d8' }}>{value.name} <span style={{ color: 'gray', fontSize: '10px' }}> {value.trx_code}</span> </Typography>
                                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 10, color: 'gray', textTransform: 'uppercase' }}>{value.created_date} | {value.pay_type}</Typography>
                                {/* <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 10, color: 'gray' }}>{new Date(parseInt(value.created_date.substr(6))).toLocaleDateString("en-US", options)} | {value.pay_type}</Typography> */}
                              </Box>
                              <Box sx={{ flexGrow: 1 }} />
                              <Box>
                                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 14 }}> &#8377;  {value.net_amount}</Typography>
                                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 9.5, backgroundColor: 'yellowgreen', borderRadius: 0.2, textAlign: 'center', pl: 0.1, pr: 0.1, }}>{value.status}</Typography>
                              </Box>
                            </Box>
                            <Divider sx={{ ml: 1 }} />
                          </div>
                        </Grow>
                      </Box>
                    ))}
              </Box>
            }
          </Container>

          <BottomSheet
            open={sortMonth}
            onDismiss={onDismisssortMonth}
            blocking={true}
            snapPoints={({ maxHeight }) => [
              maxHeight - maxHeight / 3,
              maxHeight * 0.6,
            ]}
            header={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ pb: 1, color: 'text.secondary', fontFamily: 'Nunito', fontWeight: '700' }}>Month</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography onClick={() => { setSelectedValue(''); setSearchFilter('') }} sx={{ pb: 1, color: 'blue', fontFamily: 'Nunito', fontWeight: '700' }}>CLEAR</Typography>
              </Box>
            }
            footer={
              <Button fullWidth onClick={() => { onDismisssortMonth(); setSearchFilter(selectedValue) }}>
                Done
              </Button>
            }
          >
            <Container>
              <Divider sx={{ mb: 1, }} />
              <Box>
                {arr.map((value, id) => (
                  <Box key={id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700' }}>{value}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Checkbox checked={selectedValue === value} onChange={handleChange} value={value} />
                  </Box>
                ))}
              </Box>
            </Container>
          </BottomSheet>

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
        </div>
      </Grow>
    </>
  )
}

export default Transaction;