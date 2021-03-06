import React, { Component } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
    AppRegistry,
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Image,
    ScrollView,
    ImageBackground,
    SafeAreaView
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from './locales/stringsoflanguages';


var otp, email;

class ResetPasswordActivity extends Component {
    constructor(props) {
        super(props);
        this.resetpassword = this.resetpassword.bind(this);
        this.state = {
            JSONResult: '',
            password: '',
            confirmpassword: '',
            status: '',
            email: '',
            otp: '',
            wholeResult: '',
            selectedLanguage:'',
            baseUrl: 'https://ylaw.app/admin/app_api/change_password'
        };
    }


    static navigationOptions = {
        title: 'Reset Password Screen',
    };

    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.password != '') {
            //Check for the Name TextInput
            if (this.state.confirmpassword != '') {
                //Check for the Email TextInput
                if (this.state.password == this.state.confirmpassword) {

                    this.showLoading();
                    this.resetpassword();

                } else {
                    alert(stringsoflanguages.new_password_and_confirm_password_not_matched);
                }
            } else {
                alert(stringsoflanguages.please_enter_confirm_password);
            }
        } else {
            alert(stringsoflanguages.please_enter_new_password);
        }
    };

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    componentDidMount() {
        const { navigation } = this.props;
        email = navigation.getParam('email', 'no-email');
        otp = navigation.getParam('otp', 'no-email');

        AsyncStorage.getItem('@language').then((selectedLanguage) => {
            if (selectedLanguage) {
              if(selectedLanguage=="English")
              {
                stringsoflanguages.setLanguage("en");
              }else{
                stringsoflanguages.setLanguage("ar");
              }
      
            }
          });
    }


    resetpassword() {

        console.log("email====" + email)
        console.log("new_password====" + this.state.password)
        console.log("otp====" + otp)
        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secure_pin: 'digimonk',
                email_id: email,
                new_password: this.state.password,
                otp: otp

            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();

                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                    this.props.navigation.navigate('Login')
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
            // <ImageBackground style={styles.imgBackground}
            //     resizeMode='cover'
            //     source={require('../images/bg.png')}>

            <SafeAreaView style={styles.container}>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0093c8', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.goBack() }} >

                        <Image
                            tintColor={'white'}
                            source={require('../images/back_blue.png')}

                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}></Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}>

                    </TouchableOpacity>

                </View>


                <ScrollView>


                    <Image style={styles.headerLogo}
                        source={require('../images/yys_shadow_logo-new.png')}>

                    </Image>


        <Text style={styles.headerdescription}>{stringsoflanguages.sponsored_by_yys_legal_from_office}</Text>


                    <View style={styles.datacontainer}>

                        <View style={styles.SectionStyle}>

                            <Image source={require('../images/lock.png')}
                                style={styles.ImagelockIconStyle} />


                            <TextInput
                                placeholder={stringsoflanguages.enter_new_password_text}
                                placeholderTextColor="#C7E8F2"
                                underlineColorAndroid="transparent"
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                            />

                        </View>

                        <View style={styles.SectionStyle}>

                            <Image source={require('../images/lock.png')}
                                style={styles.ImagelockIconStyle} />


                            <TextInput
                                placeholder={stringsoflanguages.enter_new_confirm_password_text}
                                placeholderTextColor="#C7E8F2"
                                underlineColorAndroid="transparent"
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={confirmpassword => this.setState({ confirmpassword })}
                            />
                        </View>


                        {this.state.loading && (
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#ffffff" />
                            </View>
                        )}

                        <TouchableOpacity
                            style={styles.SubmitButtonStyle}
                            activeOpacity={.5}
                            onPress={this.CheckTextInput}>


                            <Text style={styles.fbText}> {stringsoflanguages.reset_password_button_text} </Text>

                        </TouchableOpacity>



                    </View>
                </ScrollView>


            </SafeAreaView>
            // </ImageBackground>

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
        backgroundColor: '#0093c8'
    },
    datacontainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // headerText: {
    //     marginTop: 30,
    //     fontSize: 120,
    //     width: '100%',
    //     textAlign: 'center',
    //     color: 'white',
    //     fontWeight: 'bold'
    // },
    headerdescription: {
        marginTop: 20,
        fontSize: RFValue(10, 580),
        textAlign: 'center',
        color: '#FFFFFF'
    },
    input: {
        color: '#ffffff',
        width: 300,
        height: 44,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    normalText: {
        fontSize: RFPercentage(2),
        textAlign: 'right',
        color: '#F0F5FE',
        marginRight: 35,
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    SubmitButtonStyle: {
        marginTop: 50,
        width: 300,
        height: 40,
        padding: 10,
        backgroundColor: '#FFC100',
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
        fontWeight: 'bold',
    },
    // skipbrowseText: {
    //     fontSize: 20,
    //     textAlign: 'right',
    //     color: '#F0F5FE',
    //     marginRight: 43,
    //     marginTop: 30,
    //     alignSelf: 'flex-end',
    //     fontWeight: 'bold'
    // },
    fbText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        alignContent: 'center',
        fontWeight: 'bold'
    },

    // imgBackground: {
    //     width: '100%',
    //     height: '100%',
    //     flex: 1
    // },

    headerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    ImageIconStyle: {
        height: 20,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImagelockIconStyle: {
        height: 30,
        width: 25,
        marginLeft:10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
    screenntitlestyle: {
        color: "#0094CD",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backIconStyle: {
        marginTop: 3,
        height: 25,
        width: 45,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ResetPasswordActivity;
