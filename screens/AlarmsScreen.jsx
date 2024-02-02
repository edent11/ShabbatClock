/*
    FileName: AlarmScreen.jsx
    Role: Responsible for scheduling alarms.
*/



import { React, useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Vibration, AppState, useWindowDimensions } from 'react-native';
import Modal from "react-native-modal";
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAlarmsManager, getDateDisplay, getTimeDisplay, getData, storeDataObject, getDataObject, showToast } from "../assets/globals";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlarmClock from '../components/AlarmClock'
import TimePicker from '../components/TimePicker'
import TopBar from '../components/TopBar'
import "../languages/i18n";



export default function AlarmsScreen(props) {

    const { height } = useWindowDimensions();
    const [alarmIdEdit, setAlarmIdEdit] = useState('');
    const [alarmIdDelete, setAlarmIdDelete] = useState('');
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
                onLoad();

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

        if (alarms != null && alarms != undefined)
            await storeDataObject('alarms', alarms).then(() => console.log('alarms saved successfully'));


    };

    const onLoad = async () => {

        // await AsyncStorage.clear();

        await updatePassedAlarms().then((alarms) => setAlarms(alarms));



    };


    const updatePassedAlarms = async () => {


        var alarmsArray = await getDataObject('alarms');

        var currentTime = new Date(Date.now());

        if (alarmsArray != null) {

            return await Promise.all(alarmsArray.map((alarm) => {

                var alarmTime = new Date(alarm.time);

                if (alarmTime.getTime() <= currentTime.getTime())
                    alarm.isToggleEnabled = false;

                alarm.time = alarmTime;

                return alarm;
            }));
        }
        return [];



    }





    function setAlarmColor(alarmID, newColorNumber) {

        var alarm = alarms[alarmID];
        var newColor = numberToColor(newColorNumber);
        var oldColor = numberToColor(alarm.enabledColor);
        console.log(newColor)

        if (alarm.isToggleEnabled) {

            switch (newColor) {
                case "red": {

                    if (oldColor == "blue") {
                        cancelScheduledAlarm("blue", alarm.notificationId["blue"], alarm.time).then(() => alarm.notificationId["blue"] = null);

                    }
                    if (oldColor == "green") {
                        cancelScheduledAlarm("green", alarm.notificationId["green"], alarm.time).then(() => alarm.notificationId["green"] = null);
                        cancelScheduledAlarm("blue", alarm.notificationId["blue"], alarm.time).then(() => alarm.notificationId["blue"] = null);
                    }
                    break;

                }

                case "blue": {

                    if (oldColor == "red")
                        scheduleAlarm("blue", alarm.time).then(res => alarm.notificationId["blue"] = res);

                    if (oldColor == "green") {
                        cancelScheduledAlarm("green", alarm.notificationId["green"], alarm.time).then(() => alarm.notificationId["green"] = null);

                    }

                    break;

                }

                case "green": {

                    if (oldColor == "red") {
                        scheduleAlarm("blue", alarm.time).then(res => alarm.notificationId["blue"] = res);
                        scheduleAlarm("green", alarm.time).then(res => alarm.notificationId["green"] = res);
                    }
                    if (oldColor == "blue") {
                        scheduleAlarm("green", alarm.time).then(res => alarm.notificationId["green"] = res);
                    }

                    break;

                }

            }

        }

        alarm.enabledColor = newColorNumber;


    }


    async function scheduleAlarm(color, scheduleTime) {


        return new Promise((resolve, reject) => {

            calculateTimeByColor(color, scheduleTime).then((colorTime) => {

                alarmsManager.scheduleAlarm(colorTime)
                    .then((notificationID) => {
                        console.log(`color: (${color}) successfully scheduled alarm: (${notificationID}) Date: (${getDateDisplay(colorTime)}) Time: (${getTimeDisplay(colorTime)})`);
                        resolve(notificationID);
                    });


            })
                .catch(error => reject('error while scheduling alarm: ' + error));

        });
    }

    async function setAlarmOn(alarm) {

        var count = 1;

        for (let color in alarm.notificationId) {

            if (count <= alarm.enabledColor) {
                var time = alarm.time;

                scheduleAlarm(color, time)
                    .then((res) => {
                        alarm.notificationId[color] = res;
                    })
                    .catch(error => console.log(error));
            }

            count++;
        }

    }


    async function cancelScheduledAlarm(color, notificationId, time) {

        return new Promise((resolve, reject) => {
            alarmsManager.cancelAlarm(notificationId)
                .then(() => {
                    calculateTimeByColor(color, time).then((res) => {
                        console.log(`color: (${color}) successfully cancelled alarm: (${notificationId}) Date: (${getDateDisplay(res)}) Time: (${getTimeDisplay(res)})`);
                        resolve();
                    });


                })
                .catch(error => reject('error while cancelling alarm: ' + error));

        });


    }

    async function cancelAllScheduledAlarms(alarmToCancel) {

        for (let color in alarmToCancel.notificationId) {

            if (alarmToCancel.notificationId[color] != null) {

                cancelScheduledAlarm(color, alarmToCancel.notificationId[color], alarmToCancel.time)
                    .then(() => {
                        alarmToCancel.notificationId[color] = null;
                    })
                    .catch(error => console.log(error));
            }


        }

    }

    async function addAlarm(scheduleTime) {

        console.log("operation: add alarm\n");

        setTimePickerAddAlarm(false);

        scheduleAlarm("red", scheduleTime).then(async (res) => {
            setAlarms(prevAlarms => {
                return [...prevAlarms, {

                    notificationId: { red: res, blue: null, green: null },
                    time: scheduleTime,
                    enabledColor: 1,
                    isToggleEnabled: true
                }];
            });

            showToast(t("Alarm scheduled successfully"));




        }).catch(() => {
            console.log("error");
        });


    }

    async function editAlarmTime(newTime) {

        setTimePickerEditAlarm(false);

        var alarm = alarms[alarmIdEdit];

        if (alarm.isToggleEnabled) {

            for (let color in alarm.notificationId) {

                if (alarm.notificationId[color] != null) {

                    alarmsManager.changeAlarmTime(alarm.notificationId[color], newTime).then((res) => {

                        console.log(`color: ${color} changed time to Date: (${getDateDisplay(newTime)}) Time: (${getTimeDisplay(newTime)})`)
                    });

                }

            }

        }

        setAlarms(prevAlarms => {
            return prevAlarms?.filter((alarm, index) => {
                if (index == alarmIdEdit) {
                    alarm.time = newTime;
                }

                return alarm;

            })
        });

        showToast(t("alarm_updated"));
    }




    function getLastAlarmDate(alarm) {

        if (alarm.notificationId['green'] != null)
            return alarm.notificationId['green'];

        if (alarm.notificationId['blue'] != null)
            return alarm.notificationId['blue'];

        if (alarm.notificationId['red'] != null)
            return alarm.notificationId['red'];

        else return null;

    }



    async function changeAlarmToggle(alarmID) {

        var alarm = alarms[alarmID];

        if (alarm.isToggleEnabled) {
            console.log("operation: switch off \n");
            cancelAllScheduledAlarms(alarm);
            alarm.isToggleEnabled = false;
            showToast(t("Alarm cancelled successfully"));

        }
        else {
            console.log("operation: switch on \n");
            setAlarmOn(alarm);
            alarm.isToggleEnabled = true;
            showToast(t("Alarm scheduled successfully"));
        }

    }




    const deleteAlarm = (alarmId) => {

        console.log("operation: delete \n");

        var alarmToDelete = {};
        setAlarms(prevAlarms => {
            return prevAlarms?.filter((alarm, index) => {
                alarmToDelete = alarm;
                return index != alarmId;

            })
        });


        if (getLastAlarmDate(alarmToDelete) != null) {

            cancelAllScheduledAlarms(alarmToDelete);

        }

    }


    const fixTimeDisplay = (hours, minutes) => {

        if (hours < 10)
            hours = '0' + hours;

        if (minutes < 10)
            minutes = '0' + minutes;

        return hours + ":" + minutes;

    }

    const calculateTimeByColor = (color, time) => {

        return new Promise((resolve, reject) => {

            getData("repeatTime").then((repeatTime) => {
                if (repeatTime == null) {
                    repeatTime = 5;
                }
                const newTime = new Date(time);

                switch (color) {

                    case 'blue': {
                        newTime.setMinutes(time.getMinutes() + parseInt(repeatTime));
                        break;
                    }
                    case 'green': {
                        newTime.setMinutes(time.getMinutes() + parseInt(repeatTime) * 2);
                        break;
                    }

                }
                resolve(newTime);
            });
        });

    }



    const numberToColor = (number) => {

        switch (number) {

            case 1: return 'red';
            case 2: return 'blue';
            case 3: return 'green';

        }

    }

    return (

        < View className={" pt-4 dark:bg-black h-[90%]"} >

            <TopBar tabName={t('alarms_screen')} />

            < TimePicker
                active={isAddAlarm || isEditAlarm}
                onSelect={(scheduleTime) => {
                    isAddAlarm ? addAlarm(scheduleTime)
                        : editAlarmTime(scheduleTime)
                }}
                onCancel={() => { setTimePickerEditAlarm(false); setTimePickerAddAlarm(false); }}
                label='add alarm' />


            <View class='alarmsView'

                className={`mt-4 border-t-2 border-blue-300 h-[60.3vh]`}>

                < ScrollView className="mx-1 " >

                    <View name="AlarmsContainer" className="flex flex-1 items-center ">
                        {

                            alarms
                                ?.sort((a, b) => {
                                    if (a.date > b.date)
                                        return 1;
                                    else
                                        return 2;


                                })
                                ?.map((alarm, index) => {

                                    var time = alarm.time;
                                    var date = getDateDisplay(time);

                                    return (

                                        <AlarmClock
                                            key={index}
                                            id={index}
                                            time={fixTimeDisplay(time.getHours(), time.getMinutes())}
                                            date={date}
                                            enabledColor={alarm.enabledColor}
                                            isToggleEnabled={alarm.isToggleEnabled}
                                            onToggleChange={(alarmID) => changeAlarmToggle(alarmID)}
                                            onEditTime={(alarmID) => {
                                                setAlarmIdEdit(alarmID);
                                                setTimePickerEditAlarm(true);
                                            }}
                                            onRemove={(alarmID) => deleteAlarm(alarmID)}
                                            onColorSelection={(alarmID, onColor) => setAlarmColor(alarmID, onColor)}

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

