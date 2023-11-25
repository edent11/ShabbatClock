
import { React, useState } from 'react'
import AlarmClock from '../components/AlarmClock'
import TimePicker from '../components/TimePicker'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from "nativewind";
import TopBar from '../components/TopBar'
import { useFonts } from 'expo-font';
import "../languages/i18n";
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function AlarmsScreen() {
    const { t } = useTranslation();
    const [alarms, setAlarms] = useState([{ time: "10:30", isToggleEnabled: false }]);
    const [isTimePickerActive, setTimePicker] = useState(false);


    const addAlarm = (newTime) => {
        setAlarms(prevAlarms => {
            return [...prevAlarms, { time: newTime, isToggleEnabled: true }];
        });


        setTimePicker(false);
    }

    const editAlarmTime = (alarmID, newTime) => {

        const newAlarmsArray = alarms.map((alarm, index) => {
            if (index === alarmID) {
                alarm.time = newTime;
                alarm.isToggleEnabled = true;

            }
            return alarm;
        });

        setAlarms(newAlarmsArray);
    }

    const editAlarmToggle = (alarmID, newTime) => {

        const newAlarmsArray = alarms.map((alarm, index) => {
            if (index === alarmID) {
                alarm.isToggleEnabled = !alarm.isToggleEnabled;
            }

            return alarm;
        });

        setAlarms(newAlarmsArray);
    }

    const deleteAlarm = (alarmId) => {

        setAlarms(prevAlarms => {
            return prevAlarms.filter((alarm, index) => {
                return index !== alarmId;

            })
        });


        setTimePicker(false);
    }


    return (

        <View className={"pt-10 dark:bg-black h-11/12"} >

            {isTimePickerActive &&
                <TimePicker
                    active={isTimePickerActive}
                    onSelect={(newTime) => { addAlarm(newTime); }}
                    onCancel={() => setTimePicker(false)}
                    label='add alarm' />}

            <TopBar tabName={t('alarms_screen')} />

            <View className='h-5/7'>


                < ScrollView className="pt-5 mx-1" >

                    <View name="AlarmsContainer" className="flex flex-1 items-center bg-slate-600 h-full">

                        {
                            alarms
                                .sort((a, b) => a.time > b.time ? 1 : -1)
                                ?.map((alarm, index) => {

                                    return (
                                        <AlarmClock
                                            key={index}
                                            id={index}
                                            time={alarm.time}
                                            toggle={alarm.isToggleEnabled}
                                            editTime={(alarmID, newTime) => editAlarmTime(alarmID, newTime)}
                                            editToggle={(alarmID, newTime) => editAlarmToggle(alarmID, newTime)}
                                        />


                                    )
                                })}


                    </View>


                    <View>
                        {/* <Text>{t('dummy_text')}</Text>
                        <Text>{t("dummy_text")}</Text> */}

                    </View>

                    {/* <TouchableOpacity className='bg-blue-700 w-5 h-5 '>
                    <Text>+</Text>
                </TouchableOpacity> */}


                </ScrollView >


            </View>

            <View name='plus button' className='absolute bottom-7 inset-x-0 w-full flex items-center'>

                <TouchableOpacity
                    onPress={() => { setTimePicker(true) }}>
                    <MaterialCommunityIcons name="plus-circle" size={60} color="#3474eb" />
                </TouchableOpacity>
            </View>





        </View>
    )
}

// const styles = StyleSheet.create({

//     safeContainer: {

//         backgroundColor: 'red',
//         display: 'flex',
//         height: '100%',
//         paddingTop: Platform.OS === 'android' ? 25 : 0
//     },

//     alarmsContainer: {
//         flex: 2,
//         display: 'flex',
//         flexDirection: 'column',

//         justifyContent: 'center',
//         alignItems: 'center',


//     },



// });

