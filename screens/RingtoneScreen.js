import { Text, View, SafeAreaView, ScrollView, Button } from 'react-native';
import RadioButtonList from '../components/RadioButtonList'
import TopBar from '../components/TopBar'
import { ringtones } from '../assets/ringtones/ringtones';
import { useState, useEffect } from 'react'
import { Audio } from 'expo-av';
import "../languages/i18n";
import { useTranslation } from 'react-i18next';
import { getAlarmsManager } from "../assets/globals";

global.alarmSound = ringtones[0].file;
export default function RingtoneScreen() {

    const alarmsManager = getAlarmsManager();
    const { t } = useTranslation();
    const [ringtone, setRingtone] = useState(ringtones[0]);
    const [sound, setSound] = useState(null);
    const [lastRingtoneChosen, setLastRingtoneChosen] = useState();



    async function playSound(chosenRingtone) {

        // console.log('Loading Sound');
        console.log("playing " + chosenRingtone.name);
        const { sound } = await Audio.Sound.createAsync(chosenRingtone.file);
        setSound(sound);

        // console.log('Playing Sound');
        await sound.playAsync();
    }


    useEffect(() => {

        return sound
            ? () => {
                // console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


    return (

        < SafeAreaView className={"pt-8 px-4 dark:bg-black h-full"} >

            <TopBar tabName={t('ringtone_screen')} />

            <View name='RingtonesView' className='mb-3 h-2/4 mt-4' >


                < ScrollView className=" border-2 border-slate-700  dark:bg-slate-700 " >


                    <RadioButtonList
                        data={ringtones}
                        onSelect={async (chosenRingtone) => {
                            playSound(chosenRingtone);
                            setLastRingtoneChosen(chosenRingtone);

                        }} />

                </ScrollView >
            </View>

            <Text className='text-center bg-slate-900 text-white text-lg -top-2 mt-4'> {t('your_ringtone') + ':   ' + ringtone.name}</Text>

            <View className='mt-4'>


                <Button
                    onPress={async () => {

                        setRingtone(lastRingtoneChosen);
                        await sound.stopAsync();
                        await alarmsManager.changeAlarmRingtone(lastRingtoneChosen.name);
                    }}
                    title={t('save')} />

            </View>
            <View className='mt-2'>
                <Button color={"red"} onPress={() => alarmsManager.testAlarm()} title={t('alarm_example')} />

            </View>

        </SafeAreaView >

    );
}

