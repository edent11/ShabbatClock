/*
    FileName: AlarmNotification.jsx
    Role: Component, responsible for notifications scheduling 
*/

import React from 'react';
import { I18nManager } from 'react-native';
import notifee, { TriggerType, AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AlarmNotification extends React.Component {

    constructor() {

        super();
        this.channelId;
        this.onLoad();
        this.channelNumber = 0;
        this.appIcon = require('../assets/notification_icon.png');

    }

    /* When the user changes ringtones for his alarms */
    async changeAlarmRingtone(ringtone) {

        await notifee.createChannel(
            {
                id: `ShabbatAlarm_111${++this.channelNumber}`,
                name: 'Default Channel',
                sound: ringtone,

            }).then(async (channelId) => {
                this.channelId = channelId;
                await this.storeData('channelNumber', this.channelNumber.toString());
            })
            .catch((e) => console.log(e));

    }

    /* Load channel id if already received  */
    async onLoad() {

        console.log('onload_notifications');
        await notifee.requestPermission();

        await this.getData('channelNumber').then(channel => {
            if (channel == null) {
                this.channelNumber = 0;
            }

            else this.channelNumber = parseInt(channel);

        });


        if (this.channelNumber == 0) {

            this.channelId = await notifee.createChannel({
                id: `ShabbatAlarm_221`,
                name: 'Default Channel',
                sound: 'bicycle_horn'
            });
        }
        else this.channelId = `ShabbatAlarm_111${this.channelNumber}`;


    }

    async getData(key) {

        return await AsyncStorage.getItem(key);

    }

    async storeData(key, data) {

        return await AsyncStorage.setItem(key, data);

    };

    /* Schedule alarm */
    async scheduleAlarm(scheduleTime) {


        // Create a time-based trigger
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: scheduleTime.getTime(),
        };

        return new Promise(async (resolve, reject) => {

            try {
                await notifee.createTriggerNotification({
                    title: I18nManager.isRTL ? "שעון מעורר שבת מופעל" : "Shabbat Alarm is on",
                    body: I18nManager.isRTL ? "שעון מעורר שבת מופעל" : "Shabbat Alarm is on",
                    android: {
                        channelId: this.channelId,
                        smallIcon: 'ic_alarm',
                        importance: AndroidImportance.HIGH,
                        largeIcon: this.appIcon,
                        pressAction: {
                            id: 'default',
                        },
                    },
                },
                    trigger,
                ).then((notificationID) => {
                    resolve(notificationID);


                }).catch((err) => { reject(err) });
            } catch (err) {
                console.log(err);

            }
        })

    }

    /* Edit alarm time */
    async changeAlarmTime(notificationId, newTime) {


        // Create a time-based trigger
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: newTime.getTime(),
        };

        return new Promise(async (resolve, reject) => {

            await notifee.createTriggerNotification({
                id: notificationId,
                title: I18nManager.isRTL ? "שעון מעורר שבת מופעל" : "Shabbat Alarm is on",
                body: I18nManager.isRTL ? "שעון מעורר שבת מופעל" : "Shabbat Alarm is on",
                android: {
                    channelId: this.channelId,
                    smallIcon: 'ic_alarm',
                    importance: AndroidImportance.HIGH,
                    largeIcon: this.appIcon,
                    pressAction: {
                        id: 'default',
                    },
                },
            },
                trigger,
            ).then((notificationID) => {
                resolve(notificationID);


            }).catch((err) => { reject(err); });
        })

    }



    /* Cancel alarm */
    async cancelAlarm(notificationId) {

        if (notificationId != null)
            return await notifee.cancelNotification(notificationId);

    }


    /* Test alarm */
    async testAlarm() {

        await notifee.displayNotification({
            title: I18nManager.isRTL ? "שעון מעורר לדוגמה" : "Example of Alarm",
            body: I18nManager.isRTL ? "שעון מעורר לדוגמה" : "Example of Alarm",

            android: {
                channelId: this.channelId,
                largeIcon: this.appIcon,
                importance: AndroidImportance.HIGH,
                smallIcon: 'ic_alarm',

                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });
    }
}

export default AlarmNotification;