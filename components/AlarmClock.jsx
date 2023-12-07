import React, { useState } from 'react'
import { View, Text, Switch, Pressable, Vibration } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useFonts from '../assets/hooks/useFonts';
import { useColorScheme } from "nativewind";



const AlarmClock = (props) => {


  const [IsReady, SetIsReady] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };

  const isDarkMode = useColorScheme().colorScheme === 'dark';




  return (


    <View name="alarmBox" className={" bg-gray-400 dark:bg-black flex flex-row items-center justify-between w-20/22 h-28 p-3.5 border-b-2 border-blue-300  rounded"}>

      <View name='remove' className='absolute top-0 bg-yellow-400 rounded-2xl'>
        <Pressable
          onLongPress={() => {
            Vibration.vibrate(200);
            props.onRemove(props.id);
          }}
        >

          <MaterialCommunityIcons name="delete-empty" size={24} color="black" />
        </Pressable>

      </View>

      <View name='time' className="flex flex-1  flex-row items-center h-full">
        <Pressable onPress={() => props.onEditTime(props.id)} >
          <View>
            <Text className="text-3xl text-white"
              adjustsFontSizeToFit={true}
              numberOfLines={1}>
              {props.time} </Text>
          </View>

        </Pressable>
      </View>

      <View name='buttons' className="flex flex-initial flex-row items-center justify-center ">
        <Pressable onPress={() => props.onColorSelection(props.id, 'red')}>
          <View className={`bg-red-400 ${props.isRedDaySelected ? 'opacity-100' : 'opacity-30'}
                             h-8 w-8 rounded-full mx-3 flex items-center justify-center`}>
            <Text className='text-white font-semibold'>1</Text>
          </View>

        </Pressable>

        <Pressable onPress={() => props.onColorSelection(props.id, 'blue')}>
          < View className={
            `bg-blue-400 ${props.isBlueDaySelected ? 'opacity-100' : 'opacity-30'}
                            h-8 w-8 rounded-full mx-3 flex items-center justify-center`}>
            <Text className='text-white font-semibold'>2</Text>
          </View>

        </Pressable>

        <Pressable onPress={() => props.onColorSelection(props.id, 'green')}>
          <View className={`bg-green-400 ${props.isGreenDaySelected ? ' opacity-100' : 'opacity-30'}
                           h-8 w-8 rounded-full mx-3 flex items-center justify-center`}>
            <Text className='text-white font-semibold'>3</Text>
          </View>

        </Pressable>
      </View>



      <View name='switchView' className="flex-row items-center justify-end">
        <Switch
          trackColor={isDarkMode ? { true: '#4CD964', false: 'gray' } : { true: '#4CD964', false: 'white' }}
          thumbColor='white'
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            props.onEditToggle(props.id);
            Vibration.vibrate(100);
          }}
          value={props.toggle}
          disabled={props.disabledToggle}
        />

      </View>
    </View >


  )
}
export default AlarmClock