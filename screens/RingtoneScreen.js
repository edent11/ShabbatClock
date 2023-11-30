import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button } from 'react-native';
import RadioButtonList from '../components/RadioButtonList'
import TopBar from '../components/TopBar'
import { ringtones } from '../assets/ringtones/ringtones';
import { useState, useEffect } from 'react'
import { Audio } from 'expo-av';
import "../languages/i18n";
import { useTranslation } from 'react-i18next';
import AlarmNotification from "../components/AlarmNotification";

global.alarmSound = ringtones[0].file;
export default function RingtoneScreen() {

    const alarmsManager = new AlarmNotification();
    const { t } = useTranslation();
    const [ringtone, setRingtone] = useState({});
    const [sound, setSound] = useState(null);
    const [lastRingtoneChosen, setLastRingtonChosen] = useState();



    async function playSound(ringtone) {

        console.log('Loading Sound');
        console.log(ringtone);

        const { sound } = await Audio.Sound.createAsync(ringtone.file);
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }



    useEffect(() => {

        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


    return (

        < SafeAreaView className={"pt-12 px-4 dark:bg-black h-full"} >


            <TopBar tabName={t('ringtone_screen')} />

            <View name='RingtonesView' className='mb-3 h-3/5' >


                < ScrollView className=" border-2 border-slate-700 mx-1  bg-slate-700 " >


                    <RadioButtonList
                        data={ringtones}
                        onSelect={chosenRingtone => { setLastRingtoneChosen(chosenRingtone); playSound(chosenRingtone); }} />

                </ScrollView >
            </View>

            <Button onPress={() => {
                global.alarmSound = ringtone;
                setRingtone(lastRingtoneChosen);
            }} title={t('save')} />
            <Button color={"red"} onPress={() => alarmsManager.testAlarm()} title={t('alarm_example')} />

            <Text className='text-center text-base bg-slate-900 text-white'> {t('Your ringtone: ') + ringtone.name}</Text>


        </SafeAreaView >

    );
}

