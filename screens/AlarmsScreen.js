
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
    const [alarms, setAlarms] = useState([{ id: 0, enabledColors: 0, notificationId: { red: null, blue: null, green: null }, hours: "10", minutes: "30", isToggleEnabled: false, date: { red: null, blue: null, green: null } }]);
    const [isAddAlarm, setTimePickerAddAlarm] = useState(false);
    const [isEditAlarm, setTimePickerEditAlarm] = useState(false);


    async function setAlarmColor(alarmID, color) {


        newAlarms = await Promise.all(alarms.map(async (alarm, index) => {

            if (index == alarmID) {

                if (alarm.notificationId[color] == null) {
                    alarm.notificationId[color] = 'on';
                    alarm.enabledColors++;

                    console.log("operation: add color \n");

                    if (alarm.isToggleEnabled) {

                        alarmDay = addDaysForAlarm(color);

                        await scheduleNewAlarm(alarm.hours, alarm.minutes, alarmDay)
                            .then((res) => {
                                alarm.notificationId[color] = res[0];
                                console.log(`color: (${color}) successfully scheduled alarm: (${res[0]}) Date: (${res[1]}) Time: (${res[2]})`);
                                alarm.date[color] = res[1];

                            });
                    }
                }

                else if (alarm.notificationId[color] == 'on') {
                    alarm.notificationId[color] = null;
                    alarm.enabledColors--;

                }
                else {
                    console.log("operation: cancel color \n");
                    await cancelScheduledAlarm(alarm, color, isUpdateTime = false)
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));;

                }

                if (alarm.enabledColors == 0)
                    alarm.isToggleEnabled = false;
            }
            return alarm;

        }));

        setAlarms(newAlarms);
    }


    async function scheduleNewAlarm(hours, minutes, alarmDay) {

        return new Promise((resolve, reject) => {
            alarmsManager.scheduleAlarm(hours, minutes, alarmDay)
                .then((res) => {
                    resolve(res);
                })
                .catch(error => reject('error while scheduling alarm: ' + error));

        });
    }




    async function cancelScheduledAlarm(alarm, colorToDelete, isUpdateTime) {

        var promises = [];
        var date;
        var noteId;

        if (colorToDelete != null) {


            promises.push(new Promise(async (resolve, reject) => {
                await alarmsManager.cancelAlarm(alarm.notificationId[colorToDelete])
                    .then(() => {

                        date = alarm.date[colorToDelete];
                        noteId = alarm.notificationId[colorToDelete];
                        alarm.enabledColors--;
                        alarm.notificationId[colorToDelete] = isUpdateTime ? noteId ? 'on' : null : null;
                        alarm.date[colorToDelete] = null;
                        resolve(`color: (${colorToDelete}) successfully cancelled alarm: (${noteId}) Date: (${date}) Time: (${alarm.hours}:${alarm.minutes})`);


                    })

                    .catch(error => { console.log('error while cancelling alarm: ' + error); reject(); });
            }))
        } else {



            for (const color in alarm.notificationId) {

                if (alarm.notificationId[color] != null) {

                    promises.push(new Promise(async (resolve, reject) => {
                        noteId = alarm.notificationId[color];

                        await alarmsManager.cancelAlarm(noteId)
                            .then(() => {

                                date = alarm.date[color];


                                alarm.notificationId[color] = isUpdateTime ? noteId ? 'on' : null : null;
                                alarm.date[color] = null;
                                alarm.enabledColors--;
                                resolve(`color: (${color}) successfully cancelled alarm: (${noteId}) Date: (${date}) Time: (${alarm.hours}:${alarm.minutes})\n`);




                            })
                            .catch(error => { console.log('error while cancelling alarm: ' + error); reject(); });
                    }))



                }

            }
        }
        return Promise.all(promises);
    }

    async function addAlarm(hours, minutes) {

        console.log("operation: add alarm\n");

        setTimePickerAddAlarm(false);

        scheduleNewAlarm(hours, minutes, alarmDay = 0).then((res) => {
            setAlarms(prevAlarms => {
                return [...prevAlarms, {

                    notificationId: { red: res[0], blue: null, green: null },
                    date: { red: res[1], blue: null, green: null },
                    enabledColors: 1,
                    hours: hours,
                    minutes: minutes,
                    isToggleEnabled: true
                }];
            });
            console.log(`color: (red) successfully scheduled alarm: (${res[0]}) Date: (${res[1]}) Time: (${res[2]})`);


        }).catch((error) => console.log(error));

    }

    async function updateAlarmTime(alarm, hours, minutes) {

        return new Promise((resolve, reject) => {
            alarm.hours = hours;
            alarm.minutes = minutes;
            resolve();
        });
    }



    async function editAlarmTime(hours, minutes) {

        setTimePickerEditAlarm(false);
        var newAlarmsArray = [];


        newAlarmsArray = await (Promise.all(alarms.map(async (alarm, index) => {

            if (index == alarmIdEdit) {

                await cancelScheduledAlarm(alarm, null, isUpdateTime = true)
                    .then(async (res) => {

                        console.log(res);
                        alarm.hours = hours;
                        alarm.minutes = minutes;


                        await scheduleColors(alarm).then(res => {
                            console.log(res);
                        })


                    }).catch(error => reject(error))
            }
            return alarm;

        }))).then((newAlarmsArray) => setAlarms(newAlarmsArray));

    }


    async function scheduleColors(alarm) {

        var textResolve = [];
        var textReject = [];

        return new Promise(async (resolve, reject) => {

            for (let color in alarm.notificationId) {

                if (alarm.notificationId[color] != null) {

                    alarmDay = await addDaysForAlarm(color);

                    checkScheduled = await scheduleNewAlarm(alarm.hours, alarm.minutes, alarmDay)
                        .then(res => {
                            textResolve.push(`color: (${color}) successfully scheduled alarm: (${res[0]}) Date: (${res[1]}) Time: (${res[2]})\n`);
                            alarm.notificationId[color] = res[0];
                            alarm.date[color] = res[1];

                        })
                        .catch(error => textReject.push(`unable to schedule alarm in color ${color} ` + error));
                }
            }


            if (textResolve)
                resolve(textResolve);
            else reject(textReject);

        });
    }


    function getLastAlarm(alarm) {

        if (alarm.date['green'] != null)
            return alarm.date['green'];

        if (alarm.date['blue'] != null)
            return alarm.date['blue'];

        if (alarm.date['red'] != null)
            return alarm.date['red'];

    }



    async function editAlarmToggle(alarmID) {



        newAlarmsArray = (Promise.all(alarms.map(async (alarm, index) => {
            if (index == alarmID) {

                if (!alarm.isToggleEnabled) {

                    if (alarm.enabledColors == 0) {
                        alarm.notificationId.red = 'on';
                        alarm.enabledColors++;
                    }
                    await scheduleColors(alarm)
                        .then(res => {
                            console.log(res);
                            alarm.isToggleEnabled = true;
                        })
                        .catch(error => console.log(error));


                } else {
                    if (alarm.enabledColors > 0) {

                        await cancelScheduledAlarm(alarm, null, isUpdateTime = false)
                            .then(() => {
                                alarm.isToggleEnabled = false;

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
                return index != alarmId;

            })
        });

        const cancelAlarm = new Promise((resolve, reject) => {

            if (alarmToDelete.notificationId != null) {

                cancelScheduledAlarm(alarmToDelete, null, isUpdateTime = false)
                    .then((res) => {
                        console.log("operation: delete \n" + res);
                    })
                    .catch(error => reject(error))
            }
            else resolve("No alarm to delete");
        });

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
    // { console.log(alarms); }


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

