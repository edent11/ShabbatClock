import React from 'react';
import { I18nManager } from 'react-native';
import notifee, { TriggerType } from '@notifee/react-native';
import { storeData, getData } from "../assets/globals";


class AlarmNotification extends React.Component {

    constructor() {
        super();
        this.channelId;
        this.onLoad();
        // this.channelChangeTimes = getData('channelChangeTimes');
        this.channelNumber = 0;


    }


    async changeAlarmRingtone(ringtone) {



        await notifee.createChannel(
            {
                id: `ShabbatXY_${++this.channelNumber}`,
                name: 'Default Channel',
                sound: ringtone,

            }).then(async (channelId) => {
                this.channelId = channelId;
                await storeData('channelNumber1', this.channelNumber.toString());
            })
            .catch((e) => console.log(e));

    }

    async onLoad() {

        console.log('onload');
        await notifee.requestPermission();

        await getData('channelNumber1').then(channel => {
            if (channel == null) {
                this.channelNumber = 0;
            }

            else this.channelNumber = parseInt(channel);

        });

        if (this.channelNumber == 0) {

            this.channelId = await notifee.createChannel({
                id: `ShabbatXYZ_`,
                name: 'Default Channel',
                sound: 'rooster_call'
            });
        }
        else this.channelId = `ShabbatXYZ_${this.channelNumber}`;


    }

    async scheduleAlarm(hours, minutes, alarmDay) {


        const scheduleTime = new Date(Date.now());

        if (hours < scheduleTime.getHours() ||
            hours == scheduleTime.getHours() && minutes <= scheduleTime.getMinutes()) {
            scheduleTime.setDate(scheduleTime.getDate() + 1);
        }

        scheduleTime.setHours(hours);
        scheduleTime.setMinutes(minutes);
        scheduleTime.setDate(scheduleTime.getDate() + alarmDay);

        // Create a time-based trigger
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: scheduleTime.getTime(), // fire at 11:10am (10 minutes before meeting)
        };


        const notificationId = await notifee.createTriggerNotification({
            title: 'We Love You Hashem',
            body: 'Toda To you',
            android: {
                channelId: this.channelId,
                pressAction: {
                    id: 'default',
                },
            },
        },
            trigger,
        )



        return Promise.all([notificationId, scheduleTime]);
    }

    async cancelAlarm(notificationId) {

        if (notificationId != null)
            return await notifee.cancelNotification(notificationId);

    }



    async testAlarm() {



        await notifee.displayNotification({
            title: I18nManager.isRTL ? "שעון מעורר לדוגמה" : "Example of Alarm",
            body: I18nManager.isRTL ? "שעון מעורר לדוגמה" : "Example of Alarm",

            android: {
                channelId: this.channelId,
                // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });


    }


}



export default AlarmNotification;