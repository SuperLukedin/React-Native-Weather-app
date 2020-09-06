import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'




export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
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
      alert(`latitude: ${latitude}, longitude: ${longitude}`)
    } catch (error) {

    } 
  }
  return (
    <View style={styles.container}>
      <Text>React-native</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
