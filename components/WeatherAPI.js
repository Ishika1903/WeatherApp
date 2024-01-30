// WeatherAPI.js
const API_KEY = '729892509de8483cae9171722242401';

export const getWeatherByCityName = async (city, units) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=8`,
    );
    const results = await response.json();

    return parseWeatherData(results, units);
  } catch (error) {
    console.error('Error fetching weather data by city name:', error);
    throw error;
  }
};

export const getWeatherByLocation = async (latitude, longitude, units) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=8&aqi=no&alerts=no`,
    );
    const results = await response.json();

    return parseWeatherData(results, units);
  } catch (error) {
    console.error('Error fetching weather data by location:', error);
    throw error;
  }
};

const parseWeatherData = (data, units) => {
  const today = new Date().toISOString().split('T')[0];

  return {
    location: data.location.name,
    region: data.location.region,
    country: data.location.country,
    temp:
      units.temperature === 'Celsius'
        ? data.current.temp_c
        : data.current.temp_f,
    condition_text: data.current.condition.text,
    condition_icon: `https:${data.current.condition.icon}`,
    humidity: data.current.humidity,
    wind:
      units.windSpeed === 'kph' ? data.current.wind_kph : data.current.wind_mph,
    wind_dir: data.current.wind_dir,
    pressure:
      units.pressure === 'mb'
        ? data.current.pressure_mb
        : data.current.pressure_in,
    precip_mm: data.current.precip_mm,
    forecast: data.forecast.forecastday
      .filter(day => day.date !== today)
      .slice(0, 7)
      .map(day => ({
        date: new Date(day.date).toString().split(' ')[0],
        temp:
          units.temperature === 'Celsius'
            ? day.day.avgtemp_c
            : day.day.avgtemp_f,
        icon: `https:${day.day.condition.icon}`,
      })),
  };
};

export const searchCities = async text => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${text}`,
    );
    const data = await response.json();
    if (Array.isArray(data)) {
      return data.map(item => item.name);
    } else {
      console.error('Unexpected response format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    return [];
  }
};