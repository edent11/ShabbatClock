import { NavigationContainer } from '@react-navigation/native'
import { React, useState, useEffect, useCallback, useRef } from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';
import Tabs from './components/Tabs';
import * as SplashScreen from 'expo-splash-screen';
import { loadIcons, loadRingtones } from './assets/globals';
import { useFonts } from 'expo-font';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'MPLUSRounded1c_Medium': require('./assets/fonts/MPLUSRounded1c_Medium.ttf'),
    'SuezOne_Regular': require('./assets/fonts/SuezOne_Regular.ttf'),
    'Alef_Regular': require('./assets/fonts/Alef_Regular.ttf'),
    'Kanit_Medium': require('./assets/fonts/Kanit_Medium.ttf'),
    'Kanit_SemiBold': require('./assets/fonts/Kanit_SemiBold.ttf'),
    'Geneva01': require('./assets/fonts/Geneva01.otf'),
    'Alef_Bold': require('./assets/fonts/Alef_Bold.ttf')
  });

  useEffect(() => {
    async function prepare() {
      try {

        loadIcons();
        loadRingtones();
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (e) {
        console.warn(e);

      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {

    if (appIsReady && fontsLoaded) {

      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (


    // <CustomSplashScreen />

    <SafeAreaView className='flex-1' onLayout={onLayoutRootView}>

      <StatusBar backgroundColor="#3474eb" />


      < NavigationContainer className='grow-1'>

        <Tabs />

      </NavigationContainer >

    </SafeAreaView >

  );
}









