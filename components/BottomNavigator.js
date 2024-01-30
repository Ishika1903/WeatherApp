import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Text, Image} from 'react-native';
import Home from './Home';
import Favorites from './Favorites';
import Settings from './Settings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Styles/styles';



const Bottom = createBottomTabNavigator(); 

const BottomNavigator = () => {
    return (
      <Bottom.Navigator>
        <Bottom.Screen
          name="Home"
          component={Home} 
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <Image
                  source={require('../Images/home.png')}
                  style={{width: 30, height: 30}}
                />
              );
            },
          }}
        />

        <Bottom.Screen
          name="Favourites" 
          component={Favorites}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <Image
                  source={require('../Images/heart.png')}
                  style={{width: 30, height: 30}}
                />
              );
            },
          }}
        />

        <Bottom.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <Image
                  source={require('../Images/settings.png')}
                  style={{width: 30, height: 30}}
                />
              );
            },
          }}
        />
      </Bottom.Navigator>
    );
};

export default BottomNavigator;
