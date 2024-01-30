import React from 'react';
import WeatherScreen from './WeatherScreen';

const FavoritesWeatherScreen = ({route}) => {
  const {city} = route.params;

  return <WeatherScreen selectedCity={city} />;
};

export default FavoritesWeatherScreen;

