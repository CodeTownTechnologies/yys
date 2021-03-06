import React, { Component } from 'react';
import {
    Alert
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginActivity from './components/LoginActivity';
import SignupActivity from './components/SignupActivity';
import OTPActivity from './components/OTPActivity';
import QuestionLogActivity from './components/QuestionLogActivity';
import QuestionLogDetailActivity from './components/QuestionLogDetailActivity';
import DashboardActivity from './components/DashboardActivity';
import BottomNavigator from './components/BottomNavigator';
import ContractLogActivity from './components/ContractLogActivity';
import SplashActivity from './components/SplashActivity';
import NotificationActivity from './components/NotificationActivity';
import ContractLogDetailActivity from './components/ContractLogDetailActivity';
import ServiceContractActivity1 from './components/ServiceContractActivity1';
import VideoCallActivity from './components/VideoCallActivity';
import ForgotPasswordActivity from './components/ForgotPasswordActivity';
import ServiceContractActivity2 from './components/ServiceContractActivity2';
import ServiceContractActivity3 from './components/ServiceContractActivity3';
import ServiceContractActivity4 from './components/ServiceContractActivity4';
import ServiceContractActivity5 from './components/ServiceContractActivity5';
import ServiceContractActivity6 from './components/ServiceContractActivity6';
import ServiceContractActivity7 from './components/ServiceContractActivity7';
import ServiceContractActivity8 from './components/ServiceContractActivity8';
import ContractOrdersActivity from './components/ContractOrdersActivity';
import PreviewScreenActivity from './components/PreviewScreenActivity';
import ProfileActivity from './components/ProfileActivity';
import ForgetOTPActivity from './components/ForgetOTPActivity';
import ResetPasswordActivity from './components/ResetPasswordActivity';
import QuestionLogNavigationActivity from './components/QuestionLogNavigationScreen';
import AboutusActivity from './components/AboutusActivity';
import TermsConditionsActivity from './components/TermsConditionsActivity';
import ContactusActivity from './components/ContactusActivity';
import EditProfileActivity from './components/EditProfileActivity';
import ContractLogQuestionActivity from './components/ContractLogQuestionActivity';
import ContractOrdersDetailActivity from './components/ContractOrdersDetailActivity';
import ContractOrdersPortfolioActivity from './components/ContractOrdersPortfolioActivity';
import ContractOrdersProposalActivity from './components/ContractOrdersProposalActivity';
import ContractLogDetailPaidActivity from './components/ContractLogDetailPaidActivity';
import PaymentWebViewActivity from './components/PaymentWebViewActivity';

import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
const messaging = firebase.messaging();

messaging.hasPermission()
  .then((enabled) => {
      if (enabled) {
          messaging.getToken()
              .then(token => { 
                console.log(token) 
                AsyncStorage.setItem('@token',token)

              })
              .catch(error => { /* handle error */ });
      } else {
          messaging.requestPermission()
              .then(() => { /* got permission */ })
              .catch(error => { /* handle error */ });
      }
  })
  .catch(error => { /* handle error */ });

  firebase.notifications().onNotification((notification) => {
    // console.log(message)
    const { title, body } = notification;
    // alert(notification)
    PushNotification.localNotification({
      title: title,
      message: body, // (required)
    });
  });

const NavStack = createStackNavigator(
    {
        Splash: { screen: SplashActivity },
        Login: { screen: LoginActivity },
        Signup: { screen: SignupActivity },
        Otp: { screen: OTPActivity },
        QuestionLog: { screen: QuestionLogActivity },
        QuestionLogDetail: { screen: QuestionLogDetailActivity },
        Dashboard: { screen: DashboardActivity },
        BottomNavigatorScreen: { screen: BottomNavigator },
        contractLog: { screen: ContractLogActivity },
        Notification: { screen: NotificationActivity },
        ContractLogDetail: { screen: ContractLogDetailActivity },
        ServiceContractScreen1: { screen: ServiceContractActivity1 },
        ServiceContractScreen2: { screen: ServiceContractActivity2 },
        ServiceContractScreen3: { screen: ServiceContractActivity3 },
        ServiceContractScreen4: { screen: ServiceContractActivity4 },
        ServiceContractScreen5: { screen: ServiceContractActivity5 },
        ServiceContractScreen6: { screen: ServiceContractActivity6 },
        ServiceContractScreen7: { screen: ServiceContractActivity7 },
        ServiceContractScreen8: { screen: ServiceContractActivity8 },
        VideoCall: { screen: VideoCallActivity },
        ForgotPassword: { screen: ForgotPasswordActivity },
        PreviewScreen: { screen: PreviewScreenActivity },
        ForgetOTP: { screen: ForgetOTPActivity },
        ResetPassword: { screen: ResetPasswordActivity },
        Profile: { screen: ProfileActivity },
        QuestionLogNavigation: { screen: QuestionLogNavigationActivity },
        Aboutus: {screen: AboutusActivity},
        TermsCondition: {screen: TermsConditionsActivity},
        Contactus: {screen: ContactusActivity},
        EditProfile: {screen: EditProfileActivity},
        ContractLogQuestion : {screen: ContractLogQuestionActivity},
        ContractOrders : {screen: ContractOrdersActivity},
        ContractOrdersDetail : {screen: ContractOrdersDetailActivity},
        ContractOrdersPortfolio : {screen: ContractOrdersPortfolioActivity},
        ContractOrdersProposal: {screen:ContractOrdersProposalActivity},
        ContractLogDetailPaid: {screen:ContractLogDetailPaidActivity},
        PaymentWebView: {screen:PaymentWebViewActivity}

    },
    {
        initialRouteName: 'Splash',
        headerMode:'none'
        
    }

);

const Apps = createAppContainer(NavStack);

export default class App extends React.Component {

    componentDidMount(){
        this.createNotificationListeners()
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            this.showAlert(title, body);
        });
      
        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        });
      
        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
          //process data message
          console.log(JSON.stringify(message));
        //   const { title, body } = message;
          // alert(notification)
          var msg= JSON.stringify(message)
        //   console.log(msg)
        var data= msg["_data"]
        console.log(data)
          PushNotification.localNotification({
            title: "data.title",
            message: "data.message", // (required)
          });
        });
      }
      
      showAlert(title, body) {

        console.log("title===" + title)
        console.log("body===" + body)

        // Alert.alert(
        //   title, body,
        //   [
        //       { text: 'OK', onPress: () => console.log('OK Pressed') },
        //   ],
        //   { cancelable: false },
        // );
      }
      

    render() {  

        
         return <Apps />;
    }
}