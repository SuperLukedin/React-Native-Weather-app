import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'

const WEATHER_API_KEY = '1727500ce8a189e65266dc7eb43465a6'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unit, setUnit] = useState('metric')

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync()
      if (status != 'granted') {
        setErrorMessage('Permission to access location was denied')
        return 
      }
      const location = await Location.getCurrentPositionAsync()

      

      const latitude = JSON.stringify(location.coords.latitude)
      const longitude = JSON.stringify(location.coords.longitude)

      const weatherUrl = `${BASE_WEATHER_URL}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)
      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    } 
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.main}>
        <WeatherInfo currentWeather={currentWeather}/>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
