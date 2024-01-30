// StackNavigator.js

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Favorites from './Favorites';
import FavoritesWeatherScreen from './FavoritesWeatherScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen
        name="FavoritesWeatherScree"
        component={FavoritesWeatherScree}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
