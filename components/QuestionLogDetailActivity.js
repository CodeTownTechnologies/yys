import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from './locales/stringsoflanguages';
import IconBadge from 'react-native-icon-badge';
var listData;
var questionid;


class QuestionLogDetailActivity extends React.Component {
  constructor(props) {
    super(props);
    this.readmessage = this.readmessage.bind(this);
    this.state = {
      baseUrl: 'https://ylaw.app/admin/app_api/customer_read_que_cont',
      userId: '',
      postdate: '',
      reply: '',
      question: '',
      replydate: '',
      visible: false,
      selectedLanguage: '',
      listData: '',
      question_count: '',
      contract_count: '',
      notification_count: '',

    };
  }

  static navigationOptions = {
    title: 'Question Log Detail Screen',
  };

  componentDidMount() {

    // this.showLoading();

    AsyncStorage.getItem('@language').then((selectedLanguage) => {
      if (selectedLanguage) {
        if (selectedLanguage == "English") {
          stringsoflanguages.setLanguage("en");
        } else {
          stringsoflanguages.setLanguage("ar");
        }

      }
    });


    AsyncStorage.getItem('@question_count').then((question_count) => {
      if (question_count) {
        this.setState({ question_count: question_count });
        console.log("question_count ====" + this.state.question_count);
      }
    });

    AsyncStorage.getItem('@contract_count').then((contract_count) => {
      if (contract_count) {
        this.setState({ contract_count: contract_count });
        console.log("contract_count ====" + this.state.contract_count);
      }
    });

    AsyncStorage.getItem('@notification_count').then((notification_count) => {
      if (notification_count) {
        this.setState({ notification_count: notification_count });
        console.log("notification_count ====" + this.state.notification_count);
      }
    });

    const { navigation } = this.props;
    questionid = navigation.getParam('question_id', 'no-questionid');
    listData = navigation.getParam('item', 'no-item');

    console.log("listdata==" + JSON.stringify(listData))
    this.setState({ listData: listData });
    if (listData != null) {
      this.setState({ post_date: listData.post_date })
      this.setState({ reply: listData.reply })
      this.setState({ question: listData.question })
      this.setState({ replydate: listData.reply_date })
      this.setState({
        visible: (listData.status == 0 || listData.status == 1
          || listData.status == 2) ? false : true
      })

      console.log("visible value===" + this.state.visible)
    }

    AsyncStorage.getItem('@user_id').then((userId) => {
      if (userId) {
        this.setState({ userId: userId });
         this.readmessage();
        console.log("user id ====" + this.state.userId);
      }
    });

  }


  readmessage() {

   console.log('questionid:' + questionid);
   console.log('customer_id:' + this.state.userId);

    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        customer_id: this.state.userId,
        que_cont_id: questionid,
        type: 'question'
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading(); 
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
        
          console.log('response object:======' + JSON.stringify(responseData))
         
      
        //   AsyncStorage.getItem('@question_count').then((question_count) => {
        //    if (question_count) {
        // //    AsyncStorage.setItem('@question_count', "" + question_count);
        //      AsyncStorage.setItem('@question_count', "" + (question_count-1));
        //      this.setState({ question_count: question_count });
        //   //   console.log("question_count ====" + this.state.question_count);
        //    }
        //  });
        }

      //  console.log('response object:', responseData.question_log[0].post_date);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }



  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { 
            
              this.props.navigation.navigate('QuestionLog', {
                isgoback: true
            })
            
              
            }} >

            <Image source={require('../images/back_blue.png')}
              style={styles.backIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }} >

            <Text style={styles.screenntitlestyle}>{stringsoflanguages.question_log}</Text>

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              if (this.state.islogin == '0') {
                this.props.navigation.navigate('Login')
              } else {
                this.props.navigation.navigate('Notification')
              }

            }} >

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/notification.png')}
                    style={styles.badgeImageIconStyle}
                  />

                }
                BadgeElement={
                  <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                    {this.state.notification_count}
                  </Text>
                }
                IconBadgeStyle={
                  {
                    width: 23,
                    height: 23,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.notification_count == 0}
              />
            </View>

          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.container, { flex: 1, marginBottom: 60 }}>

            <View style={{ flexDirection: 'column', backgroundColor: '#fbfbfb' }}>

              <View style={{ flexDirection: 'row', backgroundColor: '#fbfbfb' }}>

                <View style={{
                  flex: .10, backgroundColor: this.state.reply == null || this.state.reply == "" ? "white" : "white",
                  borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', padding: 5, borderColor: '#0093C8',
                  borderWidth: 2
                }}>


                  <Image
                    style={styles.clockiconstyle}
                    source={
                      require('../images/clock.png')
                    } />


                  <Text style={{ color: '#0093c8', marginTop: 5, textAlign: 'center', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>{this.state.post_date}</Text>

                </View>

                <View style={{ flex: .90, marginLeft: 10, padding: 10 }}>
                  <Text style={{ color: '#383435', alignItems: 'center', fontSize: RFValue(12, 580) }}>{this.state.question}</Text>
                </View>

              </View>


              <View style={{ flexDirection: 'row', marginTop: 48 }}>

                <Text style={{
                  textAlign: 'left',
                  color: !this.state.visible ? "#999999" : "#0093c8",
                  borderBottomColor: !this.state.visible ? "#999999" : "#0093c8",
                  fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5, borderBottomWidth: 2
                }}>
                  {!this.state.visible ? stringsoflanguages.under_review : stringsoflanguages.yys_adviced}

                </Text>


                <View style={{ flexDirection: 'row', flex: .5, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                  {
                    this.state.visible ?
                      <Image

                        style={styles.greyclockiconstyle}
                        source={require('../images/clock.png')} /> : null
                  }
                  {
                    this.state.visible ?
                      <Text style={{
                        color: '#616161', marginLeft: 10, fontSize: RFPercentage(1.7), textAlign: 'right',
                        marginRight: 5
                      }}>
                        {this.state.replydate}</Text>
                      : null
                  }


                </View>


              </View>



              <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }} />


              <View style={{ flexDirection: 'row', backgroundColor: '#f1f5fd', margin: 20, borderRadius: 20 }}>
                {
                  this.state.visible ?
                    <Text style={{
                      color: '#767475', alignItems: 'center', justifyContent: 'center', textAlign: 'left',
                      fontSize: 14, padding: 10
                    }}>{this.state.reply}</Text> : null
                }

              </View>


              {this.state.loading && (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#0094CD" />
                </View>
              )}

            </View>
          </View>

        </ScrollView>

        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5,
          elevation: 20, shadowColor: 'grey', elevation: 20,
          shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
        }}>

          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

            <Image source={require('../images/home-inactive.png')}
              style={styles.StyleHomeTab} />

            <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.home_menu}</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/question-active.png')}
                    style={styles.StyleQuestionsTab} />
                }
                BadgeElement={
                  <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                    {this.state.question_count}
                  </Text>
                }
                IconBadgeStyle={
                  {
                    width: 23,
                    height: 23,
                    marginRight:20,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.question_count == 0}
              />

              <Text style={styles.bottomquestiontextstyle}>{stringsoflanguages.questions}</Text>

            </View>




          </TouchableOpacity>




          {/* <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff', width: 70, height: 100, bottom: 5, zIndex: 10 }}>

            <View style={{ flex: 1 }}> */}
          <ActionButton
                                    buttonColor="#0094CD"
                                    onPress={() => {

                                        this.props.navigation.navigate('Dashboard')
        
                                    }}>

            {/* <ActionButton.Item title="New Task"
              onPress={() => console.log("notes tapped!")}>

            </ActionButton.Item>


            <ActionButton.Item
              title="Notifications"
              onPress={() => { console.log("notes tapped!") }}>

              <Image source={require('../images/chat_anim_menu.png')}
                style={styles.animationIconStyle} />

            </ActionButton.Item>

            <ActionButton.Item
              title="Notifications"
              onPress={() => { console.log("notes tapped!") }}>


              <Image source={require('../images/question_anim_menu.png')}
                style={styles.animationIconStyle}
                onPress={() => { console.log("image tapped!") }} />



            </ActionButton.Item>

            <ActionButton.Item
              title="Notifications"
              onPress={() => { console.log("notes tapped!") }}>


            </ActionButton.Item> */}

          </ActionButton>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
            onPress={() => { this.props.navigation.navigate('contractLog') }}>

            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/contract-inactive.png')}
                    style={styles.styleContractTab} />
                }
                BadgeElement={
                  <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                    {this.state.contract_count}
                  </Text>
                }
                IconBadgeStyle={
                  {
                    width: 23,
                    height: 23,
                    marginLeft:20,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.contract_count == 0}
              />

              <Text style={styles.bottomcontracttextstyle}>{stringsoflanguages.contracts}</Text>


            </View>

          </TouchableOpacity>


          <TouchableOpacity style={{
            flex: .25, alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column'
          }}
            onPress={() => { this.props.navigation.navigate('Contactus') }}>

            <Image source={require('../images/support-inactive.png')}
              style={styles.StyleContactusTab} />

            <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contactus_menu}</Text>


          </TouchableOpacity>



        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5fd'
  },
  ImageIconStyle: {
    marginTop: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIconStyle: {
    marginTop: 3,
    height: 25,
    width: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenntitlestyle: {
    color: "#0094CD",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  animationIconStyle: {
    marginTop: 3,
    height: 60,
    width: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockiconstyle: {
    tintColor: '#0093c8',
    height: 15,
    width: 15,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  greyclockiconstyle: {
    tintColor: '#616161',
    height: 15,
    width: 15,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // badgeImageIconStyle: {
  //   marginTop: 10,
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  bottomactivebuttonstyle: {
    color: "#0094CD",
    fontSize: 7,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottominactivebuttonstyle: {
    color: "#887F82",
    fontSize: 7,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  StyleHomeTab: {
    marginTop: 5,
    width: 35,
    height: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
},
StyleQuestionsTab: {
    marginTop: 11,
    marginRight:20,
    width: 30,
    height: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
},
styleContractTab: {
  marginTop: 9,
  width: 21,
  height: 30,
  marginLeft:20,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
  badgeImageIconStyle: {
    marginTop: 5,
    width: 35,
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleContractTab: {
    marginTop: 9,
    width: 21,
    height: 30,
    marginLeft:20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
},
StyleContactusTab: {
    marginTop: 14,
    width: 28,
    height: 28,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
},
  bottomquestiontextstyle: {
    color: "#887F82",
    fontSize: 7,
    marginRight:20,
    textAlign: 'center',
    fontWeight: 'bold',
},
bottomcontracttextstyle: {
    color: "#887F82",
    fontSize: 7,
    marginLeft:20,
    textAlign: 'center',
    fontWeight: 'bold',
},
});

export default QuestionLogDetailActivity;
