/*
    FileName: Tabs.jsx
    Role: Component, responsible for the bottom tab menu
*/



import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import tw from 'twrnc';
import { useTranslation } from 'react-i18next';
import RingtoneScreen from "../screens/RingtoneScreen";
import AlarmsScreen from "../screens/AlarmsScreen";
import InfoScreen from "../screens/InfoScreen";
import "../languages/i18n";


// sm: h - 10 md: h - 20 lg: h - 30 xl: h - 40 2xl: h - 50

const Tabs = (props) => {

    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();
    const isDarkMode = useColorScheme().colorScheme === 'dark';

    return (

        <Tab.Navigator
            initialRouteName="Alarm"
            screenOptions={{

                tabBarShowLabel: false,
                headerShown: false, //h- 18
                tabBarStyle: isDarkMode ? tw`absolute border-t-4 bg-slate-800  h-18` : tw`absolute h-18 border-t-4 bg-white`

            }}
        >

            <Tab.Screen

                name="Ringtone"
                component={RingtoneScreen}
                options={{
                    tabBarIcon: ({ focused }) => {

                        return (
                            <View className="items-center justify-center">
                                <Entypo name="beamed-note" size={focused ? 28 : 20} color={focused ? "#3474eb" : isDarkMode ? "white" : "gray"} />
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
                                <MaterialIcons name="access-alarm" size={focused ? 30 : 24} color={focused ? "#3474eb" : isDarkMode ? "white" : "gray"} />
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
                                <AntDesign name="infocirlceo" size={focused ? 28 : 20} color={focused ? "#3474eb" : isDarkMode ? "white" : "gray"} />
                            </View>
                        )
                    }
                }}
            />

        </Tab.Navigator >


    )
}



export default Tabs;