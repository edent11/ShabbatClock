/*
    FileName: RadioButtonList.jsx
    Role: Component, responsible for displaying the alarm ringtones for the user
*/

import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Entypo, Fontisto } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import { loadChosenRingtone } from "../assets/globals";
import "../languages/i18n";





export default function RadioButtonList(props) {

    // for dark-mode support
    const isDarkMode = useColorScheme().colorScheme === 'dark';
    const { t } = useTranslation();
    const [userOption, setUserOption] = useState(0);


    /*When the user selects ringtone */

    const selectHandler = (key, ringtone) => {
        props.onSelect(ringtone);
        setUserOption(key);

    };

    /*On initial render */

    useEffect(() => {
        loadChosenRingtone().then(ringtoneData => {

            if (ringtoneData != null) {
                setUserOption(ringtoneData["id"] - 1);
            }
        });

        return () => { ignore = true };

    }, [props.isTabFocused])


    return (
        <View className='bg-opacity-60'>

            {(props.data)
                .map((ringtone, key) => {
                    return (
                        <Pressable
                            key={key}
                            className={`flex flex-row justify-between items-center border-b-2 h-[8vh]
                             border-blue-300  px-2 bg-gray-200 dark:bg-black`}

                            onPress={() => selectHandler(key, ringtone)}>

                            <Fontisto name="applemusic" size={24} color={isDarkMode ? "white" : "#6B7280"} />

                            <View className='h-auto'>

                                <View className='flex-1 items-center justify-center'>

                                    <Text
                                        className={`text-sm text-gray-600 dark:text-white h-auto font-Kanit_SemiBold`}


                                    > {ringtone.name + " (" + ringtone.duration + " " + t("seconds") + ")"}</Text>
                                </View>
                            </View>

                            <Entypo name="check" size={25} color={key === userOption ? "#3474eb" : 'transparent'} />

                        </Pressable>
                    );
                })}
        </View>
    );
}
