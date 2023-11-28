import React from 'react';
import RingtoneScreen from "../screens/RingtoneScreen";
import AlarmsScreen from "../screens/AlarmsScreen";
import InfoScreen from "../screens/InfoScreen";
import DateAndTimePicker from "./TimePicker";



import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import tw from 'twrnc';
import { useTranslation } from 'react-i18next';
import "../languages/i18n";


// sm: h - 10 md: h - 20 lg: h - 30 xl: h - 40 2xl: h - 50

const Tabs = () => {
    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();
    const colorScheme = useColorScheme().colorScheme;
    const isDarkMode = colorScheme === 'dark';

    return (

        <Tab.Navigator
            screenOptions={{

                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: isDarkMode ? tw`h-22 absolute border-t-4 bg-slate-800 bg-opacity-100` : tw`absolute h-22 border-t-4 bg-white`

            }}
        >

            <Tab.Screen
                name="Ringtone"
                component={RingtoneScreen}
                options={{
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View className="items-center justify-center">
                                <Entypo name="beamed-note" size={focused ? 28 : 20} color={isDarkMode ? focused ? "#38bdf8" : "white" : focused ? "#38bdf8" : "gray"} />
                                {/* <Text className={`test-xs text-light-blue dark:text-white
                                 ${focused ? "text-red-600 dark:text-light-blue text-lg" : "text-light-blue dark:text-white"}`}>{t('ringtone')}</Text> */}
                            </View>
                        )
                    }
                }}
            />


            < Tab.Screen
                name="Alarm"
                component={AlarmsScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View className="items-center justify-center">
                                <MaterialIcons name="access-alarm" size={focused ? 28 : 24} color={isDarkMode ? focused ? "#38bdf8" : "white" : focused ? "red" : "#38bdf8"} />
                                {/* <Text className={`test-xs text-light-blue dark:text-white
                                 ${focused ? "text-red-600 dark:text-light-blue text-lg" : "text-light-blue dark:text-white"}`}>{t('alarms')}</Text> */}
                            </View>
                        )
                    }
                }}
            />

            < Tab.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View className="items-center justify-center">
                                <AntDesign name="infocirlceo" size={focused ? 28 : 20} color={isDarkMode ? focused ? "#38bdf8" : "white" : focused ? "red" : "#38bdf8"} />
                                {/* <Text className={`test-xs text-light-blue dark:text-white
                                 ${focused ? "text-red-600 dark:text-light-blue text-lg" : "text-light-blue dark:text-white"}`}>{t('info')}</Text> */}
                            </View>
                        )
                    }
                }}
            />

            {/* < Tab.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View className="items-center justify-center">
                                <AntDesign name="infocirlceo" size={24} color={focused ? "#38bdf8" : "white"} />
                                <Text className={`test-xs text-blue-600 dark:(text-white ${focused ? 'text-light-blue' : 'text-white'})`}>Info</Text>
                            </View>
                        )
                    }
                }}
            /> */}






            {/* <Tab.Screen name="Home" component={RingtoneScreen} /> */}

            {/* <Tab.Screen name="Settings" component={AlarmsScreen} /> */}

        </Tab.Navigator >


    )
}

const styles = StyleSheet.create({

    shadow: {

        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.75,
        shadowRadius: 3.5,
        elevation: 0,

    }

});

export default Tabs;