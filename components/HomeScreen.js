// HomeScreen.js
import React, {useState} from 'react';
import {View, TextInput, Button, Text, Image} from 'react-native';
import styles from '../Styles/styles';
import { fetchWeather } from './WeatherAPI';

const HomeScreen = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleFetchWeather = () => {
    fetchWeather(location, setWeatherData, setError);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setLocation}
        value={location}
        placeholder="Enter Location (City or Coordinates)"
      />
      <Button onPress={handleFetchWeather} title="Get Weather Data" />
      {weatherData && (
        <View>
          <Text style={styles.data}>
            Temperature: {weatherData.temperature}°C
          </Text>
          <Text style={styles.data}>
            Wind Speed: {weatherData.wind_speed} km/h
          </Text>
          <Text style={styles.data}>
            Wind Direction: {weatherData.wind_dir}
          </Text>
          <Text style={styles.data}>Pressure: {weatherData.pressure} MB</Text>
          <Text style={styles.data}>
            Precipitation: {weatherData.precip} mm
          </Text>
          {weatherData.weather_icons && weatherData.weather_icons[0] && (
            <Image
              style={styles.icon}
              source={{uri: weatherData.weather_icons[0]}}
            />
          )}
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default HomeScreen;
