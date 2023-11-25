import React, { useState } from 'react'
import { View, Text, Switch, Pressable, Alert, StyleSheet, Platform, Modal } from 'react-native'
import useFonts from '../assets/hooks/useFonts';
import TimePicker from '../components/TimePicker'
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";



const AlarmClock = (props) => {


  const [IsReady, SetIsReady] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };


  const [isOneDaySelected, setOneDay] = useState();
  const [isTwoDaySelected, setTwoDay] = useState(false);
  const [isThreeDaySelected, setThreeDay] = useState(false);
  const [isTimePickerActive, setTimePicker] = useState(false);



  return (


    <View name="alarmBox" className={"flex flex-row items-center justify-between w-20/22 h-28 p-3.5 border-b-4 border-blue-100 rounded "}>

      <TimePicker
        active={isTimePickerActive}
        onSelect={(newTime) => { setTimePicker(false); props.editTime(props.id, newTime); }}
        onCancel={() => setTimePicker(false)}
        label='edit alarm' />


      <View name='time' className="flex flex-1  flex-row items-center h-full">
        <Pressable onPress={() => setTimePicker(true)} >
          <View>
            <Text className="text-3xl text-white ">{props.time}</Text>
          </View>

        </Pressable>
      </View>

      <View name='buttons' className="flex flex-initial flex-row items-center justify-center ">
        <Pressable onPress={() => setOneDay(!isOneDaySelected)}>
          <View className={`bg-red-400 ${isOneDaySelected ? 'opacity-100' : 'opacity-30'}
                             h-8 w-8 rounded-full mx-3 flex items-center justify-center`}>
            <Text>1</Text>
          </View>

        </Pressable>

        <Pressable onPress={() => setTwoDay(!isTwoDaySelected)}>
          <View className={`bg-blue-400 ${isTwoDaySelected ? 'opacity-100' : 'opacity-30'}
                            h-8 w-8 rounded-full mx-3 flex items-center justify-center`}>
            <Text>2</Text>
          </View>

        </Pressable>

        <Pressable onPress={() => setThreeDay(!isThreeDaySelected)}>
          <View className={`bg-green-400 ${isThreeDaySelected ? ' opacity-100' : 'opacity-30'}
                           h-8 w-8 rounded-full mx-3 flex items-center justify-center`}>
            <Text>3</Text>
          </View>

        </Pressable>
      </View>



      <View name='switchView' className="flex-row items-center justify-end">
        <Switch
          trackColor={Platform.OS === 'android' ? { false: '#3e3e3e', true: '#4CD964' } : {}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => props.editToggle(props.id)}
          value={props.toggle}
        />

      </View>



    </View >


  )
}
export default AlarmClock