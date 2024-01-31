


/*
    FileName: TimePicker.jsx
    Role: Component, responsible for picking alarm's time when the user wants to edit it.
*/





import { Modal, Pressable, View, Button, TouchableWithoutFeedback, Platform } from 'react-native';
import { React, useEffect, useState } from 'react'
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'
import { useColorScheme } from "nativewind";
import { useTranslation } from 'react-i18next';
import "../languages/i18n";

const TimePicker = (props) => {

    const [date, setDate] = useState(new Date());
    const isDarkMode = useColorScheme().colorScheme == 'dark';
    const { t } = useTranslation();

    useEffect(() => {

        setDate(getClosestShabbat());
        return () => { ignore = true };


    }, [])

    const onTimeChangeIOS = () => {

        props.onSelect(selectedDate.getHours(), selectedDate.getMinutes());
    };

    const onTimeChangeAndroid = (selectedDate) => {

        props.onSelect(selectedDate);

    };


    const getClosestShabbat = () => {

        var currentDate = new Date();
        var closestShabbat = new Date();
        var diff = (6 - currentDate.getDay());
        closestShabbat.setDate(currentDate.getDate() + diff)
        return closestShabbat;


    };




    return (


        <View className={`mt - 8 h - full flex items - center justify - center bg - transparent`}>

            {
                Platform.OS === 'ios' ?

                    <Modal
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        transparent
                        visible={
                            props.active

                        }>


                        <View className='flex-col items-center justify-center' >

                            <Pressable onPress={
                                () => { props.onCancel() }
                            }>

                                <View className='flex-1 flex-col items-center justify-center'>

                                    <TouchableWithoutFeedback >

                                        <View className={`w - 80 h - 80 ${isDarkMode ? 'bg-black' : 'bg-white'} `}>

                                            {/* <DateTimePicker
                                                mode="time"
                                                display='spinner'
                                                value={
                                                    date
                                                }
                                                onChange={onTimeUpdateIOS}
                                            /> */}

                                            <Button
                                                title={props.label}
                                                onPress={onTimeChangeIOS}>


                                            </Button>

                                            <Button
                                                title='cancel'
                                                onPress={() => props.onCancel()}>


                                            </Button>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </Pressable>
                        </View>

                    </Modal >
                    :

                    <View name='android_picker'>



                        {/* // <DateTimePicker
                            //     mode="time"
                            //     display='spinner'
                            //     value={
                            //         new Date()
                            //     }
                            //     onChange={onTimeChangeAndroid}
                            // /> */}


                        <DatePicker
                            modal
                            open={props.active}
                            date={date}
                            title={t('date&hour')}
                            confirmText={t('CONFIRM')}
                            cancelText={t('CANCEL')}
                            minimumDate={new Date()}
                            textColor={'#38bdf8'}
                            onConfirm={(date) => {
                                setDate(date)
                                onTimeChangeAndroid(date)
                            }}
                            onCancel={() => {
                                props.onCancel()
                            }}
                        />


                    </View>
            }


        </View >
    );
}


export default TimePicker;