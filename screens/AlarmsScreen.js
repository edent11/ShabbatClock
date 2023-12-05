
import { React, useState, useEffect } from 'react'
import AlarmClock from '../components/AlarmClock'
import TimePicker from '../components/TimePicker'
import { View, ScrollView, TouchableOpacity, Vibration, ToastAndroid } from 'react-native';
import { useTranslation } from 'react-i18next';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAlarmsManager, getDateDisplay, getTimeDisplay, storeData, getData, storeDataObject, getDataObject } from "../assets/globals";


let alarmIdEdit = '';

export default function AlarmsScreen() {

    const alarmsManager = getAlarmsManager();
    const { t } = useTranslation();
    // const [alarms, setAlarms] = useState([{ id: 0, enabledColors: 0, notificationId: { red: null, blue: null, green: null }, hours: "10", minutes: "30", isToggleEnabled: false, date: { red: null, blue: null, green: null } }]);
    const [alarms, setAlarms] = useState([]);
    const [isAddAlarm, setTimePickerAddAlarm] = useState(false);
    const [isEditAlarm, setTimePickerEditAlarm] = useState(false);


    useEffect(() => {

        onLoad();

    }, [])

    useEffect(() => {

        storeAlarmsArray();

    }, [alarms])


    const storeAlarmsArray = async () => {

        await storeDataObject('alarms', alarms).then(() => console.log('saved success'));

    };

    const onLoad = async () => {

        var alarmsArray = await getDataObject('alarms');
        console.log(alarmsArray);
        if (alarmsArray != null) {
            await updatePassedAlarms(alarmsArray).then((updatedAlarmsArray) => setAlarms(updatedAlarmsArray));
        }


    };

    const updatePassedAlarms = async (alarmsArray) => {

        var currentTime = new Date(Date.now());


        return await Promise.all(alarmsArray.map((alarm) => {

            for (let color in alarm.notificationId) {


                if (alarm.isToggleEnabled && alarm.date[color] != null) {

                    var alarmTime = new Date(alarm.date[color]);

                    if (alarmTime.getTime() <= currentTime.getTime()) {
                        alarm.enabledColors--;
                        alarm.notificationId[color] = null;
                        alarm.date[color] = null;
                    }
                }

            }
            if (alarm.enabledColors == 0)
                alarm.isToggleEnabled = false;
            return alarm;

        }));


    };


    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };


    async function setAlarmColor(alarmID, color) {

        newAlarms = await Promise.all(alarms.map(async (alarm, index) => {

            if (index == alarmID) {

                if (alarm.notificationId[color] == null) {
                    alarm.notificationId[color] = 'on';
                    alarm.enabledColors++;
                    // await storeData('alarms', alarms);
                    // await getData('alarms').then((data) => { console.log(data) });

                    await storeData('enabledColors', alarm.enabledColors.toString());
                    await getData('enabledColors').then((data) => { console.log("p " + data) });

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

                console.log(alarm.enabledColors);
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



        await (Promise.all(alarms.map(async (alarm, index) => {

            if (index == alarmIdEdit) {

                var enabledColors = alarm.enabledColors;

                await cancelScheduledAlarm(alarm, null, isUpdateTime = true)
                    .then(async (res) => {

                        console.log(res);
                        alarm.hours = hours;
                        alarm.minutes = minutes;


                        await scheduleColors(alarm).then(res => {
                            console.log(res);
                            alarm.enabledColors = enabledColors;
                        })


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

    function updateToggleWhenTimePassed() {

        var currentTime = new Date();
        var lastAlarm;

        Promise.all(alarms.map((alarm, index) => {

            console.log(alarm);

            // console.log(alarm);
            // if (alarm.isToggleEnabled) {
            //     lastAlarm = getLastAlarmDate(alarm);

            //     if (lastAlarm <= currentTime) {
            //         setAlarmOff(alarm);
            //     }

            // }

            return alarm;
        })).then(alarms => { setAlarms(alarms); });


    }

    function checkIfAlarmEnabled(alarm) {

        var currentTime = new Date();
        var lastAlarm;

        if (alarm.isToggleEnabled) {
            lastAlarm = getLastAlarmDate(alarm);

            if (lastAlarm <= currentTime) {
                setAlarmOff(alarm);
                return false
            }
            return true;
        }
        return false;
    }

    function setAlarmOff(alarm) {

        for (color in alarm.notificationId) {
            alarm.notificationId[color] = alarm.notificationId[color] ? 'on' : null;
            alarm.date[color] = null;
            alarm.isToggleEnabled = false;
        }
    }




    function getLastAlarmDate(alarm) {

        if (alarm.date['green'] != null)
            return alarm.date['green'];

        if (alarm.date['blue'] != null)
            return alarm.date['blue'];

        if (alarm.date['red'] != null)
            return alarm.date['red'];

    }



    async function editAlarmToggle(alarmID) {



        (Promise.all(alarms.map(async (alarm, index) => {

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

    // function check() {

    //     let date = new Date();
    //     let sec = date.getSeconds();
    //     setTimeout(() => {
    //         setInterval(() => {
    //             console.log("time changed!");
    //             updateToggleWhenTimePassed();
    //         }, 60 * 1000);
    //     }, (60 - sec) * 1000);



    // }



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

    // const checkAlarmPassed = (color) => {

    //     var currentDate = getDateDisplay(new Date());

    //     alarms.map((alarm, index) => {

    //         if (index == alarmID) {

    //             if (alarm.isToggleEnabled) {

    //                 for (color in alarm.date) {

    //                     if (alarm.date[color] <= getDateDisplay(currentDate) && )

    //                 }
    //             }
    //         }
    //     })




    // }



    // const MINUTE_MS = 60000;

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('Logs every minute');

    //         // updateToggleWhenTimePassed();
    //     }, 7000);

    //     return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    // }, [])



    return (



        < View className={"pt-8 dark:bg-black h-11/12"} >

            < TimePicker
                active={isAddAlarm || isEditAlarm}
                onSelect={(hours, minutes) => { isAddAlarm ? addAlarm(hours, minutes) : editAlarmTime(hours, minutes) }}
                onCancel={() => { setTimePickerEditAlarm(false); setTimePickerAddAlarm(false); }}
                label='add alarm' />


            <TopBar tabName={t('alarms_screen')} />

            <View className='h-5/7'>


                < ScrollView className="pt-5 mx-1" >

                    <View name="AlarmsContainer" className="flex flex-1 items-center bg-slate-500 h-full">
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

            <View name='plus button' className='absolute bottom-7 inset-x-0 w-full flex items-center shadow-inner'>

                <TouchableOpacity
                    onPress={() => { Vibration.vibrate(100); setTimePickerAddAlarm(true); }}>
                    <MaterialCommunityIcons name="plus-circle" size={60} color="#3474eb" />
                </TouchableOpacity>
            </View>

        </View >
    )
}

