import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import sky from '../Images/sky.png';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Parent');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/sky.png')} 
        style={styles.images}
      />
      <Text style={styles.title}>MAUSAM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  images:{
    width:90,
    height:90
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
});

export default Splash;
