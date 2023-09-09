import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [token, setToken] = useState("")
	const [memId, setMemId] = useState("")
	const [userPin, setUserPin] = useState("")
	const [userPinPhone, setUserPinPhone] = useState("")
	const [userPinDate, setUserPinDate] = useState("")

	// excute function when app start
	useEffect(() => {
		onGetAppData();
	}, [])

	const onGetAppData = async () => {
		try {
			// console.log("getting app's data...");
			await AsyncStorage.getItem("token").then((res) => setToken(res || ""));
			await AsyncStorage.getItem("mem_id").then((res) => setMemId(res || ""));
			await AsyncStorage.getItem("pin").then((res) => setUserPin(res || ""));
			await AsyncStorage.getItem("pinPhone").then((res) => setUserPinPhone(res || ""));
			await AsyncStorage.getItem("pinDate").then((res) => setUserPinDate(res || ""));
		} catch (e) {
			console.log("AppContext.js onGetAppData error : ", e);
		}
	}

	return (
		<AppContext.Provider
			value={{
				token, setToken,
				memId, setMemId,
				userPin, setUserPin,
				userPinPhone, setUserPinPhone,
				userPinDate, setUserPinDate,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}