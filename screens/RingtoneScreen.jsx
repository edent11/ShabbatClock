/*
    FileName: RingtoneScreen.jsx
    Role: Displays ringtones for the user to choose. 
*/



import { Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { ringtones } from '../android/app/src/main/res/raw/ringtones';
import { useState, useEffect } from 'react'
import { Audio } from 'expo-av';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from "@react-navigation/native";
import { getAlarmsManager, storeDataObject, loadChosenRingtone, showToast } from "../assets/globals";
import RadioButtonList from '../components/RadioButtonList'
import TopBar from '../components/TopBar'
import "../languages/i18n";








export default function RingtoneScreen({ navigation, route }) {

    const { height, fontScale } = useWindowDimensions();
    const isTabFocused = useIsFocused();
    const alarmsManager = getAlarmsManager();
    const { t } = useTranslation();
    const [ringtone, setRingtone] = useState();
    const [sound, setSound] = useState(null);
    const [lastRingtoneChosen, setLastRingtoneChosen] = useState(ringtones[0]);


    useEffect(() => {
        loadChosenRingtone().then(ringtoneData => {

            if (ringtoneData != null) {
                setRingtone(ringtoneData["name"]);
                setLastRingtoneChosen(ringtoneData["name"]);
            }
            else setRingtone(ringtones[0]?.name);
        });

        return () => { ignore = true };


    }, [])

    //if sound is playing and we changed screen
    if (!isTabFocused) {
        try {
            sound?.stopAsync();
        } catch (e) {
            console.log(e);
        }
    }



    async function playSound(chosenRingtone) {

        // console.log('Loading Sound');
        console.log("playing " + chosenRingtone.name);
        const { sound } = await Audio.Sound.createAsync(chosenRingtone.file);
        setSound(sound);

        // console.log('Playing Sound');
        await sound.playAsync();
    }


    useEffect(() => {

        console.log(fontScale)

        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();

            }
            : undefined;


    }, [sound]);





    return (

        < View className={"pt-4  dark:bg-black h-screen "} >

            <TopBar tabName={t('ringtone_screen')} />


            <View name='RingtonesView' className={`mb-2 ${height < 600 ? 'h-2/5' : 'h-1/2'} mt-4 border-2 border-blue-300`} >


                < ScrollView className="bg-slate-800" >

                    <RadioButtonList
                        isTabFocused={isTabFocused}
                        data={ringtones}
                        onSelect={async (chosenRingtone) => {
                            playSound(chosenRingtone);
                            setLastRingtoneChosen(chosenRingtone);

                        }} />

                </ScrollView >
            </View>

            <View className='items-center justify-center mx-3'>


                <Text className='text-center bg-gray-500 dark:bg-slate-800 text-white text-base mt-3 -top-2 h-auto font-Kanit_SemiBold'
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}> {t('your_ringtone') + ':   ' + ringtone}</Text>

            </View>


            <View class='buttons' className=' mt-5 '>

                <TouchableOpacity className='mb-4'
                    android_ripple={{ foreground: 'black' }}
                    onPress={async () => {

                        setRingtone(lastRingtoneChosen.name);
                        try {
                            await sound?.stopAsync();
                        } catch (e) {
                            console.log(e);
                        }
                        await alarmsManager.changeAlarmRingtone(lastRingtoneChosen.name);
                        await storeDataObject('ringtone', { id: lastRingtoneChosen["id"], name: lastRingtoneChosen["name"] });
                        showToast(t('ringtone_changed'));
                    }}>
                    <View class='saveRingtoneBtn' className={`bg-spacial-blue items-center justify-center h-8 `}>
                        <Text className='text-white text-base text-center font-Alef_Bold'>{t('save')}</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    android_ripple={{ foreground: 'black' }}

                    onPress={async () => {
                        try {
                            await sound?.stopAsync();
                        } catch (e) {
                            console.log(e);
                        }
                        alarmsManager.testAlarm();
                    }}>


                    <View class='testAlarmBtn' className={`bg-red-600 items-center justify-center h-8`}>
                        <Text className='text-white  text-base text-center font-Alef_Bold'>{t('alarm_example')}</Text>

                    </View>

                </TouchableOpacity>

            </View>

        </View >

    );
}

