import { Alert, Modal, StyleSheet, Text, Pressable, View, Button, TouchableWithoutFeedback, Platform } from 'react-native';
import { React, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useColorScheme } from "nativewind";

const TimePicker = (props) => {

    const [modalVisible, setModalVisible] = useState(true);
    const [text, setText] = useState('test');
    const [date, setDate] = useState(new Date());
    const isDarkMode = useColorScheme().colorScheme == 'dark';



    const onTimeChangeIOS = () => {

        props.onSelect(selectedDate.getHours(), selectedDate.getMinutes());
    };




    const onTimeChangeAndroid = (event, selectedDate) => {

        if (event?.type === 'set') {

            props.onSelect(selectedDate.getHours(), selectedDate.getMinutes());
        }
        if (event?.type === 'dismissed') {

            props.onCancel();
        }


    };

    const onTimeUpdateIOS = (event, selectedDate) => {

        setDate(selectedDate);


    };

    // const fixDisplay = (time) => {

    //     if (time > 9)
    //         return time;
    //     else
    //         return `0${time}`;

    // }


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

                        }
                    // onRequestClose={
                    //     () => {
                    //         Alert.alert('Modal has been closed.');
                    //         setModalVisible(!modalVisible);
                    //     }
                    // } >
                    >

                        <View className='flex-col items-center justify-center' >

                            <Pressable onPress={
                                () => { props.onCancel() }
                            }>

                                <View className='flex-1 flex-col items-center justify-center'>


                                    <TouchableWithoutFeedback >

                                        <View className={`w - 80 h - 80 ${isDarkMode ? 'bg-black' : 'bg-white'} `}>

                                            <DateTimePicker
                                                mode="time"
                                                display='spinner'
                                                value={
                                                    date
                                                }
                                                onChange={onTimeUpdateIOS}
                                            />

                                            <Button
                                                title={props.label}
                                                onPress={onTimeChangeIOS}

                                            >
                                            </Button>
                                            <Button
                                                title='cancel'
                                                onPress={() => props.onCancel()}

                                            >
                                            </Button>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </Pressable>
                        </View>

                    </Modal >
                    :

                    <View name='android_picker'>

                        {props.active &&

                            <DateTimePicker
                                mode="time"
                                display='spinner'
                                value={
                                    new Date()
                                }
                                onChange={onTimeChangeAndroid}
                            />
                        }

                    </View>
            }


        </View >
    );
}


export default TimePicker;