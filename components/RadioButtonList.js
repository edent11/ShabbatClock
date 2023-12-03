
import { View, Text, Pressable } from 'react-native';
import { useState } from 'react'
import "../languages/i18n";
import { useColorScheme } from "nativewind";
import { useTranslation } from 'react-i18next';
import { Entypo, Fontisto } from '@expo/vector-icons';





export default function RadioButtonList({ data, onSelect }) {
    const { t } = useTranslation();
    const [userOption, setUserOption] = useState(0);


    const selectHandler = (key, ringtone) => {
        onSelect(ringtone);
        setUserOption(key);

    };

    const isDarkMode = useColorScheme().colorScheme === 'dark';

    return (
        <View className='bg-opacity-60 '>

            {(data)
                .sort((a, b) => {
                    if (a.duration > b.duration)
                        return 1;
                    else return -1
                })
                .map((ringtone, key) => {
                    return (
                        <Pressable
                            key={key}
                            className={`flex flex-row justify-between items-center border-b-1 h-10 border-gray-300 mb-1 px-1  bg-slate-500 `}

                            onPress={() => { selectHandler(key, ringtone); }}
                        >

                            <Fontisto name="applemusic" size={24} color={isDarkMode ? "black" : "white"} />

                            <Text className={`text-base text-white`}> {ringtone.name}</Text>

                            <Text className={`text-base text-white`}> {"(" + ringtone.duration + " " + t("seconds") + ")"}</Text>

                            <Entypo name="check" size={24} color={key === userOption ? "#1eff00" : 'transparent'} />

                            {/* #1eff00 */}
                            {/* <Image
                            source={require('../assets/images/check.png')}
                            className={`w-10 h-10 ${value === userOption ? `` : `hidden`}`}
                        /> */}

                        </Pressable>
                    );
                })}
        </View>
    );
}
