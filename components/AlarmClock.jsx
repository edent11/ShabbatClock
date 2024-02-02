/*
  FileName: AlarmClock.jsx
  Role: Component, represents single alarm 
*/


import React, { useEffect, useState } from 'react'
import { View, Text, Switch, Pressable, Vibration, useWindowDimensions } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";


const AlarmClock = (props) => {

  // for dark-mode support
  const isDarkMode = useColorScheme().colorScheme === 'dark';
  const { fontScale } = useWindowDimensions();
  const [onColor, setOnColor] = useState(props.enabledColor);
  const [toggleState, setToggleState] = useState(props.isToggleEnabled);

  useEffect(() => {

    props.onColorSelection(props.id, onColor);


  }, [onColor]);



  return (

    <View name="alarmBox" className={` bg-gray-200 dark:bg-black flex flex-row items-center justify-between
     w-20/22 h-[15vh] p-1 border-b-2 border-blue-300 rounded`}>

      {/* remove button */}

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

      {/* time & date view */}

      <View name='time' className="flex flex-1 flex-col items-center justify-center mt-5 ">

        <View className="flex w-3/4 justify-center items-center">
          <Pressable onPress={() => props.onEditTime(props.id)} >
            {/* time view */}
            <View className="flex justify-center items-center ">
              <Text className="text-4xl text-gray-600 dark:text-white font-Geneva01"
                numberOfLines={1}>
                {props.time}
              </Text>


            </View>

            {/* date view */}
            <View className="flex justify-center items-center -mt-2">
              <Text className="  text-2xl  text-gray-600 font-Geneva01"
                adjustsFontSizeToFit={true}
                numberOfLines={1}>
                {props.date}
              </Text>

            </View>

          </Pressable>

        </View>

      </View>



      {/* three-buttons view */}

      <View name='buttons' className="flex flex-initial flex-row items-center justify-center ">

        {/* red button */}
        <Pressable onPress={() => setOnColor(1)}>
          <View className={`bg-red-400 ${onColor == 1 ? 'opacity-100' : 'opacity-30'}
                             h-8 w-8 rounded-full mx-3 flex items-center justify-center `}>
            <Text className={`text-white font-Alef_Bold text-xl text-center ${fontScale > 1 ? '-top-1' : {}}`}>1</Text>
          </View>

        </Pressable>

        {/* blue button */}
        <Pressable onPress={() => setOnColor(2)}>
          < View className={
            `bg-blue-400 ${onColor == 2 ? 'opacity-100' : 'opacity-30'}
                            h-8 w-8 rounded-full mx-3 flex items-center justify-center`}>
            <Text className={`text-white font-Alef_Bold text-xl text-center ${fontScale > 1 ? '-top-1' : {}}`}>2</Text>
          </View>

        </Pressable>

        {/* green button */}
        <Pressable onPress={() =>
          setOnColor(3)}>
          <View className={`bg-green-400 ${onColor == 3 ? ' opacity-100' : 'opacity-30'}
                           h-8 w-8 rounded-full mx-3 flex items-center justify-center`}>
            <Text className={`text-white font-Alef_Bold text-xl text-center ${fontScale > 1 ? '-top-1' : {}}`}>3</Text>
          </View>

        </Pressable>

      </View>


      {/* switch view */}
      <View name='switchView' className="flex-row items-center justify-end">
        <Switch
          trackColor={isDarkMode ? { true: '#4CD964', false: 'gray' } : { true: '#4CD964', false: 'white' }}
          thumbColor='white'
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            props.onToggleChange(props.id);
            Vibration.vibrate(100);
            setToggleState(!toggleState);
          }}
          value={toggleState}
          disabled={props.disabledToggle}
        />

      </View>


    </View >




  )
}
export default AlarmClock