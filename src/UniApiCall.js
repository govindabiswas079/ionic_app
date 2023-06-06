import React from 'react'
import App from './App';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { Plugins } from '@capacitor/core';
import { ApiRequest } from './ApiRequest';
// import { v4 as uuidv4 } from 'uuid';

const UniApiCall = () => {
  const { StatusBar } = Plugins;
  StatusBar.setBackgroundColor({ color: '#f3f8fa' });
  const vendor_id = localStorage.getItem('vendor_id');
  const [addrId, setAddrId] = React.useState({});
  const [showSub, setShowSub] = React.useState(false);
  const [showSubPaln, setShowPaln] = React.useState(false);
  const [storeId, setStoreId] = React.useState({});
  const [storeinfo, setStoreinfo] = React.useState({});
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [vendorCatList, setVendorCatList] = React.useState([]);
  const [vendorCatListLoader, setVendorCatListLoader] = React.useState(true);


  /* var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });
  var config = {
    method: 'POST',
    url: sanitizeUrl(`http://codefeverllp.com/katta/API.svc/vendorinfo`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vinfo
  };
  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setAddrId(response.data.addrinfo.addr_id)
          setStoreId(response.data.storeinfo.store_id)
          setStoreinfo(response.data.storeinfo)
          localStorage.setItem('addrId', response.data.addrinfo.addr_id === 0 ? '' : response.data.addrinfo.addr_id);
          localStorage.setItem('storeId', response.data.storeinfo.store_id === 0 ? '' : response.data.storeinfo.store_id);
        }

      })
      .catch(function (err) {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        const dataa = position.coords;
        const latitude = dataa.latitude;
        const longitude = dataa.longitude

        setStatus(null);
        setLat(latitude);
        setLng(longitude);
        localStorage.setItem('lat', latitude);
        localStorage.setItem('lng', longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
    return () => controller.abort();
  }, []);


  var get_vinfo = JSON.stringify({
    vendor_id: vendor_id
  });

  var config_subscriptioncheck = {
    method: 'POST',
    url: sanitizeUrl(`http://codefeverllp.com/katta/API.svc/subscriptioncheck`),
    headers: {
      'Content-Type': 'application/json'
    },
    data: get_vinfo
  };
  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    await axios(config_subscriptioncheck, { signal: signal })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.response.status === 1) {
          setShowSub(false)
        } else {
          if (response.data.response.status === -1) {
            setShowSub(true)
          } else {
            if (response.data.response.status === 0) {
              setShowPaln(true)
            }
          }
        }
      })
      .catch(function (err) {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }, [])


  var config_catlist = {
    method: 'post',
    url: sanitizeUrl('http://codefeverllp.com/katta/API.svc/catlist'),
    headers: {
      'Content-Type': 'application/json'
    },
  };

  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await axios(config_catlist, { signal: signal })
      .then(function (response) {
        if (response.data.response.status === 1) {
          setVendorCatList(response.data.catlist)
          setVendorCatListLoader(false)
        } else {
          if (response.data.response.status === -1) {
            setVendorCatListLoader(true)
          }
        }
      })
      .catch(function (error) {
        setVendorCatListLoader(true)
        if (error.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(error);
        }
      });
    return () => controller.abort();
  }, []); */


  React.useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal
    axios.all([
      ApiRequest.post(sanitizeUrl(`/vendorinfo`), {
        vendor_id: vendor_id
      }, { signal: signal }),
      ApiRequest.post(sanitizeUrl(`/subscriptioncheck`), {
        vendor_id: vendor_id
      }, { signal: signal }),
      ApiRequest.post(sanitizeUrl(`/catlist`), { signal: signal }),
    ])
      .then(axios.spread((data1, data2, data3) => {
        if (data1.data.response.status === 1) {
          setAddrId(data1.data.addrinfo.addr_id)
          setStoreId(data1.data.storeinfo.store_id)
          setStoreinfo(data1.data.storeinfo)
          localStorage.setItem('addrId', data1.data.addrinfo.addr_id === 0 ? '' : data1.data.addrinfo.addr_id);
          localStorage.setItem('storeId', data1.data.storeinfo.store_id === 0 ? '' : data1.data.storeinfo.store_id);
        } else {
          if (data1.data.response.status === -1) {

          }
        }
        if (data2.data.response.status === 1) {
          setShowSub(false)
        } else {
          if (data2.data.response.status === -1) {
            setShowSub(true)
          } else {
            if (data2.data.response.status === 0) {
              setShowPaln(true)
            }
          }
        }
        if (data3.data.response.status === 1) {
          setVendorCatList(data3.data.catlist)
          setVendorCatListLoader(false)
        } else {
          if (data3.data.response.status === -1) {
            setVendorCatListLoader(true)
          }
        }
      }));

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        const dataa = position.coords;
        const latitude = dataa.latitude;
        const longitude = dataa.longitude

        setStatus(null);
        setLat(latitude);
        setLng(longitude);
        localStorage.setItem('lat', latitude);
        localStorage.setItem('lng', longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
    return () => controller.abort();
  }, []);


  return (
    <>
      <App
        vendorCatListLoader={vendorCatListLoader}
        vendorCatList={vendorCatList}
        showSubPaln={showSubPaln}
        showSub={showSub}
        storeinfo={storeinfo}
        addrIdProps={addrId}
        storeIdProps={storeId}
        lat={lat}
        lng={lng}
      />
    </>
  )
}

export default UniApiCall