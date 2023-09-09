import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Tab } from './page/Launcher'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useNavigator from "./utils/useNavigator"

const CheckingLogin = ({ Actions }) => {
    useEffect(() => {
        onCheckingLoginState();
    }, [])

    const onCheckingLoginState = async () => {
        const token = await AsyncStorage.getItem("token")
        // console.log("CheckLogin.js token : ", token)
        if (token) {
            Actions.replace("VerifyPin", { tab: Tab.HOME })
        } else {
            Actions.replace("Authen")
        }
    }

    return (
        <View />
    )
}

export default useNavigator(CheckingLogin)