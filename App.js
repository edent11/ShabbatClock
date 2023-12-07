import { NavigationContainer } from '@react-navigation/native'
import { React, useState } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import Tabs from './components/Tabs';
// import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

export default function App() {

  // const [appIsReady, setAppIsReady] = useState(false);

  return (

    <SafeAreaView className='flex-1'>

      <StatusBar
        backgroundColor="#3474eb"
      />

      < NavigationContainer className='grow-1'>

        <Tabs />

      </NavigationContainer >


    </SafeAreaView >

  );
}







