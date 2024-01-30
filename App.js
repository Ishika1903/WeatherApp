
import React from 'react';
import HomeScreen from './components/HomeScreen';
import AppNavigator from './components/AppNavigator';
import BottomNavigator from './components/BottomNavigator';
import { SettingsProvider } from './components/SettingsContext';
import Screen3 from './components/Settings';
import WeatherScreen from './components/WeatherScreen';

const App = () => {
  // return <HomeScreen />;
  return (
    <SettingsProvider>
  
      <AppNavigator />
      

    </SettingsProvider>

    //<BottomNavigator/>
  );
};

export default App;