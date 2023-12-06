import { NavigationContainer } from '@react-navigation/native'
import { React, useRef, useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, ScrollView, View, AppState } from 'react-native';
import Tabs from './components/Tabs';
import { Audio } from 'expo-av';
import { sound } from './assets/globals'

export default function App() {

  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     )
  //       console.log('App has come to the foreground!');


  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);


  return (

    <SafeAreaView className='flex-1'>

      <StatusBar
        backgroundColor="#3474eb"
      />





      < NavigationContainer
        className='grow-1'>
        {/* // onStateChange={
          //   (state) => sound.un
          // }  */}


        <Tabs
        // appIsForeground={appState.current}
        />

      </NavigationContainer >


    </SafeAreaView >

  );
}







