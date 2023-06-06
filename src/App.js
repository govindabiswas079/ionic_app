import React, { lazy, useState } from 'react';
import Loadable from './ui-component/Loadable';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { Online, Offline } from 'react-detect-offline';
import { Route, Redirect, } from 'react-router-dom';
import { IonApp, IonRouterOutlet, createAnimation, setupIonicReact } from '@ionic/react';
import { IonReactRouter, } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './App.css';
import nointernet from './img/nointernet.webp'
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

import { Typography, Button, Container, Box, Avatar, styled } from '@mui/material';
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from "@capacitor/toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusBar, Style } from '@capacitor/status-bar';

const StartScreen = Loadable(lazy(() => import('./authentication/StartScreen')));
const SplashScreen = Loadable(lazy(() => import('./authentication/SplashScreen')));

const SignUp = Loadable(lazy(() => import('./authentication/Register/SignUp')));
const SignIn = Loadable(lazy(() => import('./authentication/Register/SignIn')));
const OtpVerify = Loadable(lazy(() => import('./authentication/Component/OtpVerify')));
const StoreDetails = Loadable(lazy(() => import('./authentication/Component/StoreDetails')));
const StoreAddress = Loadable(lazy(() => import('./authentication/Component/StoreAddress')));
const BankCredentials = Loadable(lazy(() => import('./authentication/Component/BankCredentials')));
const VendorSubscription = Loadable(lazy(() => import('./authentication/Component/VendorSubscription')));
const SubscriptionCheckout = Loadable(lazy(() => import('./authentication/Component/SubscriptionCheckout')));
const PaymentSuccess = Loadable(lazy(() => import('./authentication/Component/PaymentSuccess')));


const HomeScreen = Loadable(lazy(() => import('./screens/MainScreen/HomeScreen')));
const TransactionScreen = Loadable(lazy(() => import('./screens/MainScreen/TransactionScreen')));
const TransactionDetailsScreen = Loadable(lazy(() => import('./screens/TransactionDetailsScreen')));
const ActivityScreen = Loadable(lazy(() => import('./screens/MainScreen/ActivityScreen')));
const AccountScreen = Loadable(lazy(() => import('./screens/MainScreen/AccountScreen')));
const PlanHistoryScreen = Loadable(lazy(() => import('./screens/PlanHistoryScreen')));
const ProfileScreen = Loadable(lazy(() => import('./screens/ProfileScreen')));
const DiscountScreen = Loadable(lazy(() => import('./screens/DiscountScreen')));

const CouponScreen = Loadable(lazy(() => import('./screens/CouponScreen')));
const AdvertiseScrees = Loadable(lazy(() => import('./screens/AdvertiseScrees')));
const DiscountAdvertisementScreen = Loadable(lazy(() => import('./screens/DiscountAdvertisementScreen')));
const NotificationScreen = Loadable(lazy(() => import('./screens/NotificationScreen')));
const ReportScreen = Loadable(lazy(() => import('./screens/ReportScreen')));
const ReportDetails = Loadable(lazy(() => import('./screens/ReportDetails')));


const CouponFrom = Loadable(lazy(() => import('./component/CouponComponent/CouponFrom')));
const AdVertiseFrom = Loadable(lazy(() => import('./component/AdVertiseComponent/AdVertiseFrom')));
const DiscountAdvertisementFrom = Loadable(lazy(() => import('./component/DiscountAdvertisementComponent/DiscountAdvertisementFrom')));
const AdVertiseFromUpdate = Loadable(lazy(() => import('./component/AdVertiseComponent/AdVertiseFromUpdate')));
const NotificationFrom = Loadable(lazy(() => import('./component/NotificationComponent/NotificationFrom')));

const OwnerDetails = Loadable(lazy(() => import('./component/ProfileComponent/InnerComponent/OwnerDetails')));
const UserDetails = Loadable(lazy(() => import('./component/ProfileComponent/InnerComponent/UserDetails')));
const BankDetailes = Loadable(lazy(() => import('./component/ProfileComponent/InnerComponent/BankDetailes')));
const AccountDetails = Loadable(lazy(() => import('./component/ProfileComponent/InnerComponent/AccountDetails')));
const VendorDetails = Loadable(lazy(() => import('./component/ProfileComponent/InnerComponent/VendorDetails')));

const VendorDetailsUpdate = Loadable(lazy(() => import('./component/ProfileComponent/ProfileUpdateComponent/VendorDetailsUpdate')));
const VendorAddressUpdate = Loadable(lazy(() => import('./component/ProfileComponent/ProfileUpdateComponent/VendorAddressUpdate')));

const PasswordForget = Loadable(lazy(() => import('./authentication/Register/PasswordForget')));
const VerifyEmail = Loadable(lazy(() => import('./authentication/ForgetPassword/VerifyEmail')));
const SetPassword = Loadable(lazy(() => import('./authentication/ForgetPassword/SetPassword')));
const UpdateSuccessfully = Loadable(lazy(() => import('./authentication/ForgetPassword/UpdateSuccessfully')));


setupIonicReact();
const App = ({ addrIdProps, storeIdProps, lat, lng, storeinfo, showSub, vendorCatList, vendorCatListLoader, showSubPaln }) => {

  const vendor_id = localStorage.getItem('vendor_id');
  const addrId = localStorage.getItem('addrId')
  const storeId = localStorage.getItem('storeId')

  React.useEffect(() => {
    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== 'granted') {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === 'denied') {
            showToast('Push Notification permission denied');
          }
          else {
            showToast('Push Notification permission granted');
            register();
          }
        });
      }
      else {
        register();
      }
    });
  }, [])

  const register = () => {
    console.log('Initializing HomePage');

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        showToast('Push registration success');
        console.log('Push registration token', token)
        sessionStorage.setItem('token', JSON.stringify(token))
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('pushNotificationReceived', notification)

        function Display() {
          return (
            <div>
              <Typography sx={{ fontSize: 16, fontFamily: 'Nunito, system-ui', fontWeight: 700 }}>{notification.title}</Typography>
              <Typography sx={{ fontSize: 11, fontFamily: 'Nunito, system-ui', fontWeight: 700 }}>{notification.body}</Typography>
            </div>
          );
        }
        toast(<Display />, window.navigator.vibrate(200), {
          theme: 'colored',
          position: "top-center",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('pushNotificationActionPerformed', notification)
        window.navigator.vibrate(200)
      }
    );
  }

  const showToast = async (msg: String) => {
    await Toast.show({
      text: msg
    })
  };

  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setStyle({ style: Style.Light });


  const animationBuilder = (baseEl, opts) => {
    const enteringAnimation = createAnimation()
      .addElement(opts.enteringEl)
      .fromTo('opacity', 0, 1)
      .duration(250);

    const leavingAnimation = createAnimation()
      .addElement(opts.leavingEl)
      .fromTo('opacity', 1, 0)
      .duration(250);

    const animation = createAnimation()
      .addAnimation(enteringAnimation)
      .addAnimation(leavingAnimation);

    return animation;
  };

  return (
    <>
      <div style={{ backgroundColor: '#ffffff', }} >
        {/* <PullToRefresh options={{ pullDownHeight: 100, }} onRefresh={onRefresh}>*/}
        <ToastContainer
          theme='colored'
          position="top-center"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <>
          <ThemeConfig>
            <GlobalStyles />
            <Online>
              <IonApp>
                <IonReactRouter>
                  <IonRouterOutlet /* animation={animationBuilder} */>
                    <Route exact={true} path='/StartScreen' component={() => <StartScreen />} />
                    <Route exact={true} path='/SplashScreen' component={() => <SplashScreen />} />

                    <Route exact={true} path='/SignUp' component={() => <SignUp />} />
                    <Route exact={true} path='/SignIn' component={() => <SignIn />} />
                    <Route exact={true} path='/OtpVerify' component={() => <OtpVerify />} />
                    <Route exact={true} path='/StoreDetails' component={() => <StoreDetails lat={lat} lng={lng} />} />
                    <Route exact={true} path='/StoreAddress' component={() => <StoreAddress storeIdProps={storeIdProps} lat={lat} lng={lng} />} />
                    <Route exact={true} path='/BankCredentials' component={() => <BankCredentials />} />
                    <Route exact={true} path='/VendorSubscription' component={() => <VendorSubscription />} />
                    <Route exact={true} path='/SubscriptionCheckout' component={() => <SubscriptionCheckout />} />
                    <Route exact={true} path='/PaymentSuccess' component={() => <PaymentSuccess />} />

                    <Route exact={true} path='/HomeScreen' component={() => <HomeScreen storeinfo={storeinfo} />} />
                    <Route exact={true} path='/TransactionScreen' component={() => <TransactionScreen storeinfo={storeinfo} />} />
                    <Route exact={true} path='/TransactionDetailsScreen' component={() => <TransactionDetailsScreen storeinfo={storeinfo} />} />
                    <Route exact={true} path='/ActivityScreen' component={() => <ActivityScreen storeinfo={storeinfo} />} />
                    <Route exact={true} path='/AccountScreen' component={() => <AccountScreen storeinfo={storeinfo} showSub={showSub} showSubPaln={showSubPaln} />} />
                    <Route exact={true} path='/PlanHistoryScreen' component={() => <PlanHistoryScreen />} />
                    <Route exact={true} path='/ProfileScreen' component={() => <ProfileScreen showSub={showSub} showSubPaln={showSubPaln} />} />
                    <Route exact={true} path='/DiscountScreen' component={() => <DiscountScreen showSub={showSub} showSubPaln={showSubPaln} />} />

                    <Route exact={true} path='/VendorDetailsUpdate' component={() => <VendorDetailsUpdate storeIdProps={storeIdProps} />} />
                    <Route exact={true} path='/VendorAddressUpdate' component={() => <VendorAddressUpdate addrIdProps={addrIdProps} storeIdProps={storeIdProps} lat={lat} lng={lng} />} />

                    <Route exact={true} path='/CouponScreen' component={() => <CouponScreen />} />
                    <Route exact={true} path='/AdvertiseScrees' component={() => <AdvertiseScrees />} />
                    <Route exact={true} path='/DiscountAdvertisementScreen' component={() => <DiscountAdvertisementScreen />} />
                    <Route exact={true} path='/NotificationScreen' component={() => <NotificationScreen />} />
                    <Route exact={true} path='/ReportScreen' component={() => <ReportScreen />} />
                    <Route exact={true} path='/ReportDetails' component={() => <ReportDetails />} />

                    <Route exact={true} path='/CouponFrom' component={() => <CouponFrom showSub={showSub} showSubPaln={showSubPaln} />} />
                    <Route exact={true} path='/AdVertiseFrom' component={() => <AdVertiseFrom vendorCatList={vendorCatList} vendorCatListLoader={vendorCatListLoader} storeinfo={storeinfo} showSub={showSub} showSubPaln={showSubPaln} />} />
                    <Route exact={true} path='/DiscountAdvertisementFrom' component={() => <DiscountAdvertisementFrom vendorCatList={vendorCatList} vendorCatListLoader={vendorCatListLoader} storeinfo={storeinfo} showSub={showSub} showSubPaln={showSubPaln} />} />
                    <Route exact={true} path='/AdVertiseFromUpdate' component={() => <AdVertiseFromUpdate vendorCatList={vendorCatList} vendorCatListLoader={vendorCatListLoader} showSub={showSub} showSubPaln={showSubPaln} />} />
                    <Route exact={true} path='/NotificationFrom' component={() => <NotificationFrom showSub={showSub} showSubPaln={showSubPaln} />} />

                    <Route exact={true} path='/OwnerDetails' component={() => <OwnerDetails />} />
                    <Route exact={true} path='/UserDetails' component={() => <UserDetails />} />
                    <Route exact={true} path='/BankDetailes' component={() => <BankDetailes />} />
                    <Route exact={true} path='/AccountDetails' component={() => <AccountDetails />} />
                    <Route exact={true} path='/VendorDetails' component={() => <VendorDetails />} />

                    <Route exact={true} path='/PasswordForget' component={() => <PasswordForget />} />
                    <Route exact={true} path='/VerifyEmail' component={() => <VerifyEmail />} />
                    <Route exact={true} path='/SetPassword' component={() => <SetPassword />} />
                    <Route exact={true} path='/UpdateSuccessfully' component={() => <UpdateSuccessfully />} />


                    <Route exact path='/' render={() =>
                      vendor_id ?
                        storeId ?
                          addrId ?
                            <Redirect to='/HomeScreen' />
                            :
                            <Redirect to='/StoreAddress' />
                          :
                          <Redirect to='/StoreDetails' />
                        :
                        <Redirect to='/SplashScreen' />
                    }
                    />
                  </IonRouterOutlet>
                </IonReactRouter>
              </IonApp>
            </Online>
            <Offline>
              <IonApp>
                <Box sx={{ minHeight: '100vh' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3, }}>
                    <Avatar src={nointernet} alt='' sx={{ width: '90%', borderRadius: 2, height: '100%', boxShadow: 9 }} />
                  </Box>
                  <Container sx={{ display: 'flex', pt: 5, alignItems: 'center' }}>
                    <Typography sx={{ color: '#000000', fontWeight: '700', fontSize: 20, fontFamily: 'Nunito, system-ui' }}>No Internet connection</Typography>
                  </Container>
                  <Container sx={{ display: 'flex', justifyContent: 'center', pt: 1, alignItems: 'center' }}>
                    <Typography sx={{ color: 'gray', fontWeight: '700', fontSize: 15, fontFamily: 'Nunito, system-ui' }}>Please check your internet connection and reopen the app</Typography>
                  </Container>

                  <BottomContainer>
                    <Button startIcon={<AutorenewOutlinedIcon />} onClick={(e) => window.location.reload(e)} sx={{ boxShadow: 3, backgroundColor: '#ffcf00', fontFamily: 'Nunito, system-ui', color: '#000000', fontWeight: '700', '&:hover': { backgroundColor: '#ffcf00' } }} disableElevation fullWidth size="large" type="submit" variant="contained" >
                      Try again
                    </Button>
                  </BottomContainer>
                </Box>
              </IonApp>
            </Offline>
          </ThemeConfig>
        </>
        {/* </PullToRefresh> */}
      </div>
    </>
  );
}

export default App;

const BottomContainer = styled(Container)(() => ({
  width: '100%',
  // height: '70px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
  // borderTop: '2px solid rgba(214, 209, 209, 0.425)',
  zIndex: 5,
  paddingBottom: 10,
}));