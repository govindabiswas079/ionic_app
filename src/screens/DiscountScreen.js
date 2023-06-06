import React from 'react';
import { Box, Slide } from '@mui/material';
import Discount from '../component/DiscountComponent/Discount';
import CommonHeader from '../navigators/CommonHeader';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { IonContent, IonPage, useIonRouter, } from '@ionic/react';
import { ApiRequestUrl } from '../ApiRequest';

import { IonRefresher, IonRefresherContent } from '@ionic/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const DiscountScreen = ({ showSub, showSubPaln }) => {
  let Navigate = useIonRouter();
  const [nav, setNav] = React.useState(false);
  const Navigation = sessionStorage.getItem('VendorActiveTabs')
  const vendor_id = localStorage.getItem('vendor_id');
  const [showFrom, setShowFrom] = React.useState(false)
  const [getcriteriaList, setGetcriteriaList] = React.useState([]);
  const [getLoader, setGetLoader] = React.useState(true)
  // const [showSub, setShowSub] = React.useState(false);
  const [loader, setLoader] = React.useState(false)
  const [amount, setAmount] = React.useState(false)
  const [minimun, setMinimum] = React.useState(false)
  const [maximum, setMaximum] = React.useState(false)
  const [value, setValue] = React.useState({
    amount: '',
    minimun: '',
    maximum: '',
  })

  const onChangeAmount = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, amount: e.target.value });
      setAmount(false);
    } else {
      setValue({ ...value, amount: e.target.value });
      setAmount(false)
    };
  }
  const onChangeMinimun = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, minimun: e.target.value });
      setMinimum(false);
    } else {
      setValue({ ...value, minimun: e.target.value });
      setMinimum(false)
    };
  }
  const onChangeMaximum = (e) => {
    if (e.target.value.trim().length >= 0) {
      setValue({ ...value, maximum: e.target.value });
      setMaximum(false);
    } else {
      setValue({ ...value, maximum: e.target.value });
      setMaximum(false)
    };
  }


  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

  var validation = '';
  const validatee = () => {
    if (checkStringNullEmpty(value.amount)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setAmount(true)
    }
    if (checkStringNullEmpty(value.minimun)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setMinimum(true)
    }
    if (checkStringNullEmpty(value.maximum)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setMaximum(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  var setcriteria = JSON.stringify({
    criteria: {
      vendor_id: vendor_id,
      amount: value.amount,
      min: value.minimun,
      max: value.maximum
    }
  });
  // console.log(setcriteria)

  var setcriteria_config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/setcriteria`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: setcriteria
  };

  const onSubmitSetcriteria = async (e) => {
    e.preventDefault()
    validatee();
    if (validation === '') {
      setLoader(true)
      const controller = new AbortController();
      const signal = controller.signal
      await axios(setcriteria_config, { signal: signal })
        .then(function (response) {
          // console.log(response.data)
          if (response.data.response.status === 1) {
            setValue({ ...value, amount: '', minimun: '', maximum: '' });
            setLoader(false)
            setShowFrom(false)
            getDiscountList();
          } else {
            if (response.data.response.status === -1) {
              setLoader(false)
              setValue({ ...value, amount: '', minimun: '', maximum: '' });
            } else {
              alert('somethig worng')
              setValue({ ...value, amount: '', minimun: '', maximum: '' });
            }
          }
        })
        .catch(function (err) {
          setLoader(false)
          if (err.name === "AbortError") {
            console.log("successfully aborted");
            // setValue({ ...value, amount: '', minimun: '', maximum: '' });
          } else {
            console.log(err);
            // setValue({ ...value, amount: '', minimun: '', maximum: '' });
          }
        });
      return () => controller.abort();
    } else {

    }
  }
  const onBack = () => {
    Navigate.push(`/${Navigation}`)
  }

  const onDeactivate = async (e) => {
    setLoader(true)
    var disablecriteria = JSON.stringify({
      vendor_id: e.vendor_id,
      criteria_id: e.criteria_id,
      is_active: e.isactive
    });
    // console.log(disablecriteria)

    var disablecriteria_config = {
      method: 'post',
      url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/disablecriteria`),
      headers: {
        'Content-Type': 'application/json'
      },
      data: disablecriteria
    };

    const controller = new AbortController();
    const signal = controller.signal
    await axios(disablecriteria_config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setLoader(false)
          getDiscountList();
          toast('Successfully Updated', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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

  var getcriteria_list = JSON.stringify({
    vendor_id: vendor_id,
  });
  // console.log(paymentrequest_list)

  var getcriteria_config = {
    method: 'post',
    url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/getcriteria`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: getcriteria_list
  };

  const getDiscountList = async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(getcriteria_config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setGetcriteriaList(response.data.dcinfo.reverse())
          setGetLoader(false)
        } else {
          if (response.data.response.status === -1) {
            setGetLoader(false)
          } else {
            alert('somethig worng')
          }
        }
      })
      .catch(function (err) {
        setGetLoader(true)
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });

    return () => controller.abort();
  };

  React.useEffect(() => {
    getDiscountList();
  }, [])

  const changeBackground = (e) => {
    if (e.detail.scrollTop === 0) {
      setNav(false)
    } else {
      setNav(true)
    }
  }

  function doRefresh(event) {
    // console.log('Begin async operation');
  
    setTimeout(() => {
      // console.log('Async operation has ended');
      getDiscountList()
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonContent scrollEvents={true} onIonScroll={(e) => changeBackground(e)}>
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
        <IonRefresher slot="fixed" onIonRefresh={(event) => { doRefresh(event) }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <Box TransitionComponent={Transition} sx={{ backgroundColor: '#f3f8fa', minHeight: '100vh' }}>
          <CommonHeader nav={nav} onBack={onBack} />
          <Box>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Discount
              onChangeAmount={onChangeAmount}
              onChangeMinimun={onChangeMinimun}
              onChangeMaxium={onChangeMaximum}
              amount={amount}
              minimun={minimun}
              maximum={maximum}
              validation={validation}
              validatee={validatee}
              value={value}
              onSubmitSetcriteria={onSubmitSetcriteria}
              onDeactivate={onDeactivate}
              setShowFrom={setShowFrom}
              showFrom={showFrom}
              showSub={showSub}
              showSubPaln={showSubPaln}
              getDiscountList={getDiscountList}
              getcriteriaList={getcriteriaList}
              getLoader={getLoader}
            />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  )
}

export default (DiscountScreen)