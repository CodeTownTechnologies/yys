import React from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
    ActivityIndicator, SafeAreaView
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';

function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{ flex: .10, backgroundColor: '#dc8517', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', }}>


                    <Image
                        style={styles.clockiconstyle}
                        source={
                            require('../images/clock.png')
                        } />

                    <Text style={{ color: 'white',  textAlign:'center', fontSize: RFPercentage(1.7), fontWeight: 'bold',  marginTop: 3 }}>{item.post_date}</Text>

                </View>

                <View style={{ flex: .90, marginLeft: 10, padding: 5 }}>
                    <Text 
                    numberOfLines={3} 
                    ellipsizeMode='tail'
                    style={{color: '#767475', alignItems: 'center', fontSize: RFValue(13, 580), marginTop: 10 }}>{item.question_array[0].question}</Text>
                    <Text style={{ color: "#0093c8", alignItems: 'center', marginBottom: 10 }}>{item.question_array[0].answer}</Text>
                </View>

            </View>
        </View>


    );
}

export default class ContractLogActivity extends React.Component {

    constructor(props) {
        super(props);
        this.contractLogList = this.contractLogList.bind(this);
        this.state = {
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/get_contract_log',
            userId: '',
        };
    }




    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    componentDidMount() {

        this.showLoading();
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
                this.contractLogList();
            }
        });

    }

    contractLogList() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secure_pin: 'digimonk',
                customer_id: '16'
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    this.setState({ data: responseData.contract_log });

                }

                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }


    actionOnRow(item) {
        this.props.navigation.navigate('ContractLogDetail')
        console.log('Selected Item :', item);
    }




    render() {
        return (

            <SafeAreaView style={styles.container}>


                {this.state.loading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0094CD" />
                    </View>
                )}



                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Image source={require('../images/menu.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>CONTRACT LOG</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Notification') }} >

                        <Image source={require('../images/notification.png')}
                            style={styles.ImageIconStyle}
                        />

                    </TouchableOpacity>
                </View>


                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}

                    renderItem={({ item }) => (

                        <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                            <View>
                                <Item item={item}
                                />
                            </View>

                        </TouchableWithoutFeedback>

                    )}
                    keyExtractor={item => item.email}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20 }}>

                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                        onPress={() => { this.props.navigation.navigate('QuestionLog') }}>

                        <Image source={require('../images/question-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>

                    <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff', width: 70, height: 100, bottom: 5, zIndex: 10 }}>

                        <View style={{ flex: 1 }}>
                            <ActionButton buttonColor="#0094CD">

                                <ActionButton.Item buttonColor='#fffff' title="New Task" onPress={() => console.log("notes tapped!")}>

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


                                </ActionButton.Item>

                            </ActionButton>
                        </View>
                    </View>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
                        onPress={() => { this.props.navigation.navigate('contractLog') }}>

                        <Image source={require('../images/contract-active.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('VideoCall') }}>

                        <Image source={require('../images/support-inactive.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>
                </View>

            </SafeAreaView>

            // {/* </View> */}
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5fd'
    },
    listItem: {
        margin: 10,
        backgroundColor: "#fbfbfb",
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    },
    ImageIconStyle: {
        marginTop: 3,
        height: 25,
        width: 25,
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
    clockiconstyle: {
        height: 10,
        width: 10,
        padding:5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

});