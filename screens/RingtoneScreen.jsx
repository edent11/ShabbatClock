/*
    FileName: RingtoneScreen.jsx
    Role: Displays ringtones for the user to choose. 
*/



import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ringtones } from '../android/app/src/main/res/raw/ringtones';
import { useState, useEffect } from 'react'
import { Audio } from 'expo-av';
import { useTranslation } from 'react-i18next';
import { getAlarmsManager, storeDataObject, loadChosenRingtone, showToast } from "../assets/globals";
import RadioButtonList from '../components/RadioButtonList'
import TopBar from '../components/TopBar'
import "../languages/i18n";







export default function RingtoneScreen({ navigation, route }) {

    const alarmsManager = getAlarmsManager();
    const { t } = useTranslation();
    const [ringtone, setRingtone] = useState();
    const [ringtoneNumber, setRingtoneNumber] = useState();
    const [sound, setSound] = useState(null);
    const [lastRingtoneChosen, setLastRingtoneChosen] = useState(ringtones[0]);


    useEffect(() => {
        loadChosenRingtone().then(ringtoneData => {

            if (ringtoneData != null) {
                setRingtone(ringtoneData["name"]);
                setLastRingtoneChosen(ringtoneData["name"]);
            }
            else setRingtone(ringtones[0].name);
        });

        return () => { ignore = true };


    }, [])







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
                console.log('Unloading Sound');
                sound.unloadAsync();

            }
            : undefined;


    }, [sound]);





    return (

        < View className={"pt-4  dark:bg-black h-full "} >


            <TopBar tabName={t('ringtone_screen')} />


            <View name='RingtonesView' className='mb-2 h-4/7 mt-4 border-2 border-blue-300 ' >


                < ScrollView className="bg-slate-800" >

                    <RadioButtonList
                        data={ringtones}
                        onSelect={async (chosenRingtone) => {
                            playSound(chosenRingtone);
                            setLastRingtoneChosen(chosenRingtone);

                        }} />

                </ScrollView >
            </View>

            <View className='items-center justify-center mx-3'>


                <Text className='text-center bg-slate-800 text-white text-base -top-2 h-auto'
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}> {t('your_ringtone') + ':   ' + ringtone}</Text>

            </View>


            <View className=''>

                <TouchableOpacity className='mb-2'
                    android_ripple={{ foreground: 'black' }}
                    onPress={async () => {

                        setRingtone(lastRingtoneChosen.name);
                        await sound?.stopAsync();
                        await alarmsManager.changeAlarmRingtone(lastRingtoneChosen.name);
                        await storeDataObject('ringtone', { id: lastRingtoneChosen["id"], name: lastRingtoneChosen["name"] });
                        showToast(t('ringtone_changed'));
                    }}>
                    <View class='saveRingtoneBtn' className={`bg-spacial-blue items-center justify-center h-10 `}>
                        <Text className='text-white font-bold text-base text-center'>{t('save')}</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    android_ripple={{ foreground: 'black' }}

                    onPress={async () => {
                        await sound?.stopAsync();
                        alarmsManager.testAlarm();
                    }}>


                    <View class='testAlarmBtn' className={`bg-red-600 items-center justify-center h-10 `}>
                        <Text className='text-white font-bold text-base text-center'>{t('alarm_example')}</Text>

                    </View>

                </TouchableOpacity>

            </View>

        </View >

    );
}

