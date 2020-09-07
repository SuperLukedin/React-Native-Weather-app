import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function WeatherInfo({currentWeather}) {
    let temp = 0
    let icon = ''
    let name = ''    
    let description = ''
    let main = ''
    if (currentWeather) {
      temp = JSON.stringify(currentWeather.main.temp)
      icon = JSON.stringify(currentWeather.weather[0].icon).replace(/\"/g, "")
      name = JSON.stringify(currentWeather.name).replace(/\"/g, "")
      description = JSON.stringify(currentWeather.weather[0].description).replace(/\"/g, "")
      main = JSON.stringify(currentWeather.weather[0].main).replace(/\"/g, "")
    }
    let iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <View style={styles.weatherInfo}>
            <Text>{ name }</Text>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text>{ temp }</Text>
            <Text style={styles.weatherDescription}>{ description }</Text>
            <Text>{ main }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center'
    },
    weatherDescription: {
        textTransform: 'capitalize'
    },
    weatherIcon: {
        width: 100,
        height: 100
    }
})
