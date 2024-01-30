import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useSettings} from './SettingsContext';
import {getWeatherByCityName, getWeatherByLocation} from './WeatherAPI'; 

const WeatherScreen = ({selectedCity}) => {
  const {units} = useSettings();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    } else {
      getLocationAndWeather();
    }
  }, [selectedCity, units.temperature, units.windSpeed, units.pressure]);

  const fetchWeatherData = async location => {
    try {
      setLoading(true);
      let weatherData;

      if (isNaN(location)) {
        weatherData = await getWeatherByCityName(location, units);
      } else {
        const longitude = location;
        const latitude = units;
        weatherData = await getWeatherByLocation(latitude, longitude, units);
      }

      setCurrentWeather(weatherData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const getLocationAndWeather = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        fetchWeatherData(latitude);
      },
      error => {
        console.error(error);
        alert('Error getting location. Please check your device settings.');
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.cityName}>{currentWeather.location}</Text>
        <Text style={styles.regionCountry}>
          {currentWeather.region},{currentWeather.country}
        </Text>
      </View>

      <View style={styles.weatherContainer}>
        <View style={styles.tempContainer}>
          <Text style={styles.tempText}>
            {currentWeather.temp}°{units.temperature === 'Celsius' ? 'C' : 'F'}
          </Text>
          <Text style={styles.infoText}>{currentWeather.condition_text}</Text>
        </View>
        <View style={styles.iconAndDetails}>
          <Image
            style={styles.weatherImage}
            source={{uri: currentWeather.condition_icon}}
          />
          <Text style={styles.infoText}>
            Humidity: {currentWeather.humidity}%
          </Text>
        </View>
      </View>

      <View style={styles.forecastCard}>
        <View style={styles.forecastContainer}>
          {currentWeather.forecast.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayText}>{day.date}</Text>
              <Image style={styles.smallIcon} source={{uri: day.icon}} />
              <Text style={styles.dayTemp}>
                {day.temp}°{units.temperature === 'Celsius' ? 'C' : 'F'}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.cardGrid}>
        <View style={styles.cardColumn}>
          <View style={styles.card}>
            <Image
              source={require('../Images/wind.png')} 
              style={styles.cardImage}
            />
            <Text>
              Wind: {currentWeather.wind}{' '}
              {units.windSpeed === 'kph' ? 'kph' : 'mph'}
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require('../Images/pressure.png')} 
              style={styles.cardImage}
            />
            <Text>
              Pressure: {currentWeather.pressure}{' '}
              {units.pressure === 'mb' ? 'mb' : 'in'}
            </Text>
          </View>
        </View>

        <View style={styles.cardColumn}>
          <View style={styles.card}>
            <Image
              source={require('../Images/windDirect.png')} 
              style={styles.cardImage}
            />
            <Text>Direction: {currentWeather.wind_dir}</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require('../Images/precip.png')} 
              style={styles.cardImage}
            />
            <Text>Precipitation: {currentWeather.precip_mm} mm</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  locationContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  locationIcon: {
    fontSize: 30,
  },
  cityName: {
    fontSize: 55,
    fontWeight: 'bold',
  },
  regionCountry: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'gray',
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 5,
    marginVertical: 20,
  },
  tempContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconAndDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  weatherImage: {
    width: 90,
    height: 70,
  },
  tempText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 5,
    textAlign: 'left',
    fontSize: 17,
  },

  forecastCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 6,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  smallIcon: {
    width: 65,
    height: 65,
  },
  dayTemp: {
    fontSize: 15,
  },

  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  cardColumn: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 150,
    width: 180,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 6,
  },
  cardImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  loaderStyle: {
    width: '200px',
    height: '200px',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
});

export default WeatherScreen;



