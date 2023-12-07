import { Text, View, SafeAreaView, ScrollView, Button, Pressable, TouchableOpacity, AppState } from 'react-native';
import RadioButtonList from '../components/RadioButtonList'
import TopBar from '../components/TopBar'
import { ringtones } from '../android/app/src/main/res/raw/ringtones';
import { useState, useEffect } from 'react'
import { Audio } from 'expo-av';
import "../languages/i18n";
import { useTranslation } from 'react-i18next';
import { getAlarmsManager, storeDataObject, getDataObject, loadChosenRingtone } from "../assets/globals";







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


            <Text className='text-center bg-slate-800 text-white text-lg -top-2'
                adjustsFontSizeToFit={true}
                numberOfLines={1}> {t('your_ringtone') + ':   ' + ringtone}</Text>


            <View className=''>

                <TouchableOpacity className='mb-2'
                    android_ripple={{ foreground: 'black' }}
                    onPress={async () => {

                        setRingtone(lastRingtoneChosen.name);
                        await sound?.stopAsync();
                        await alarmsManager.changeAlarmRingtone(lastRingtoneChosen.name);
                        await storeDataObject('ringtone', { id: lastRingtoneChosen["id"], name: lastRingtoneChosen["name"] });
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


                {/* <Button
                    class='save ringtone'
                    onPress={async () => {

                        setRingtone(lastRingtoneChosen.name);
                        sound ? await sound.stopAsync() : {};
                        await alarmsManager.changeAlarmRingtone(lastRingtoneChosen.name);
                        await storeDataObject('ringtone', { id: lastRingtoneChosen["id"], name: lastRingtoneChosen["name"] });
                    }}

                    color='#3474eb'
                    title={t('save')} /> */}

            </View>
            {/* <View className='mt-2'>
                <Button color={"red"} onPress={() => alarmsManager.testAlarm()} title={t('alarm_example')} />

            </View> */}


        </View >

    );
}
