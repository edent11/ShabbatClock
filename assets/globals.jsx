/*
    FileName: globals.jsx
    Role: global functions
*/

import { ToastAndroid } from 'react-native';
import AlarmNotification from "../components/AlarmNotification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, MaterialIcons, AntDesign, Fontisto, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons/';
import * as Font from 'expo-font';

export const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

const alarmsManager = new AlarmNotification();

export function getAlarmsManager() {
    return alarmsManager;
}

export function getDateDisplay(fullTime) {

    if (fullTime == null || fullTime == undefined)
        fullTime = new Date();
    else fullTime = new Date(fullTime);

    var day = String(fullTime.getDate()).padStart(2, '0');
    var month = String(fullTime.getMonth() + 1).padStart(2, '0'); //January is 0!
    var year = fullTime.getFullYear();
    return (day + '/' + month + '/' + year);

}

export function getTimeDisplay(time) {

    var hours = time.getHours();
    var minutes = time.getMinutes();

    if (hours < 10)
        hours = '0' + hours;

    if (minutes < 10)
        minutes = '0' + minutes;

    return hours + ":" + minutes;

}

export const storeData = async (key, data) => {

    return await AsyncStorage.setItem(key, data);

};

export const getData = async (key) => {

    return await AsyncStorage.getItem(key);

};

export const storeDataObject = async (key, data) => {

    const jsonValue = JSON.stringify(data);
    return await AsyncStorage.setItem(key, jsonValue);

};


export const getDataObject = async (key) => {

    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;

};

export const loadChosenRingtone = async () => {

    var ringtoneFromData = await getDataObject('ringtone');
    return ringtoneFromData;

};

export const loadIcons = async () => {

    await Font.loadAsync(Entypo.font);
    await Font.loadAsync(AntDesign.font);
    await Font.loadAsync(Fontisto.font);
    await Font.loadAsync(MaterialCommunityIcons.font);
    await Font.loadAsync(MaterialIcons.font);
    await Font.loadAsync(FontAwesome.font);

};






