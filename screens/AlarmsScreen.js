
import { React, useState } from 'react'
import AlarmClock from '../components/AlarmClock'
import TimePicker from '../components/TimePicker'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Pressable, Vibration } from 'react-native';
import { useTranslation } from 'react-i18next';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AlarmNotification from "../components/AlarmNotification";
import { enableExpoCliLogging } from 'expo/build/logs/Logs';


let alarmIdEdit = '';

export default function AlarmsScreen() {

    const alarmsManager = new AlarmNotification();
    const { t } = useTranslation();
    const [alarms, setAlarms] = useState([{ id: 0, enabledColors: 0, notificationId: { red: null, blue: null, green: null }, hours: "10", minutes: "30", isToggleEnabled: false }]);
    const [isAddAlarm, setTimePickerAddAlarm] = useState(false);
    const [isEditAlarm, setTimePickerEditAlarm] = useState(false);


    async function setAlarmColor(alarmID, color) {


        newAlarms = await Promise.all(alarms.map(async (alarm, index) => {

            if (index == alarmID) {

                if (alarm.notificationId[color] == null) {
                    alarm.notificationId[color] = 'on';
                    alarm.enabledColors++;

                    if (alarm.isToggleEnabled) {
                        await scheduleNewAlarm(alarm.hours, alarm.minutes)
                            .then((res) => {
                                alarm.notificationId[color] = res[0];
                                console.log(`color:(${color}) successfully scheduled alarm: (${res[1]}) Date: (${res[1]})`);

                            });
                    }
                }

                else if (alarm.notificationId[color] == 'on') {
                    alarm.notificationId[color] = null;
                    alarm.enabledColors--;

                }
                else {
                    await cancelScheduledAlarm(alarm.notificationId, color, alarm.hours, alarm.minutes)
                        .then((res) => {
                            console.log(res);
                            alarm.notificationId[color] = null;
                            alarm.enabledColors--;


                        });
                }

                if (alarm.enabledColors == 0)
                    alarm.isToggleEnabled = false;
            }
            return alarm;

        }));

        setAlarms(newAlarms);
    }


    async function scheduleNewAlarm(hours, minutes) {

        return new Promise((resolve, reject) => {
            alarmsManager.scheduleAlarm(hours, minutes)
                .then((res) => {
                    resolve(res);
                })
                .catch(error => reject('error while scheduling alarm: ' + error));

        });
    }

    async function cancelScheduledAlarm(notificationId, colorToDelete, hours, minutes) {



        return new Promise(async (resolve, reject) => {

            if (colorToDelete != null) {
                await alarmsManager.cancelAlarm(notificationId[colorToDelete]).
                    then(() => {
                        console.log(`color: (${colorToDelete}) successfully cancelled alarm: (${notificationId[colorToDelete]}) time: (${hours}:${minutes})`);
                    })
                    .catch(error => console.log('error while cancelling alarm: ' + error));
            } else {

                for (const color in notificationId) {
                    (async () => {
                        if (notificationId[color] != null) {
                            var alarmColor = notificationId[color];
                            await alarmsManager.cancelAlarm(alarmColor)
                                .then(() => {
                                    resolve('message');
                                    console.log(`color: (${color}) successfully cancelled alarm: (${alarmColor}) time: ${hours}:${minutes}`);

                                })
                                .catch(error => console.log('error while cancelling alarm: ' + error));
                        }
                    })()
                }

            }

            resolve();
        })
    }

    async function addAlarm(hours, minutes) {

        setTimePickerAddAlarm(false);

        scheduleNewAlarm(hours, minutes).then((res) => {
            setAlarms(prevAlarms => {
                return [...prevAlarms, {
                    notificationId: { red: res[0], blue: null, green: null },
                    enabledColors: 1,
                    hours: hours,
                    minutes: minutes,
                    isToggleEnabled: true
                }];
            });
            console.log(`color: (red) successfully scheduled alarm: (${res[0]}) Time: (${res[1]})`);
        }).catch((error) => console.log(error));

    }



    async function editAlarmTime(hours, minutes) {

        setTimePickerEditAlarm(false);

        var newAlarmsArray = [];

        const proms = new Promise((resolve, reject) => {
            newAlarmsArray = alarms.map((alarm, index) => {
                if (index == alarmIdEdit) {
                    alarm.hours = hours;
                    alarm.minutes = minutes;
                    cancelScheduledAlarm(alarm.notificationId, null, hours, minutes).then(() => {
                        alarm.notificationId.red = alarm.notificationId.red ? 'on' : null;
                        alarm.notificationId.blue = alarm.notificationId.blue ? 'on' : null;
                        alarm.notificationId.green = alarm.notificationId.green ? 'on' : null;

                    })
                        .catch(error => console.log(error));
                }
                scheduleColors(alarm).then(res => {
                    resolve(res);
                })
                    .catch(error => reject(error));

                return alarm;
            });
        });

        proms.then((res) => {
            setAlarms(newAlarmsArray);
            console.log(res);
        }).catch(error => console.log(error));
    }


    async function scheduleColors(alarm) {

        var textResolve = [];
        var textReject = [];

        return new Promise(async (resolve, reject) => {

            for (let color in alarm.notificationId) {

                if (alarm.notificationId[color] != null) {

                    checkScheduled = await scheduleNewAlarm(alarm.hours, alarm.minutes)
                        .then(res => {
                            textResolve.push(`color: ${color} successfully scheduled alarm: ${res[0]} Date: ${res[1]}\n`);
                            alarm.notificationId[color] = res;

                        })
                        .catch(error => textReject.push(`unable to schedule alarm in color ${color} ` + error));
                }
            }


            if (textResolve)
                resolve(textResolve);
            else reject(textReject);

        });
    }



    async function editAlarmToggle(alarmID) {



        newAlarmsArray = (Promise.all(alarms.map(async alarm => {
            if (alarm.id == alarmID) {

                if (!alarm.isToggleEnabled) {
                    console.log(alarm.enabledColors);
                    if (alarm.enabledColors == 0) {
                        alarm.notificationId.red = 'on';
                        alarm.enabledColors++;
                    }
                    await scheduleColors(alarm).
                        then(res => {
                            console.log(res);
                            alarm.isToggleEnabled = true;
                        })
                        .catch(error => console.log(error));


                } else {
                    if (alarm.enabledColors > 0) {

                        await cancelScheduledAlarm(alarm.notificationId, null, alarm.hours, alarm.minutes)
                            .then(res => {

                                if (alarm.notificationId.red != null)
                                    alarm.enabledColors--;

                                if (alarm.notificationId.blue != null)
                                    alarm.enabledColors--;

                                if (alarm.notificationId.green != null)
                                    alarm.enabledColors--;

                                alarm.isToggleEnabled = false;
                                alarm.notificationId.red = null;
                                alarm.notificationId.blue = null;
                                alarm.notificationId.green = null;
                                console.log(res);
                            })
                            .catch(error => console.log(error));
                    }
                }
            }
            return alarm;

        }))).then((newAlarmsArray) => setAlarms(newAlarmsArray))


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
                cancelScheduledAlarm(alarmToDelete.notificationId, null, alarmToDelete.hours, alarmToDelete.minutes)
                    .then(res => resolve(res))
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

    const addDaysForAlarm = (color) => {

        switch (color) {

            case 'red': return 0;
            case 'blue': return 1;
            case 'green': return 2;

        }
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
                                            id={alarm.id}
                                            // disabledToggle={alarm.enabledColors == 0 ? true : false}
                                            time={fixTimeDisplay(alarm.hours, alarm.minutes)}
                                            isRedDaySelected={alarm.notificationId.red ? true : false}
                                            isBlueDaySelected={alarm.notificationId.blue ? true : false}
                                            isGreenDaySelected={alarm.notificationId.green ? true : false}
                                            toggle={alarm.isToggleEnabled}
                                            onEditToggle={(alarmID) => editAlarmToggle(alarmID)}
                                            onEditTime={(alarmID) => {
                                                alarmIdEdit = alarmID;
                                                setTimePickerEditAlarm(true);
                                            }}
                                            onRemove={(alarmID) => deleteAlarm(alarmID)}
                                            onColorSelection={(alarmID, color) => setAlarmColor(alarmID, color)}

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

