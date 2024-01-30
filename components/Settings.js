import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { useSettings } from './SettingsContext';

const Settings = ({navigation}) => {
  const {units, applyUnitChanges} = useSettings();

  const [temperatureUnits, setTemperatureUnits] = useState(units.temperature);
  const [windSpeedUnits, setWindSpeedUnits] = useState(units.windSpeed);
  const [pressureUnits, setPressureUnits] = useState(units.pressure);

  const applyChanges = () => {
    applyUnitChanges({
      temperature: temperatureUnits,
      windSpeed: windSpeedUnits,
      pressure: pressureUnits,
    });

    navigation.goBack();
  };

  const handleAboutWeatherPress = () => {
    Alert.alert(
      'About Weather',
      'Weather is the state of the atmosphere, describing for example the degree to which it is hot or cold, wet or dry, calm or stormy, clear or cloudy. Weather differs from climate, in that climate is the average weather of a certain region and time period.',
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <Text style={styles.heading}>Settings</Text>

        <View style={styles.unitContainer}>
          <Text>Temperature Unit</Text>
          <Switch
            value={temperatureUnits === 'Celsius'}
            onValueChange={() =>
              setTemperatureUnits(
                temperatureUnits === 'Celsius' ? 'Fahrenheit' : 'Celsius',
              )
            }
          />
          <Text>{temperatureUnits}</Text>
        </View>

        <View style={styles.unitContainer}>
          <Text>Wind Speed Unit</Text>
          <Switch
            value={windSpeedUnits === 'kph'}
            onValueChange={() =>
              setWindSpeedUnits(windSpeedUnits === 'kph' ? 'mph' : 'kph')
            }
          />
          <Text>{windSpeedUnits}</Text>
        </View>

        <View style={styles.unitContainer}>
          <Text>Pressure Unit</Text>
          <Switch
            value={pressureUnits === 'mb'}
            onValueChange={() =>
              setPressureUnits(pressureUnits === 'mb' ? 'hg' : 'mb')
            }
          />
          <Text>{pressureUnits}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.applyButton} onPress={applyChanges}>
        <Text style={styles.applyButtonText}>Apply Changes</Text>
      </TouchableOpacity>

      <View style={styles.aboutWeatherCard}>
        <TouchableOpacity onPress={handleAboutWeatherPress}>
          <Text style={styles.aboutWeatherButtonText}>About Weather</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  unitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  aboutWeatherCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    
  },
  aboutWeatherButtonText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom:20,
    height:50

  },

  applyButtonText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});

export default Settings;
