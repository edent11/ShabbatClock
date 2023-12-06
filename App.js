import { NavigationContainer } from '@react-navigation/native'
import { React } from 'react';
import { StatusBar, SafeAreaView, ScrollView, View } from 'react-native';
import Tabs from './components/Tabs';
import { Audio } from 'expo-av';
import { sound } from './assets/globals'

export default function App() {



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


        <Tabs />

      </NavigationContainer >


    </SafeAreaView >

  );
}







