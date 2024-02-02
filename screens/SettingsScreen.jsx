/*
    FileName: RingtoneScreen.jsx
    Role: Displays ringtones for the user to choose. 
*/



import { Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Vibration } from 'react-native';
import { ringtones } from '../android/app/src/main/res/raw/ringtones';
import { useState, useEffect, useRef } from 'react'
import { Audio } from 'expo-av';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from "@react-navigation/native";
import { getAlarmsManager, storeDataObject, storeData, loadChosenRingtone, showToast, getData } from "../assets/globals";
import RadioButtonList from '../components/RadioButtonList'
import TopBar from '../components/TopBar'
import DropdownComp from '../components/DropDownComp';
import "../languages/i18n";




export default function SettingsScreen({ navigation, route }) {

    const scrollRef = useRef();
    const { height } = useWindowDimensions();
    const isTabFocused = useIsFocused();
    const alarmsManager = getAlarmsManager();
    const { t } = useTranslation();
    const [ringtone, setRingtone] = useState();
    const [sound, setSound] = useState(null);
    const [dropDownValue, setDropDownValue] = useState("");
    const [lastRingtoneChosen, setLastRingtoneChosen] = useState(ringtones[0]);






    useEffect(() => {
        loadChosenRingtone().then(ringtoneData => {

            if (ringtoneData != null) {
                setRingtone(ringtoneData["name"]);
                setLastRingtoneChosen(ringtones[ringtoneData["id"] - 1]);
                scrollRef.current?.scrollTo({
                    y: 41 * ringtoneData["id"],
                    animated: true,
                });
            }
            else {
                setRingtone(ringtones[0].name);
            }

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

        < View className={"pt-4  flex-1 dark:bg-black h-full"} >

            <TopBar tabName={t('settings_screen')} />

            <ScrollView className={"h-full"}>

                <View className={'h-full pb-24'}>

                    <View name='RingtonesView' className='mb-2 mt-4 border-2 h-[40vh] border-blue-300 mx-1'>

                        {/* style={{ height: height < 600 ? height < 500 ? 194 : 242 : 338 }} */}

                        <ScrollView
                            className="bg-slate-800"
                            ref={scrollRef}
                            nestedScrollEnabled={true} >

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

                    <DropdownComp
                        value={dropDownValue.toString()}
                        onChange={(value) => setDropDownValue(value)}
                    />
                    <View class='buttons' className='mt-5 flex items-center'>

                        <TouchableOpacity className='mb-4'
                            android_ripple={{ foreground: 'black' }}
                            onPress={async () => {


                                setRingtone(lastRingtoneChosen["name"]);
                                try {
                                    await sound?.stopAsync();
                                } catch (e) {
                                    console.log(e);
                                }
                                Vibration.vibrate(200);
                                await alarmsManager.changeAlarmRingtone(lastRingtoneChosen["name"]);
                                await storeDataObject('ringtone', { id: lastRingtoneChosen["id"], name: lastRingtoneChosen["name"] });

                                await storeData('repeatTime', dropDownValue);
                                showToast(t('Data successfully changed'));
                            }}>
                            <View class='saveRingtoneBtn' className={`bg-spacial-blue items-center justify-center h-8 rounded-lg w-[30vh]`}>
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
                                Vibration.vibrate(300);
                            }}>


                            <View class='testAlarmBtn' className={`bg-red-600 items-center justify-center h-8 rounded-lg w-[30vh]`}>
                                <Text className='text-white  text-base text-center font-Alef_Bold'>{t('alarm_example')}</Text>

                            </View>

                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

        </View >

    );
}

