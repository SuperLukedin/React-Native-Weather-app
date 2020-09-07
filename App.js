import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import { colors } from './utils/index'
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'


const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unit, setUnit] = useState('metric')

  useEffect(() => {
    load()
  }, [unit])

  async function load() {
    setCurrentWeather(null)
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
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unit={unit} setUnit={setUnit} />
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} />  
      </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>
        <StatusBar style="auto" />
      </View>
    )
  }
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
