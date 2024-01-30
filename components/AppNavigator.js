import { View,Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./Splash";
import Parent from "./Parent";
import WeatherScreen from "./WeatherScreen";
import Settings from "./Settings";
import Favorites from "./Favorites";
import FavoritesWeatherScreen from "./FavoritesWeatherScreen";
import { SettingsProvider } from "./SettingsContext";

const Stack = createStackNavigator(); 

const AppNavigator =() => {
    return (
      <NavigationContainer>
        <SettingsProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Parent"
              component={Parent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Weather"
              component={WeatherScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{headerShown: false}}
            />

            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen
              name="FavoritesWeatherScreen"
              component={FavoritesWeatherScreen}
            />
          </Stack.Navigator>
        </SettingsProvider>
      </NavigationContainer>
    );
}

export default AppNavigator;