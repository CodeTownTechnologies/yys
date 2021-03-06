import React, { Component } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import stringsoflanguages from './locales/stringsoflanguages';
import IconBadge from 'react-native-icon-badge';


const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


class ContactusActivity extends Component {
  constructor(props) {
    super(props);
    this.mapView = null;
    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.state = {
      JSONResult: '',
      address: '',
      email: '',
      phoneno: '',
      latitude: '',
      longitude: '',
      status: '',
      wholeResult: '',
      islogin: '',
      selectedLanguage: '',
      baseUrl: 'https://ylaw.app/admin/app_api/get_company_info',
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
        question_count: '',
        contract_count: '',
        notification_count: '',
      },
    };
  }


  static navigationOptions = {
    title: 'Contact us Screen',
  };

  componentDidMount() {

    this.showLoading();

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

    AsyncStorage.getItem('@is_login').then((is_login) => {
      if (is_login) {
        this.setState({ islogin: is_login });
        this.getCompanyInfo();
      }
    });




  }

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }


  getCompanyInfo() {

    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk'
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          this.setState({ email: responseData.email })
          this.setState({ phoneno: responseData.phone })
          this.setState({ address: responseData.address })


          var lat = parseFloat(responseData.lattitute)
          var long = parseFloat(responseData.longitute)


          this.setState({ latitude: lat })
          this.setState({ longitude: long })

          console.log("lat===" + lat)
          console.log("responseData.latitude===" + responseData.lattitute)

          var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }


          this.setState({ initialPosition: initialRegion })
          this.mapView.animateToRegion(initialRegion, 2000);

        }


        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }




  render() {
    return (

      <SafeAreaView style={styles.container}>

        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#ffffff', height: 60
        }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.goBack() }} >


            <Image
              source={require('../images/back_blue.png')}

              style={styles.backIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

            <Text style={styles.screenntitlestyle}>{stringsoflanguages.contact_us}</Text>

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

        <ScrollView style={{ flexDirection: 'column' }} >

          <View style={{
            flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 20,
            marginBottom: 20, marginTop: 10,
            height: 250, width: 392, alignItems: 'center', elevation: 20,
            shadowColor: '#ecf6fb', overflow: 'hidden'
          }}>

            <MapView
              style={styles.mapStyle}
              showsUserLocation={true}
              zoomEnabled={true}
              zoomControlEnabled={true}
              showsMyLocationButton={true}
              minZoomLevel={3}
              maxZoomLevel={12}

              ref={ref => {
                this.mapView = ref;
              }}

              initialRegion={this.state.initialPosition}
            >

              <Marker

                coordinate={{
                  latitude: this.state.initialPosition.latitude,
                  longitude: this.state.initialPosition.longitude,
                }}
                title={this.state.address}
              />

            </MapView>


          </View>


          <View style={{
            flexDirection: 'column', backgroundColor: 'white', marginTop: 10, margin: 5,
            height: 250, width: 380, elevation: 20,
            shadowColor: 'black', borderRadius: 20,
            shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
          }}>

            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}>

              <View style={{
                flexDirection: 'row', marginLeft: 10, marginTop: 40, alignItems: 'center', justifyContent: 'flex-start',
                textAlign: 'center'
              }}>


                {this.state.loading && (
                  <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0093c8" />
                  </View>
                )}

                <Image source={require('../images/location-blue-small.png')}
                  style={styles.locationIconStyle} />

                <Text style={styles.headingstyle}>{stringsoflanguages.office}</Text>

              </View>



              <Text style={{ color: '#4D4D4D', marginLeft: 55, marginRight: 5, marginTop: 15 }}>{this.state.address}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                <TouchableOpacity style={{ flex: .10, alignItems: 'center', justifyContent: 'center' }}
                  onPress={this.openTermsConditions} >

                  <Image source={require('../images/call-blue.png')}
                    style={styles.MenuIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .90, marginRight: 10, justifyContent: 'center' }}>

                  <Text style={{ color: '#4D4D4D', marginLeft: 10 }}>{this.state.phoneno}</Text>

                </TouchableOpacity>

              </View>

              <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15,
                marginBottom: 50
              }}>

                <TouchableOpacity style={{ flex: .10, alignItems: 'center', justifyContent: 'center' }}
                  onPress={this.openTermsConditions} >

                  <Image source={require('../images/email_blue.png')}
                    style={styles.MailIconStyle} />

                </TouchableOpacity>


                <TouchableOpacity style={{ flex: .90, marginRight: 10, justifyContent: 'center' }}>

                  <Text style={{ color: '#4D4D4D', marginLeft: 10 }}>{this.state.email}</Text>

                </TouchableOpacity>

              </View>

            </ScrollView>


          </View>

        </ScrollView>


        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
          height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20
        }}>

          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' , flexDirection: 'column'}}
            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

            <Image source={require('../images/home-inactive.png')}
              style={styles.StyleHomeTab} />

            <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.home_menu}</Text>

          </TouchableOpacity>



          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              if (this.state.islogin == '0') {
                this.props.navigation.navigate('Login')
              } else {
                this.props.navigation.navigate('QuestionLog')
              }
            }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/question-inactive.png')}
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
          <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff', width: 70, height: 100, bottom: 5, zIndex: 10 }}>

            <View style={{ flex: 1 }}>
            <ActionButton
                                    buttonColor="#0094CD"
                                    onPress={() => {

                                        this.props.navigation.navigate('Dashboard')
        
                                    }}>

                {/* <ActionButton.Item buttonColor='#fffff' title="New Task" onPress={() => console.log("notes tapped!")}>

                </ActionButton.Item>
                <ActionButton.Item buttonColor='#fffff'
                  title="Notifications"
                  onPress={() => { console.log("notes tapped!") }}
                >

                  <Image source={require('../images/chat_anim_menu.png')}
                    style={styles.animationIconStyle} />
                </ActionButton.Item>

                <ActionButton.Item buttonColor='#fffff'
                  title="Notifications"
                  onPress={() => { }}>

                  <Image source={require('../images/question_anim_menu.png')}
                    style={styles.animationIconStyle} />
                </ActionButton.Item>

                <ActionButton.Item buttonColor='#fffff'
                  title="Notifications"
                  onPress={() => { }}>


                </ActionButton.Item> */}

              </ActionButton>
            </View>
          </View>


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20, flexDirection: 'column' }}
            onPress={() => {
              if (this.state.islogin == '0') {
                this.props.navigation.navigate('Login')
              } else {
                this.props.navigation.navigate('contractLog')
              }
            }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',flexDirection: 'column' }}>
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


          <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            onPress={() => { this.props.navigation.navigate('Contactus') }}>

            <Image source={require('../images/support-active.png')}
              style={styles.StyleContactusTab} />

            <Text style={styles.bottomactivebuttonstyle}>{stringsoflanguages.contactus_menu}</Text>

          </TouchableOpacity>


        </View>

      </SafeAreaView >


    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    //backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F5FE'
  },
  screenntitlestyle: {
    color: "#0093c8",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  headingstyle: {
    color: "#0093c8",
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  backIconStyle: {
    marginTop: 3,
    height: 25,
    width: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datacontainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#C7E8F2',
    height: 40,
    borderRadius: 5,
    borderBottomWidth: 1,
    margin: 10,
    flexDirection: 'row'
  },
  animationIconStyle: {
    marginTop: 3,
    height: 60,
    width: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10
  },
  locationIconStyle: {
    marginLeft: 5,
    height: 35,
    width: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuIconStyle: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MailIconStyle: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeImageIconStyle: {
    marginTop: 10,
    marginLeft: 10,
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageIconStyle: {
    marginTop: 3,
    width:30,
    height:30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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

export default ContactusActivity;
