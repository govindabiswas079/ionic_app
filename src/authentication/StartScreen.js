/* import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Grow } from '@mui/material';
import firstImg from '../img/1.png';
import SecondImg from '../img/2.png';
import thirdImg from '../img/3.png';
import { v4 as uuidv4 } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

const StartScreen = () => {
  const Device_id = uuidv4();
  const [first, setFirst] = React.useState(true)
  const [second, setSecond] = React.useState(false)
  const [third, setThird] = React.useState(false)
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [loader, setLoader] = React.useState(false);

  const firstClick = () => {
    setFirst(true)
    setSecond(false)
    setThird(false)
  }
  const secondClick = () => {
    setSecond(true)
    setFirst(false)
    setThird(false)
  }
  const thirdClick = () => {
    setThird(true)
    setSecond(false)
    setFirst(false)
  }

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your Device');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        const data = position.coords;
        const latitude = data.latitude;
        const longitude = data.longitude

        setStatus(null);
        setLat(latitude);
        setLng(longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
    return () => controller.abort();
  }, [])

  var data = JSON.stringify({
    Device_id: Device_id,
    latitude: lat,
    longitude: lng
  })
  localStorage.setItem('Vendor_Device_Data', data)

  const onSubmit = () => {
    if (lat !== null, lng !== null) {
      setLoader(true)
      setTimeout(() => {
        window.location.replace('/SignIn')
      }, 1000)
    } else {
      Swal.fire(
        'Location',
        'Turn on your device location and reopen the app',
        'info'
      )
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
      <Box sx={{ minHeight: '100vh', padding: 0, margin: 0, backgroundImage: 'linear-gradient(#fff, #d4d8f5)' }}>
        <AppBar elevation={0} sx={{ backgroundColor: 'transparent', }}>
          <Toolbar sx={{ pt: 1.5, pb: 1.5 }}>
            <Box sx={{ flexGrow: 1 }} />
            <Typography onClick={() => onSubmit()} sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700' }}>SKIP</Typography>
          </Toolbar>
        </AppBar>
        <Grow in>
          <div>
            {first ?
              <FirstScreen />
              : ''}
          </div>
        </Grow>
        <Grow in>
          <div>
            {second ?
              <SecondScreen />
              : ''}
          </div>
        </Grow>
        <Grow in>
          <div>
            {third ?
              <ThirdScreen />
              : ''}
          </div>
        </Grow>

        <AppBar elevation={0} position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'transparent', }}>
          <Toolbar>
            {first ?
              <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2, backgroundColor: '#000000' }} />
              :
              <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2 }} />
            }

            {second ?
              <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2, backgroundColor: '#000000' }} />
              :
              <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2 }} />
            }

            {third ?
              <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2, backgroundColor: '#000000' }} />
              :
              <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2 }} />
            }

            <Box sx={{ flexGrow: 1 }} />
            {first ?
              <Button onClick={() => secondClick()} sx={{ backgroundColor: '#6500df', fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', '&:hover': { backgroundColor: '#6500df', } }}>Next</Button>
              : ''}
            {second ?
              <Button onClick={() => thirdClick()} sx={{ backgroundColor: '#6500df', fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', '&:hover': { backgroundColor: '#6500df', } }}>Next</Button>
              : ''}
            {third ?
              <Button onClick={() => onSubmit()} sx={{ backgroundColor: '#6500df', fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', '&:hover': { backgroundColor: '#6500df', } }}>Get Start</Button>
              : ''}
          </Toolbar>
        </AppBar >
      </Box >
    </>
  )
}

export default StartScreen;


const FirstScreen = () => {
  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 7 }}>
            <img src={firstImg} alt="" style={{ width: '80%' }} />
          </Box>
          <Box sx={{ pt: 5 }}>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 23, color: '#000000' }}>
              TheKatta enables more <br /> revenue
            </Typography>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 15, color: 'gray', pt: 0.7 }}>
              Growth is never by chance it occurs by choice
            </Typography>
          </Box>
        </div>
      </Grow>
    </>
  )
}

const SecondScreen = () => {
  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 18 }}>
            <img src={SecondImg} alt="" style={{ width: '80%' }} />
          </Box>
          <Box sx={{ pt: 5 }}>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 23, color: '#000000' }}>
              Boost your brand visibility
            </Typography>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 15, color: 'gray', pt: 0.7 }}>
              Advertisement can change the perception <br /> of mind
            </Typography>
          </Box>
        </div>
      </Grow>
    </>
  )
}

const ThirdScreen = () => {
  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 18 }}>
            <img src={thirdImg} alt="" style={{ width: '80%' }} />
          </Box>
          <Box sx={{ pt: 5 }}>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 23, color: '#000000' }}>
              10x new customers
            </Typography>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 15, color: 'gray', pt: 0.7 }}>
              One happy customer contributes much <br /> more in success
            </Typography>
          </Box>
        </div>
      </Grow>
    </>
  )
} */
















import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Grow } from '@mui/material';
import firstImg from '../img/1.png';
import SecondImg from '../img/2.png';
import thirdImg from '../img/3.png';
import { v4 as uuidv4 } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2';
import { IonContent, IonPage, IonicSlides, IonRefresher, IonRefresherContent } from '@ionic/react';
import { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/sw';
import '@ionic/react/css/ionic-swiper.css';


const StartScreen = () => {
  const Device_id = uuidv4();
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [loader, setLoader] = React.useState(false);
  const [onSlideChangeNumber, setOnSlideChangeNumber] = React.useState(0);

  React.useEffect(() => {
    getDeviceLocation();
  }, []);

  const getDeviceLocation = (event) => {
    // console.log(event);
    const controller = new AbortController();
    const signal = controller.signal;

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your Device');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        const data = position.coords;
        const latitude = data.latitude;
        const longitude = data.longitude

        setStatus(null);
        setLat(latitude);
        setLng(longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }

    setTimeout(() => {
      // console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);

    return () => controller.abort();
  }

  var data = JSON.stringify({
    Device_id: Device_id,
    latitude: lat,
    longitude: lng
  })
  localStorage.setItem('Vendor_Device_Data', data)

  const onSubmit = () => {
    if (lat !== null, lng !== null) {
      setLoader(true)
      setTimeout(() => {
        window.location.replace('/SignIn')
      }, 1000)
    } else {
      Swal.fire(
        'Location',
        'Turn on your device location and reopen the app',
        'info'
      )
    }
  }

  return (
    <IonPage>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(event) => getDeviceLocation(event)} /* pullFactor={0.5} pullMin={100} pullMax={100} */ /* style={{ margin: '50px' }}  */>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {loader ?
          <>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
          :
          ""
        }

        <Box sx={{ minHeight: '100vh', padding: 0, margin: 0, backgroundImage: 'linear-gradient(#fff, #d4d8f5)' }}>
          <AppBar elevation={0} sx={{ backgroundColor: 'transparent', }}>
            <Toolbar sx={{ pt: 1.5, pb: 1.5 }}>
              <Box sx={{ flexGrow: 1 }} />
              <Typography onClick={() => onSubmit()} sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700' }}>SKIP</Typography>
            </Toolbar>
          </AppBar>

          <Swiper modules={[EffectFade, IonicSlides]} onSlideChange={(e) => setOnSlideChangeNumber(e.activeIndex)}>
            <SwiperSlide>
              <FirstScreen />
            </SwiperSlide>
            <SwiperSlide>
              <SecondScreen />
            </SwiperSlide>
            <SwiperSlide>
              <ThirdScreen />
            </SwiperSlide>
          </Swiper>

          <AppBar elevation={0} position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'transparent', }}>
            <Toolbar>
              {onSlideChangeNumber === 0 ?
                <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2, backgroundColor: '#000000' }} />
                :
                <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2 }} />
              }

              {onSlideChangeNumber === 1 ?
                <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2, backgroundColor: '#000000' }} />
                :
                <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2 }} />
              }

              {onSlideChangeNumber === 2 ?
                <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2, backgroundColor: '#000000' }} />
                :
                <Box sx={{ width: 12, height: 12, border: '1px solid #000000', borderRadius: 50, ml: 2 }} />
              }

              <Box sx={{ flexGrow: 1 }} />
              {onSlideChangeNumber === 2 ?
                <Button onClick={() => onSubmit()} sx={{ backgroundColor: '#6500df', fontFamily: 'Nunito', fontWeight: '700', color: '#ffffff', '&:hover': { backgroundColor: '#6500df', } }}>Get Start</Button>
                : ""}
            </Toolbar>
          </AppBar >
        </Box >
      </IonContent >
    </IonPage>
  )
}

export default StartScreen;


const FirstScreen = () => {
  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 7 }}>
            <img src={firstImg} alt="" style={{ width: '80%' }} />
          </Box>
          <Box sx={{ pt: 5 }}>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 23, color: '#000000' }}>
              TheKatta enables more <br /> revenue
            </Typography>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 15, color: 'gray', pt: 0.7 }}>
              Growth is never by chance it occurs by choice
            </Typography>
          </Box>
        </div>
      </Grow>
    </>
  )
}

const SecondScreen = () => {
  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 18 }}>
            <img src={SecondImg} alt="" style={{ width: '80%' }} />
          </Box>
          <Box sx={{ pt: 5 }}>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 23, color: '#000000' }}>
              Boost your brand visibility
            </Typography>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 15, color: 'gray', pt: 0.7 }}>
              Advertisement can change the perception <br /> of mind
            </Typography>
          </Box>
        </div>
      </Grow>
    </>
  )
}

const ThirdScreen = () => {
  return (
    <>
      <Grow in>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 18 }}>
            <img src={thirdImg} alt="" style={{ width: '80%' }} />
          </Box>
          <Box sx={{ pt: 5 }}>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 23, color: '#000000' }}>
              10x new customers
            </Typography>
            <Typography sx={{ fontFamily: 'Nunito', fontWeight: '700', textAlign: 'center', fontSize: 15, color: 'gray', pt: 0.7 }}>
              One happy customer contributes much <br /> more in success
            </Typography>
          </Box>
        </div>
      </Grow>
    </>
  )
}