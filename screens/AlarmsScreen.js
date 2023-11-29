
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


    async function scheduleNewAlarm(hours, minutes, alarm) {

        return new Promise((resolve, reject) => {
            alarmsManager.scheduleAlarm(hours, minutes)
                .then((notificationId) => {
                    resolve(notificationId);
                })
                .catch(error => reject('error while scheduling alarm: ' + error));

        });
    }

    async function cancelScheduledAlarm(notificationId) {

        return new Promise((resolve, reject) => {
            alarmsManager.cancelAlarm(notificationId).
                then(() => {
                    resolve("successfully cancelled alarm: " + notificationId);

                })
                .catch(error => reject('error while cancelling alarm: ' + error));
        });

    }

    async function addAlarm(hours, minutes) {

        setTimePickerAddAlarm(false);

        scheduleNewAlarm(hours, minutes, null).then((res) => {
            setAlarms(prevAlarms => {
                return [...prevAlarms, { notificationId: res, hours: hours, minutes: minutes, isToggleEnabled: true }];
            });
            console.log(`successfully scheduled alarm: ${res} Time: ${hours}:${minutes}`);
        }).catch((error) => console.log(error));

    }



    async function editAlarmTime(hours, minutes) {

        setTimePickerEditAlarm(false);

        var newAlarmsArray = [];

        const proms = new Promise((resolve, reject) => {
            newAlarmsArray = alarms.map((alarm, index) => {
                if (index == alarmIdEdit) {

                    if (alarm.notificationId != null) {
                        cancelScheduledAlarm(alarm.notificationId).then(res => {
                            scheduleNewAlarm(hours, minutes, alarm).
                                then(res => {

                                    alarm.notificationId = res;
                                    alarm.hours = hours;
                                    alarm.minutes = minutes;
                                    alarm.isToggleEnabled = true;
                                    resolve(`successfully scheduled alarm: ${res} Time: ${hours}:${minutes}`);

                                })
                                .catch(error => reject(error));
                            resolve(res);
                        })
                            .catch(error => reject(error));

                    }
                    else {

                        scheduleNewAlarm(hours, minutes, alarm).
                            then(res => {

                                alarm.notificationId = res;
                                alarm.hours = hours;
                                alarm.minutes = minutes;
                                alarm.isToggleEnabled = true;
                                resolve(`successfully scheduled alarm: ${res} Time: ${hours}:${minutes}`);

                            })
                            .catch(error => reject(error));
                    }

                }
                return alarm;
            });
        });

        proms.then((res) => {
            setAlarms(newAlarmsArray);
            console.log(res);
        }).catch(error => console.log(error));
    }




    async function editAlarmToggle(alarmID) {

        var newAlarmsArray = [];
        const proms = new Promise((resolve, reject) => {
            newAlarmsArray = alarms.map((alarm, index) => {

                if (index == alarmID) {

                    if (!alarm.isToggleEnabled) {

                        scheduleNewAlarm(alarm.hours, alarm.minutes, alarm).
                            then(res => {
                                resolve(`successfully scheduled alarm: ${res} Time: ${alarm.hours}:${alarm.minutes}`);
                                alarm.isToggleEnabled = true;
                                alarm.notificationId = res;
                            })
                            .catch(error => reject(error));


                    } else {
                        if (alarm.notificationId != null)
                            cancelScheduledAlarm(alarm.notificationId).
                                then(res => {
                                    resolve(res);
                                    alarm.isToggleEnabled = false;
                                    alarm.notificationId = null;
                                })
                                .catch(error => reject(error));
                    }
                }
                return alarm;
            });
        });

        proms.then((res) => {
            setAlarms(newAlarmsArray);
            console.log(res);
        }).catch(error => console.log(error));

    }



    const deleteAlarm = (alarmId) => {

        alarmToDelete = {};
        setAlarms(prevAlarms => {
            return prevAlarms.filter((alarm, index) => {
                alarmToDelete = alarm;
                return index !== alarmId;

            })
        });

        console.log(alarmToDelete);

        const proms = new Promise((resolve, reject) => {
            if (alarmToDelete.notificationId != null) {
                cancelScheduledAlarm(alarmToDelete.notificationId).
                    then(res => resolve(res))
                    .catch(error => reject(error))
            }
            else resolve("No alarm to delete");
        });

        proms.then((res) => {
            console.log(res);
        }).catch(error => console.log(error));
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

