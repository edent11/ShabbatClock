/*
    FileName: AlarmScreen.jsx
    Role: Responsible for scheduling alarms.
*/



import { React, useState, useEffect, useRef } from 'react'
import { View, ScrollView, TouchableOpacity, Vibration, AppState, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAlarmsManager, getDateDisplay, getTimeDisplay, storeData, storeDataObject, getDataObject, showToast } from "../assets/globals";
import AlarmClock from '../components/AlarmClock'
import TimePicker from '../components/TimePicker'
import TopBar from '../components/TopBar'
import "../languages/i18n";



export default function AlarmsScreen(props) {

    const { height } = useWindowDimensions();
    const [alarmIdEdit, setAlarmIdEdit] = useState('');
    const alarmsManager = getAlarmsManager();
    const { t } = useTranslation();
    const [alarms, setAlarms] = useState([]);
    const [isAddAlarm, setTimePickerAddAlarm] = useState(false);
    const [isEditAlarm, setTimePickerEditAlarm] = useState(false);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    // const alarmsHeight = height < 1100 ? height < 900 ? height < 600 ? height < 500 ? 226 : 338 : 450 : 562 : 674;


    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground!');
                await updatePassedAlarms().then((updatedAlarmsArray) => setAlarms(updatedAlarmsArray));
            }


            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            // console.log('AppState', appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {

        onLoad();
        return () => { ignore = true };


    }, [])

    useEffect(() => {

        storeAlarmsArray();
        return () => { ignore = true };


    }, [alarms])







    const storeAlarmsArray = async () => {

        await storeDataObject('alarms', alarms).then(() => console.log('alarms saved successfully'));


    };

    const onLoad = async () => {

        // await AsyncStorage.clear();

        await updatePassedAlarms().then((updatedAlarmsArray) => setAlarms(updatedAlarmsArray));


    };


    const updatePassedAlarms = async () => {


        var currentTime = new Date(Date.now());

        var alarmsArray = await getDataObject('alarms');

        if (alarmsArray != null) {

            return await Promise.all(alarmsArray.map((alarm) => {

                var lastAlarm = getLastAlarmDate(alarm);

                if (lastAlarm != null) {

                    var lastAlarmTime = new Date(lastAlarm);

                    if (lastAlarmTime.getTime() <= currentTime.getTime())
                        alarm.isToggleEnabled = false;


                    for (let color in alarm.notificationId) {

                        if (alarm.date[color] != null) {

                            var alarmTime = new Date(alarm.date[color]);

                            if (alarmTime.getTime() <= currentTime.getTime()) {

                                alarm.notificationId[color] = 'on';
                                alarm.date[color] = null;

                            }


                        }
                    }
                }


                return alarm;

            }));
        }
        return [];

    };





    async function setAlarmColor(alarmID, color) {

        newAlarms = await Promise.all(alarms?.map(async (alarm, index) => {

            if (index == alarmID) {

                if (alarm.notificationId[color] == null) {
                    alarm.notificationId[color] = 'on';
                    alarm.enabledColors++;


                    await storeData('enabledColors', alarm.enabledColors.toString());
                    // await getData('enabledColors').then((data) => { console.log("p " + data) });

                    console.log("operation: add color \n");

                    if (alarm.isToggleEnabled) {

                        alarmDay = addDaysForAlarm(color);

                        await scheduleNewAlarm(alarm.hours, alarm.minutes, alarmDay)
                            .then((res) => {
                                alarm.notificationId[color] = res[0];
                                console.log(`color: (${color}) successfully scheduled alarm: (${res[0]}) Date: (${getDateDisplay(res[1])}) Time: (${getTimeDisplay(res[1])})`);
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
                        .catch((err) => console.log(err));

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
                    .then(async () => {

                        alarm.enabledColors--;
                        date = alarm.date[colorToDelete];
                        noteId = alarm.notificationId[colorToDelete];
                        alarm.notificationId[colorToDelete] = isUpdateTime ? noteId ? 'on' : null : null;
                        alarm.date[colorToDelete] = null;
                        resolve(`color: (${colorToDelete}) successfully cancelled alarm: (${noteId}) Date: (${getDateDisplay(date)}) Time: (${alarm.hours}:${alarm.minutes})`);
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

                                alarm.enabledColors--;
                                date = alarm.date[color];
                                alarm.notificationId[color] = isUpdateTime ? noteId ? 'on' : null : null;
                                alarm.date[color] = null;
                                resolve(`color: (${color}) successfully cancelled alarm: (${noteId}) Date: (${getDateDisplay(date)}) Time: (${alarm.hours}:${alarm.minutes})\n`);

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

        scheduleNewAlarm(hours, minutes, alarmDay = 0).then(async (res) => {
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
            showToast(t("Alarm scheduled successfully"))
            console.log(`color: (red) successfully scheduled alarm: (${res[0]}) Date: (${getDateDisplay(res[1])}) Time: (${getTimeDisplay(res[1])})`);



        }).catch((error) => console.log(error));

    }

    // async function updateAlarmTime(alarm, hours, minutes) {

    //     return new Promise((resolve, reject) => {
    //         alarm.hours = hours;
    //         alarm.minutes = minutes;
    //         resolve();
    //     });
    // }



    async function editAlarmTime(hours, minutes) {

        setTimePickerEditAlarm(false);



        await (Promise.all(alarms?.map(async (alarm, index) => {

            if (index == alarmIdEdit) {

                var enabledColors = alarm.enabledColors;


                await cancelScheduledAlarm(alarm, null, isUpdateTime = true)
                    .then(async (res) => {

                        console.log(res);
                        alarm.hours = hours;
                        alarm.minutes = minutes;

                        if (enabledColors == 0) {
                            alarm.notificationId['red'] = 'on';
                            enabledColors++;
                        }

                        alarm.isToggleEnabled = false;
                        alarm.isToggleEnabled = true;


                        await scheduleColors(alarm).then(res => {
                            console.log(res);
                            alarm.enabledColors = enabledColors;
                        })

                        showToast(t("Alarm scheduled successfully"));

                    }).catch(error => reject(error))
            }
            return alarm;

        }))).then(async (newAlarmsArray) => {
            setAlarms(newAlarmsArray);
        });

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
                            textResolve.push(`color: (${color}) successfully scheduled alarm: (${res[0]}) Date: (${getDateDisplay(res[1])}) Time: (${getTimeDisplay(res[1])})\n`);
                            alarm.notificationId[color] = res[0];
                            alarm.date[color] = res[1];
                        })
                        .catch(error => textReject.push(`unable to schedule alarm in color ${color} ` + error));
                }
            }


            if (textResolve) {

                resolve(textResolve);
            }
            else reject(textReject);

        });
    }

    function getLastAlarmDate(alarm) {

        if (alarm.date['green'] != null)
            return alarm.date['green'];

        if (alarm.date['blue'] != null)
            return alarm.date['blue'];

        if (alarm.date['red'] != null)
            return alarm.date['red'];

        else return null;

    }

    function getClosestAlarmDate(alarm) {

        if (alarm.date['red'] != null)
            return alarm.date['red'];

        if (alarm.date['blue'] != null)
            return alarm.date['blue'];

        if (alarm.date['green'] != null)
            return alarm.date['green'];

        else return null;

    }



    async function editAlarmToggle(alarmID) {



        (Promise.all(alarms?.map(async (alarm, index) => {

            if (index == alarmID) {

                if (!alarm.isToggleEnabled) {

                    if (alarm.enabledColors == 0) {
                        alarm.notificationId['red'] = 'on';
                        alarm.enabledColors++;
                    }
                    await scheduleColors(alarm)
                        .then(res => {
                            console.log(res);
                            alarm.isToggleEnabled = true;
                            showToast(t("Alarm scheduled successfully"));
                        })
                        .catch(error => console.log(error));


                } else {


                    await cancelScheduledAlarm(alarm, null, isUpdateTime = false)
                        .then((res) => {
                            alarm.isToggleEnabled = false;
                            console.log(res);
                            showToast(t("Alarm cancelled successfully"));
                        })
                        .catch(error => console.log(error));

                }
            }
            return alarm;

        }))).then(async (newAlarmsArray) => {
            setAlarms(newAlarmsArray);
        })


    }




    const deleteAlarm = (alarmId) => {

        alarmToDelete = {};
        setAlarms(prevAlarms => {
            return prevAlarms?.filter((alarm, index) => {
                alarmToDelete = alarm;
                return index != alarmId;

            })
        });

        const cancelAlarm = new Promise((resolve, reject) => {

            if (getLastAlarmDate(alarmToDelete) != null) {

                cancelScheduledAlarm(alarmToDelete, null, isUpdateTime = false)
                    .then(async (res) => {
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






    return (



        < View className={" pt-4 dark:bg-black h-[90%]"} >

            <TopBar tabName={t('alarms_screen')} />

            < TimePicker
                active={isAddAlarm || isEditAlarm}
                onSelect={(hours, minutes) => { isAddAlarm ? addAlarm(hours, minutes) : editAlarmTime(hours, minutes) }}
                onCancel={() => { setTimePickerEditAlarm(false); setTimePickerAddAlarm(false); }}
                label='add alarm' />




            <View class='alarmsView'

                className={`mt-4 border-t-2 border-blue-300 h-[60.3vh]`}>
                {/* style={{ height: alarmsHeight }}> */}



                < ScrollView className="mx-1 " >

                    <View name="AlarmsContainer" className="flex flex-1 items-center ">
                        {

                            alarms
                                ?.sort((a, b) => {
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
                                                setAlarmIdEdit(alarmID);
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

            <View name='plus button'
                className='absolute bottom-4 inset-x-0 w-full flex items-center shadow-inner'>

                <TouchableOpacity
                    onPress={() => { Vibration.vibrate(100); setTimePickerAddAlarm(true); }}>
                    <MaterialCommunityIcons name="plus-circle" size={60} color="#3474eb" />
                </TouchableOpacity>
            </View>

        </View >
    )
}

