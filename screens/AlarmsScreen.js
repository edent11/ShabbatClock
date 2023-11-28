
import { React, useState } from 'react'
import AlarmClock from '../components/AlarmClock'
import TimePicker from '../components/TimePicker'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Pressable, Vibration } from 'react-native';
import { useTranslation } from 'react-i18next';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { MaterialCommunityIcons } from '@expo/vector-icons';

let alarmIdEdit = '';

export default function AlarmsScreen() {

    const { t } = useTranslation();
    const [alarms, setAlarms] = useState([{ hours: "10", minutes: "10", isToggleEnabled: false }]);
    const [isAddAlarm, setTimePickerAddAlarm] = useState(false);
    const [isEditAlarm, setTimePickerEditAlarm] = useState(false);




    const addAlarm = (hours, minutes) => {

        setTimePickerAddAlarm(false);

        setAlarms(prevAlarms => {
            return [...prevAlarms, { hours: hours, minutes: minutes, isToggleEnabled: true }];
        });


        setTimePicker(false);
    }

    const editAlarmTime = (hours, minutes) => {

        setTimePickerEditAlarm(false);

        console.log(alarmIdEdit);

        const newAlarmsArray = alarms.map((alarm, index) => {
            if (index === alarmIdEdit) {
                alarm.hours = hours;
                alarm.minutes = minutes;
                alarm.isToggleEnabled = true;

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

    const fixTimeDisplay = (hours, minutes) => {

        if (hours < 10)
            hours = '0' + hours;

        if (minutes < 10)
            minutes = '0' + minutes;

        return hours + ":" + minutes;

    }



    return (


        < View className={"pt-10 dark:bg-black h-11/12"} >

            {/* {isAddAlarm || isEditAlarm && */}
            < TimePicker
                active={isAddAlarm || isEditAlarm}
                onSelect={(hours, minutes) => { isAddAlarm ? addAlarm(hours, minutes) : editAlarmTime(hours, minutes) }}
                // onSelect={(newTime) => { isAddAlarm ? addAlarm(newTime) : editAlarmTime(alarmIdChange, newTime) }}
                onCancel={() => { setTimePickerEditAlarm(false); setTimePickerAddAlarm(false); }}
                label='add alarm' />


            <TopBar tabName={t('alarms_screen')} />

            <View className='h-5/7'>


                < ScrollView className="pt-5 mx-1" >

                    <View name="AlarmsContainer" className="flex flex-1 items-center bg-slate-600 h-full">

                        {
                            alarms
                                .sort((a, b) => {
                                    if (a.hours > b.hours)
                                        return 1;
                                    else if (a.hours === b.hours) {
                                        if (a.minutes > b.minutes)
                                            return 1;
                                        else return -1;
                                    } else return -1;

                                })
                                ?.map((alarm, index) => {

                                    return (

                                        <AlarmClock
                                            key={index}
                                            id={index}
                                            time={fixTimeDisplay(alarm.hours, alarm.minutes)}
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

