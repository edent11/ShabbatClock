import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react';

import AlarmClock from './components/AlarmClock'
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';//add this line
import Tabs from './components/Tabs';




import "./languages/i18n";




export default function App() {

  return (

    < NavigationContainer >

      <Tabs />
    </NavigationContainer >

  );
}





// const styles = StyleSheet.create({



//   safeContainer: {


//     backgroundColor: 'red',
//     display: 'flex',
//     height: '100%',
//     paddingTop: Platform.OS === 'android' ? 25 : 0
//   },

//   alarmsContainer: {
//     flex: 2,
//     display: 'flex',
//     flexDirection: 'column',

//     justifyContent: 'center',
//     alignItems: 'center',


//   },

//   scrollView: {
//     backgroundColor: '#E8EAED',
//     marginHorizontal: 4,
//     paddingTop: 3
//   },

//   alarmClock: {



//   },


// });



