//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
// import all basic components

//For React Navigation 3+
//import {
//  createStackNavigator,
//  createDrawerNavigator,
//  createAppContainer,
//} from 'react-navigation';

//For React Navigation 4+
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardActivity from '../components/DashboardActivity';
import ProfileActivity from '../components/ProfileActivity';



class QuestionLogNavigationScreen extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          {/*Donute Button Image */}


          <TouchableOpacity
            style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <Image
              source={require('../images/menu.png')}
              style={{ width: 25, height: 25, marginLeft: 5 , tintColor: "#2d3436"}}
            />

          </TouchableOpacity>
        
        </TouchableOpacity>


      </View>

    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: DashboardActivity,
    navigationOptions: ({ navigation }) => ({
      title: 'DASHBOARD',
      headerLeft: () => <QuestionLogNavigationScreen navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#F0F5FE'

      },
      headerTintColor: '#0094CD',
    }),
  },
});




const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Second: {
    screen: ProfileActivity,
    navigationOptions: ({ navigation }) => ({
      title: 'PROFILE',
      headerLeft: () => <QuestionLogNavigationScreen navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#0093c8'

      },
      headerTintColor: '#ffffff',
    }),
  },
});

const Screen3_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  Third: {
    screen: ProfileActivity,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen 3',
      headerLeft: () => <QuestionLogNavigationScreen navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#F0F5FE'

      },
      headerTintColor: '#0094CD',
    }),
  },
});

const DrawerNavigatorExample = createDrawerNavigator({
  //Drawer Optons and indexing
  NavigationScreen: {
    //Title
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Dashboard',
    },
  },
  Screen2: {
    //Title
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Profile',
    },
  },
  Screen3: {
    //Title
    screen: Screen3_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Screen 3',
    },

  },
});

export default createAppContainer(DrawerNavigatorExample);