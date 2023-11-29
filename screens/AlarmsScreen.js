
import { React, useState } from 'react'
import AlarmClock from '../components/AlarmClock'
import TimePicker from '../components/TimePicker'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Pressable, Vibration } from 'react-native';
import { useTranslation } from 'react-i18next';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AlarmNotification from "../components/AlarmNotification";


let alarmIdEdit = '';

export default function AlarmsScreen() {

    const alarmsManager = new AlarmNotification();
    const { t } = useTranslation();
    const [alarms, setAlarms] = useState([{ notificationId: null, hours: "10", minutes: "30", isToggleEnabled: false }]);
    const [isAddAlarm, setTimePickerAddAlarm] = useState(false);
    const [isEditAlarm, setTimePickerEditAlarm] = useState(false);



    async function addAlarm(hours, minutes) {

        var notificationId = '';
        setTimePickerAddAlarm(false);
        const proms = new Promise((resolve, reject) => {
            alarmsManager.scheduleAlarm(hours, minutes)
                .then((res) => {
                    notificationId = res;
                    resolve("successfully scheduled alarm: " + notificationId + " Time: " + hours + " : " + minutes);
                })
                .catch(error => reject('error while adding new alarm: ' + error));

        });

        proms.then((res) => {
            setAlarms(prevAlarms => {
                return [...prevAlarms, { notificationId: notificationId, hours: hours, minutes: minutes, isToggleEnabled: true }];
            });
            console.log(res);
        });





    }



    function editAlarmTime(hours, minutes) {

        setTimePickerEditAlarm(false);

        var newAlarmsArray = [];

        const proms = new Promise((resolve, reject) => {
            newAlarmsArray = alarms.map((alarm, index) => {
                if (index == alarmIdEdit) {

                    if (alarm.notificationId != null) {
                        alarmsManager.cancelAlarm(alarm.notificationId).then(() => resolve("successfully cancelled alarm: " + alarm.notificationId))
                            .catch(error => reject('error while scheduling alarm: ' + error));

                    }
                    alarmsManager.scheduleAlarm(hours, minutes)
                        .then((notificationId) => {
                            alarm.notificationId = notificationId;
                            alarm.hours = hours;
                            alarm.minutes = minutes;
                            alarm.isToggleEnabled = true;
                            resolve("successfully scheduled alarm: " + notificationId + " Time: " + hours + " : " + minutes);
                        })
                        .catch(error => reject('error while scheduling alarm: ' + error));



                }
                return alarm;
            });
        });

        proms.then((res) => {
            setAlarms(newAlarmsArray);
            console.log(res);
        });
    }




    function editAlarmToggle(alarmID) {

        var newAlarmsArray = [];
        const proms = new Promise((resolve, reject) => {
            newAlarmsArray = alarms.map((alarm, index) => {

                if (index == alarmID) {

                    if (!alarm.isToggleEnabled) {

                        alarmsManager.scheduleAlarm(alarm.hours, alarm.minutes)
                            .then((notificationId) => {
                                alarm.notificationId = notificationId;
                                alarm.isToggleEnabled = true;
                                resolve("successfully scheduled alarm: " + notificationId + " Time: " + alarm.hours + " : " + alarm.minutes);

                            })
                            .catch(error => reject('error while scheduling alarm: ' + error));


                    } else {
                        if (alarm.notificationId !== null)
                            alarmsManager.cancelAlarm(alarm.notificationId).then(() => {
                                alarm.isToggleEnabled = false;
                                resolve("successfully cancelled alarm: " + alarm.notificationId);
                                alarm.notificationId = null;

                            }).catch(error => reject('error while canceling alarm: ' + error));
                    }
                }
                return alarm;
            });
        });
        proms.then((res) => {
            setAlarms(newAlarmsArray);
            console.log(res);
        });

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

            < TimePicker
                active={isAddAlarm || isEditAlarm}
                onSelect={(hours, minutes) => { isAddAlarm ? addAlarm(hours, minutes) : editAlarmTime(hours, minutes) }}
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

