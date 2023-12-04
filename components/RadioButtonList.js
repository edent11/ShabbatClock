
import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react'
import "../languages/i18n";
import { useColorScheme } from "nativewind";
import { useTranslation } from 'react-i18next';
import { Entypo, Fontisto } from '@expo/vector-icons';
import { loadChosenRingtone } from "../assets/globals";





export default function RadioButtonList(props) {

    const { t } = useTranslation();
    const [userOption, setUserOption] = useState(props.value);
    console.log(props.value);

    const selectHandler = (key, ringtone) => {
        props.onSelect(ringtone);
        setUserOption(key);

    };

    useEffect(() => {
        loadChosenRingtone().then(ringtoneData => {

            if (ringtoneData != null) {
                setUserOption(ringtoneData["id"] - 1);

            }
        });

    }, [])

    const isDarkMode = useColorScheme().colorScheme === 'dark';

    return (
        <View className='bg-opacity-60 '>

            {(props.data)
                // .sort((a, b) => {
                //     if (a.duration > b.duration)
                //         return 1;
                //     else return -1
                // })
                .map((ringtone, key) => {
                    return (
                        <Pressable
                            key={key}
                            className={`flex flex-row justify-between items-center border-b-1 h-10 border-gray-300 mb-1 px-1  bg-slate-500 `}

                            onPress={() => selectHandler(key, ringtone)}
                        >

                            <Fontisto name="applemusic" size={24} color={isDarkMode ? "black" : "white"} />

                            <Text className={`text-base text-white`}> {ringtone.name}</Text>

                            <Text className={`text-base text-white`}> {"(" + ringtone.duration + " " + t("seconds") + ")"}</Text>

                            <Entypo name="check" size={24} color={key === userOption ? "#1eff00" : 'transparent'} />

                        </Pressable>
                    );
                })}
        </View>
    );
}
