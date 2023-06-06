import React from 'react';
import { Grow, Typography, Box, Container, Button, IconButton, Skeleton, Avatar } from '@mui/material';
import trimg from '../../img/2953962.jpg'
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { useHistory } from 'react-router-dom';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProgressiveImage from '../../ProgressiveImage'
import { useIonRouter } from '@ionic/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ApiRequestUrl } from '../../ApiRequest';

const DiscountAdvertisement = () => {
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [loader, setLoader] = React.useState(false);
  const [loaderUpdate, setLoaderUpdate] = React.useState(false);
  const [vendorbannerlist, setVendorbannerlist] = React.useState([]);

  var vendorbannerlist_data = JSON.stringify({
    vendor_id: vendor_id,
  });
  //console.log(vendorbannerlist_data)

  var vendorbannerlist_config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/getdiscAdvertiselist`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: vendorbannerlist_data
  };

  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(vendorbannerlist_config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setVendorbannerlist(response.data.disInfolist.reverse())
          setLoader(false)
        } else {
          if (response.data.response.status === -1) {
            setLoader(false)
            alert(response.data.response.message)
          } else {
            // alert('somethig worng')
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
  }, []);


  // const handleUpdate = async (e) => {
  //   setLoaderUpdate(true)
  //   var handleUpdateGet = {
  //     vendor_id: e.vendor_id,
  //     ad_id: e.adId
  //   }
  //   // console.log(handleUpdateGet)
  //   var handleUpdate_config = {
  //     method: 'post',
  //     url: sanitizeUrl('http://codefeverllp.com/katta/API.svc/getAdvertisebyVendor'),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: handleUpdateGet
  //   };
  // 
  //   const controller = new AbortController();
  //   const signal = controller.signal
  //   await axios(handleUpdate_config, { signal: signal })
  //     .then(function (response) {
  //       // console.log(response.data)
  //       if (response.data.response.status === 1) {
  //         sessionStorage.setItem('vendorbannerdata', JSON.stringify(response.data.advbannerinfo))
  //         // Navigate.push('/AdVertiseFromUpdate')
  //         setLoaderUpdate(false)
  //       } else {
  //         if (response.data.response.status === -1) {
  //           setLoaderUpdate(false)
  //         } else {
  //           alert('somethig worng')
  //         }
  //       }
  //     })
  //     .catch(function (err) {
  //       setLoaderUpdate(true)
  //       if (err.name === "AbortError") {
  //         console.log("successfully aborted");
  //       } else {
  //         console.log(err);
  //       }
  //     });
  //   return () => controller.abort();
  // }

  // React.useEffect(() => {
  //   if ('1,2' === '1,2') {
  //     console.log('expired')
  //   } else {
  //     console.log('published')
  //   }
  // });

  // var currentDate = new Date().toLocaleDateString()
  // var parsedDate1 = new Date(parseInt("/Date(1648541345000+0530)/".substr(6))).toLocaleDateString();
  // var parsedDate2 = new Date(parseInt("/Date(1648665000000+0530)/".substr(6))).toLocaleDateString();
  // var parsedDate3 = new Date(parseInt("/Date(1649337886000+0530)/".substr(6))).toLocaleDateString('en-IN');
  // var parsedDate4 = new Date().toLocaleDateString('en-IN');
  // console.log(parsedDate === currentDate ? 'published' : 'expired');
  // if (currentDate === parsedDate) {
  //   console.log('published')
  // } else {
  //   console.log('expired')
  // }

  // console.log('parsedDate1', parsedDate1)
  // console.log('parsedDate3', parsedDate3)
  // console.log('parsedDate4', parsedDate4)
  // console.log('parsedDate3', new Date())
  // console.log('parsedDate4', parsedDate4)

  // console.log('06/4/2022' >= '29/4/2022' ? null : 'Expired')


  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ pt: 10, pb: 5 }}>
            <Container>
              <Button onClick={() => Navigate.push('/DiscountAdvertisementFrom')} fullWidth sx={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '700', backgroundColor: '#6500d8', '&:hover': { backgroundColor: '#6500d8' }, pt: 1, pb: 1 }}>Create</Button>
            </Container>

            {loaderUpdate ?
              <>
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </>
              : ""
            }

            <Container sx={{ pt: 4 }}>
              <Typography sx={{ color: '#00000', fontFamily: 'Nunito', fontWeight: '700' }}>Ads History</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                {loader ?
                  <Box sx={{ pt: 2 }}>
                    {[0, 1, 2, 3, 4].map((id) => (
                      <Box key={id}>
                        <Skeleton variant="rectangular" animation="wave" height={80} sx={{ borderRadius: 1, mt: 0.7 }} />
                      </Box>
                    ))}
                  </Box>
                  :
                  vendorbannerlist.length === 0 ?
                    <Box sx={{ boxShadow: 9, borderRadius: '10px' }}>
                      {/* <img src={trimg} alt='' style={{ borderRadius: '10px' }} /> */}
                      <LazyLoadImage effect='blur' src={trimg} alt={''} style={{ borderRadius: '10px' }} />
                    </Box>
                    :
                    vendorbannerlist.map((value, id) => (
                      <Box key={id}>
                        {value.ispublish === false ?
                          <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#FFFFFF', borderRadius: 1, boxShadow: 3, display: 'flex' }}>
                            <Box sx={{ alignItems: 'center', p: 1 }}>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 20, }} className="card__title">{value.title}</Typography>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 11 }}>{new Date(parseInt(value.createdate.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric" })}</Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ alignItems: 'center', p: 1 }}>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 13, borderRadius: 0.5, pl: 1, pr: 1, pb: 0.1, pt: 0.1, color: '#000000' }}>{value.discount_type}</Typography>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', backgroundColor: value.ispublish === false ? 'yellow' : 'green', textAlign: 'center', fontSize: 11, borderRadius: 0.5, pl: 1, pr: 1, pb: 0.1, pt: 0.1, color: '#000000' }}>{value.ispublish === true ? 'published' : 'Pending'}</Typography>
                            </Box>
                          </Box>
                          :
                          <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#FFFFFF', borderRadius: 1, boxShadow: 3, mt: 1 }}>
                            <Box sx={{ width: '100%', height: 'auto', backgroundColor: '#f3f8fa', borderRadius: 1, boxShadow: 3, }}>
                              {/* <img src={value.banner_url} alt='' style={{ borderRadius: 10, width: '100%', height: '100%', }} /> */}
                              <ProgressiveImage src={value.banner_url} placeholder={'https://www.twicpics.com/images/image-fly.svg'} style={{ width: '100%', height: '100%', borderRadius: 5, }} />
                              {/* <LazyLoadImage effect='blur' placeholderimg={placeholderimg} src={value.banner_url} alt={''} style={{ width: '100%', height: '100%', borderRadius: '5px' }} /> */}
                            </Box>
                            <Box sx={{ p: 1 }}>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, color: '#000000', fontSize: 20 }}>{value.title}</Typography>
                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, color: 'gray', fontSize: 12, lineHeight: 1.3, pt: .6 }}>{value.message}</Typography>


                              <Box sx={{ display: 'flex', alignItems: 'center', pt: 3, pb: 2 }}>
                                <Box sx={{ pl: 1, }}>
                                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, color: 'gray', fontSize: 12 }}>Create Date:</Typography>
                                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, color: 'gray', fontSize: 12 }}>Expired Date:</Typography>
                                </Box>
                                <Box sx={{ pl: 1, }}>
                                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, color: '#000000', fontSize: 12 }}>{new Date(parseInt(value.createdate.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric" })}</Typography>
                                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, color: '#000000', fontSize: 12 }}>{new Date(parseInt(value.expired_date.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric" })}</Typography>
                                </Box>
                              </Box>

                              <Box /* onClick={() => { Navigate.push(`/retailes-details/${adsforuserJSON.vendor_id}`); sessionStorage.setItem('VendorAdd', 'VendorAdd') }} */ sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1, pb: 2 }}>
                                <Avatar sx={{ borderRadius: 1 }} src={'./img.png'} alt={value.store_name} />
                                <Box sx={{ pl: 1, }}>
                                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, color: '#000000', fontSize: 18 }}>{value.store_name}</Typography>
                                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, color: 'gray', fontSize: 15 }}>{value.category_name}</Typography>
                                </Box>
                                <Box sx={{ flexGrow: 1 }} />
                                <IconButton>
                                  {/* <ChevronRightIcon /> */}
                                </IconButton>
                              </Box>

                              <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, color: 'gray', fontSize: 12, lineHeight: 1.3, pt: .6, pb: .6 }}>{value.row_instructions}</Typography>
                            </Box>
                          </Box>
                        }
                      </Box>
                    ))}
              </Box>
            </Container>
          </Box>
        </div>
      </Grow>
    </>
  )
}

export default DiscountAdvertisement

const placeholderimg = 'https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png'



/* 


<Box sx={{ boxShadow: 9 }} className="card">
                            <Box sx={{ position: 'absolute', top: 9, right: 5, backgroundColor: new Date(parseInt(value.expired_date.substr(6))).toLocaleDateString() > new Date().toLocaleDateString() ? 'green' : 'red', borderRadius: 1, zIndex: 1 }}>
                              <IconButton>
                                {new Date(parseInt(value.expired_date.substr(6))).toLocaleDateString() > new Date().toLocaleDateString() ?
                                  <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 10, color: '#FFFFFF' }}>{value.ispublish === true ? 'published' : 'pending'}</Typography>
                                  :
                                  null
                                }
                                <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 10, color: '#FFFFFF' }}>{new Date(parseInt(value.expired_date.substr(6))).toLocaleDateString() > new Date().toLocaleDateString() ? null : 'Expired'}</Typography>
                              </IconButton>
                            </Box>
                            <Avatar src={value.banner_url === '' ? './img.png' : value.banner_url} sx={{ borderRadius: 1 }} className="card__image" alt={value.title} />
                            <Box className="card__overlay">
                              <Box className="card__header">
                                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                                  <path />
                                </svg>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Avatar className="card__thumbc" src={"/7D7I6dI.png"} alt={value.title} />
                                  <Box sx={{ alignItems: 'center', pl: 2 }}>
                                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: 20, }} className="card__title">{value.title}</Typography>
                                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', }} className="card__status">{value.message}</Typography>
                                    <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', }} className="card__status">{new Date(parseInt(value.createdate.substr(6))).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <Box className="card__description">
                                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', }}>{value.message}</Typography>
                                <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', }}>{value.row_instructions}</Typography>
                              </Box>
                            </Box>
                          </Box>


*/