import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import {View, Text, Image} from 'react-native';
import DrawerScreen from './DrawerScreen';
import styles from '../Styles/styles.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      <View style={{padding: 20}}>
        <Text style={styles.drawerText}>M A U S A M </Text>

        <Text style={styles.drawerText}>How We Forecast</Text>

        <Text style={styles.drawerText}>Favourites</Text>

        <Text style={styles.drawerText}>Contact Us </Text>

        <Text style={styles.drawerText}>Settings </Text>

        <Text style={styles.drawerText}>Rate Our App </Text>

        <Text style={styles.drawerText}>Share Our App </Text>
      </View>
      <View>
        <Text style={styles.drawerBottom}>
          Made with <Image source={require('../Images/heart.png')} style={styles.drawerBottomImage} />
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
   <Drawer.Navigator drawerContent={props =><CustomDrawerContent{...props}/>}>
    <Drawer.Screen name='M A U S A M ' component={DrawerScreen} />

   </Drawer.Navigator>

  );
};

export default DrawerNavigator;
