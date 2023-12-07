/*
    FileName: globals.jsx
    Role: global functions
*/

import { ToastAndroid } from 'react-native';
import AlarmNotification from "../components/AlarmNotification";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const value = await AsyncStorage.getItem(key);
    console.log(value)
    return value;

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

}


