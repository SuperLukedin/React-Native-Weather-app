import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker'

export default function UnitsPicker({unit, setUnit}) {
    return (
        <View style={styles.unitsSystem}>
            <Picker selectedValue={ unit } onValueChange={(item) => setUnit(item)} mode="dropdown" itemStyle={{ fontSize: 12 }}>
                <Picker.item label="C°" value="metric"/>
                <Picker.item label="F°" value="imperial"/>
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitsSystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -20,
                left: 20,
            },
            android: {
                top: 65,
                left: 20
            }
        }),
        height: 50,
        width: 100
    }
})

