
import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react'
import "../languages/i18n";
import { useColorScheme } from "nativewind";
import { useTranslation } from 'react-i18next';
import { Entypo, Fontisto } from '@expo/vector-icons';
import { isDarkMode, loadChosenRingtone } from "../assets/globals";





export default function RadioButtonList(props) {

    const { t } = useTranslation();
    const [userOption, setUserOption] = useState(0);
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



    return (
        <View className='bg-opacity-60'>

            {(props.data)
                .map((ringtone, key) => {
                    return (
                        <Pressable
                            key={key}
                            className={`flex flex-row justify-between items-center border-b-2 h-12 border-blue-300  px-2 bg-slate-400 dark:bg-black`}

                            onPress={() => selectHandler(key, ringtone)}
                        >

                            <Fontisto name="applemusic" size={24} color={isDarkMode ? "black" : "white"} />

                            <Text
                                className={`text-sm text-white`}
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}> {ringtone.name + " (" + ringtone.duration + " " + t("seconds") + ")"}</Text>

                            {/* <Text
                                className={`text-base text-white`}
                                adjustsFontSizeToFit={true}
                                numberOfLines={2}>
                                {"(" + ringtone.duration + " " + t("seconds") + ")"}</Text> */}

                            <Entypo name="check" size={24} color={key === userOption ? "#1eff00" : 'transparent'} />

                        </Pressable>
                    );
                })}
        </View>
    );
}
