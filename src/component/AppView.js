import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { AppLoading } from '.'

const AppView = ({ children, style, isLoading = false }) => (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.baseContainer, { ...style }]}
    >
        {isLoading && <AppLoading />}
        {children}
    </KeyboardAvoidingView>
)

export default AppView

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
})