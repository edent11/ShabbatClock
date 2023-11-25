
import { React, useState } from 'react'
import AlarmClock from '../components/AlarmClock'
import TimePicker from '../components/TimePicker'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from "nativewind";
import TopBar from '../components/TopBar'
import { useFonts } from 'expo-font';
import "../languages/i18n";
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function AlarmsScreen() {
    const { t } = useTranslation();
    const [alarms, setAlarms] = useState([{ hours: '10', minutes: '00', isSwitchEnabled: false }]);
    const [isTimePickerActive, setTimePicker] = useState(false);

    const addAlarm = (hours, minutes) => {
        setAlarms(prevAlarms => {
            return [...prevAlarms, { hours: hours, minutes: minutes, isSwitchEnabled: true }];
        });


        setTimePicker(false);
    }

    const deleteAlarm = (id) => {

        setAlarms(prevAlarms => {
            return prevAlarms.filter((alarm, index) => {
                return index !== id;

            })
        });


        setTimePicker(false);
    }

    return (

        <View className={"pt-10 dark:bg-black h-11/12"} >

            {isTimePickerActive &&
                <TimePicker
                    active={isTimePickerActive}
                    onSelect={(hours, minutes) => { addAlarm(hours, minutes); }}
                    onCancel={() => setTimePicker(false)}
                    label='add alarm' />}

            <TopBar tabName={t('alarms_screen')} />

            <View className='h-5/7'>

                < ScrollView className="pt-5 mx-1" >

                    <View name="AlarmsContainer" className="flex flex-1 items-center bg-slate-600 h-full">

                        {alarms?.map((alarm, index) => {

                            return (
                                <AlarmClock
                                    key={index}
                                    hours={alarm.hours}
                                    minutes={alarm.minutes}
                                    isSwitchEnabled={alarm.isSwitchEnabled}
                                />


                            )
                        })}


                    </View>


                    <View>
                        {/* <Text>{t('dummy_text')}</Text>
                        <Text>{t("dummy_text")}</Text> */}

                    </View>

                    {/* <TouchableOpacity className='bg-blue-700 w-5 h-5 '>
                    <Text>+</Text>
                </TouchableOpacity> */}


                </ScrollView >


            </View>

            <View name='plus button' className='absolute bottom-7 inset-x-0 w-full flex items-center'>

                <TouchableOpacity
                    onPress={() => { setTimePicker(true) }}>
                    <MaterialCommunityIcons name="plus-circle" size={60} color="#3474eb" />
                </TouchableOpacity>
            </View>





        </View>
    )
}

// const styles = StyleSheet.create({

//     safeContainer: {

//         backgroundColor: 'red',
//         display: 'flex',
//         height: '100%',
//         paddingTop: Platform.OS === 'android' ? 25 : 0
//     },

//     alarmsContainer: {
//         flex: 2,
//         display: 'flex',
//         flexDirection: 'column',

//         justifyContent: 'center',
//         alignItems: 'center',


//     },



// });

