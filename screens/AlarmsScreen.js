
import { React, useState } from 'react'
import AlarmClock from '../components/AlarmClock'
import TimePicker from '../components/TimePicker'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Pressable, Vibration } from 'react-native';
import { useTranslation } from 'react-i18next';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { MaterialCommunityIcons } from '@expo/vector-icons';

var alarmIdEdit = '';

export default function AlarmsScreen() {

    const { t } = useTranslation();
    const [alarms, setAlarms] = useState([{ time: "10:30", isToggleEnabled: false }]);
    const [isAddAlarm, setTimePickerAddAlarm] = useState(false);
    const [isEditAlarm, setTimePickerEditAlarm] = useState(false);




    const addAlarm = (newTime) => {

        setTimePickerAddAlarm(false);

        setAlarms(prevAlarms => {
            return [...prevAlarms, { time: newTime, isToggleEnabled: true }];
        });


        setTimePicker(false);
    }

    const editAlarmTime = (time) => {

        setTimePickerEditAlarm(false);

        console.log(alarmIdEdit);

        const newAlarmsArray = alarms.map((alarm, index) => {
            if (index === alarmIdEdit) {
                alarm.time = time;

            }
            return alarm;
        });

        setAlarms(newAlarmsArray);
    }

    const editAlarmToggle = (alarmID) => {

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
    }

    { console.log(alarms) }

    return (


        < View className={"pt-10 dark:bg-black h-11/12"} >

            {/* {isAddAlarm || isEditAlarm && */}
            < TimePicker
                active={isAddAlarm || isEditAlarm}
                onSelect={(newTime) => { isAddAlarm ? addAlarm(newTime) : editAlarmTime(newTime) }}
                // onSelect={(newTime) => { isAddAlarm ? addAlarm(newTime) : editAlarmTime(alarmIdChange, newTime) }}
                onCancel={() => { setTimePickerEditAlarm(false); setTimePickerAddAlarm(false); }}
                label='add alarm' />


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
                                            onEditToggle={(alarmID) => editAlarmToggle(alarmID)}
                                            onEditTime={(alarmID) => {
                                                alarmIdEdit = alarmID;
                                                setTimePickerEditAlarm(true);
                                            }}
                                            onRemove={(alarmID) => deleteAlarm(alarmID)}

                                        />

                                    )
                                })}

                    </View>

                </ScrollView >

            </View>

            <View name='plus button' className='absolute bottom-7 inset-x-0 w-full flex items-center'>

                <TouchableOpacity
                    onPress={() => { Vibration.vibrate(100); setTimePickerAddAlarm(true); }}>
                    <MaterialCommunityIcons name="plus-circle" size={60} color="#3474eb" />
                </TouchableOpacity>
            </View>

        </View >
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

