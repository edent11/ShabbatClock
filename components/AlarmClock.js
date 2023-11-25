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

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(props.isSwitchEnabled);

  const toggleSwitch = () => setIsSwitchEnabled(previousState => !previousState);

  const [isOneDaySelected, setOneDay] = useState();
  const [isTwoDaySelected, setTwoDay] = useState(false);
  const [isThreeDaySelected, setThreeDay] = useState(false);
  const [isTimePickerActive, setTimePicker] = useState(false);
  const [time, setTime] = useState(props.hours + ":" + props.minutes);


  const setUserTime = () => {
    console.log(isTimePickerActive);
    setTimePicker(true);
  };

  const getUserTime = (hours, minutes) => {
    // console.log(hours, minutes);
    setTime(hours + ":" + minutes);
    setTimePicker(false);

  };



  return (


    <View name="alarmBox" className={"flex flex-row items-center justify-between w-20/22 h-28 p-3.5 border-b-4 border-blue-100 rounded "}>

      <TimePicker
        active={isTimePickerActive}
        onSelect={(hours, minutes) => { getUserTime(hours, minutes); }}
        onCancel={() => setTimePicker(false)}
        label='edit alarm' />


      <View name='time' className="flex flex-1  flex-row items-center h-full">
        <Pressable onPress={setUserTime} >
          <View>
            <Text className="text-3xl text-white ">{time}</Text>
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
          // style={styles.switch}
          trackColor={Platform.OS === 'android' ? { false: '#3e3e3e', true: '#4CD964' } : {}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isSwitchEnabled}
        />

      </View>



    </View >




  )
}

// const styles = StyleSheet.create({



//   alarmBox: {
//     marginTop: 10,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',

//     justifyContent: 'space-between',
//     backgroundColor: 'red',
//     width: '95%',
//     height: 100,
//     padding: 15,
//     borderRadius: 20,
//     borderBottomColor: 'rgba(255, 255, 255, 0.9)',
//     borderBottomWidth: 5



//   },

//   clockView: {


//     display: 'flex',
//     height: '100%',
//     flex: 2,
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: 'red',

//   },

//   swtichView: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },

//   // time: {
//   //   // fontFamily: 'MPLUSRounded1cMedium',
//   //   fontSize: 20,
//   //   paddingLeft: 10,
//   // },

//   // switch: {

//   //   // position: 'absolute',
//   //   // right: 0,
//   //   // fontFamily: 'MPLUSRounded1cMedium',



//   // }


// });

export default AlarmClock