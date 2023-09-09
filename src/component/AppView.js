import React from 'react'
import { View, StyleSheet } from 'react-native'
import Constant from '../utils/Constant'
import { AppLoading } from '.'

const AppView = ({ children, style, isLoading = false }) => (
    <View style={[styles.baseContainer, { ...style }]}>
        {isLoading && <AppLoading />}
        {children}
    </View>
)

export default AppView

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        // backgroundColor: Constant?.color?.white,
    }
})