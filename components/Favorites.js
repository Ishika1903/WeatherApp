
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoritesWeatherScreen from './FavoritesWeatherScreen';
import { useNavigation } from '@react-navigation/native';
import { searchCities } from './WeatherAPI';

const Search = () => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
const navigation = useNavigation();
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };
const showWeatherForCity = selectedCity => {
  navigation.navigate('FavoritesWeatherScreen', {city: selectedCity});
};


  const saveFavorites = async newFavorite => {
    try {
      const newFavoritesArray = [...favorites, newFavorite];
      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(newFavoritesArray),
      );
      setFavorites(newFavoritesArray);
      setFeedbackMessage(`${newFavorite} added to favorites.`);
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const removeFromFavorites = async selectedCity => {
    const updatedFavorites = favorites.filter(city => city !== selectedCity);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      setFeedbackMessage(`${selectedCity} removed from favorites.`);
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const fetchCities = async text => {
    setCity(text);
    if (!text.trim()) {
      setCities([]);
      return;
    }

    try {
      const response = await searchCities(text);
      const data = await response.json();
      if (Array.isArray(data)) {
        setCities(data.map(item => item.name));
      } else {
        console.error('Unexpected response format:', data);
        setCities([]); 
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      setCities([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Image
          source={require('../Images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => fetchCities(text)}
          value={city}
          placeholder="Find Location"
          clearButtonMode="while-editing"
        />
      </View>

  
      {feedbackMessage !== '' && (
        <Text style={styles.feedbackMessage}>{feedbackMessage}</Text>
      )}

      {cities.length > 0 && (
        <FlatList
          data={cities}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => saveFavorites(item)}>
              <Text>
                {favorites.includes(item) ? '❤️ ' : '🤍 '}
                {item}
              </Text>
              <TouchableOpacity
                onPress={() => removeFromFavorites(item)}
                style={styles.favoriteButton}>
                <Text>{favorites.includes(item) ? 'Remove' : 'Add'}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

   
      <ScrollView style={styles.favoritesContainer}>
        <Text style={styles.favoritesHeader}>Favorites:</Text>
        {favorites.map((item, index) => (
          <View key={index} style={styles.favoriteCard}>
            <Text>{item}</Text>
            <View style={styles.favoriteButtonsContainer}>
              <TouchableOpacity
                style={styles.showWeatherButton}
                onPress={() => showWeatherForCity(item)}>
                <Text>Show Weather</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeFavoriteButton}
                onPress={() => removeFromFavorites(item)}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  currentLocationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  currentLocationText: {
    fontWeight: 'bold',
  },
  locationName: {},
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  temperatureText: {
    marginLeft: 5,
  },
  suggestionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  favoriteButton: {
    backgroundColor: '#eeeeee',
    padding: 5,
    borderRadius: 5,
  },
  favoritesContainer: {
    marginTop: 20,
  },
  favoritesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriteCard: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeFavoriteButton: {
    backgroundColor: '#ffcccc',
    padding: 5,
    borderRadius: 5,
  },
  feedbackMessage: {
    textAlign: 'center',
    color: 'green',
    paddingTop: 10,
  },
  showWeatherButton:{
    backgroundColor: '#cceeff',
  padding: 5,
  borderRadius: 5,
  marginRight: 10, 
  }
});

export default Search;





















