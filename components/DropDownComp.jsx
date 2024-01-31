import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getData } from "../assets/globals";
import { useTranslation } from 'react-i18next';
import "../languages/i18n";



const DropdownComp = (props) => {


    const [value, setValue] = useState('5');
    const [isFocus, setIsFocus] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        getData("repeatTime").then(repeatTime => {

            if (repeatTime != null) {
                setValue(repeatTime);
            }
        });

        return () => { ignore = true };

    }, [props.isTabFocused])


    const repeatTime = [
        { label: '1 ' + t('minutes'), value: '1' },
        { label: '2 ' + t('minutes'), value: '2' },
        { label: '3 ' + t('minutes'), value: '3' },
        { label: '4 ' + t('minutes'), value: '4' },
        { label: '5 ' + t('minutes'), value: '5' },
        { label: '10 ' + t('minutes'), value: '10' },
        { label: '15 ' + t('minutes'), value: '15' },
    ];

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'white' }]}>
                    {t('Repeat Time')}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#3474eb' }]}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={repeatTime}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? t('Select Time') : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {

                    props.onChange(item.value);
                    setValue(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <MaterialCommunityIcons
                        style={styles.icon}
                        color={isFocus ? 'black' : '#3474eb'}
                        name="alarm-snooze"
                        size={20}
                    />
                )}
            />
        </View>
    );
};

export default DropdownComp;

const styles = StyleSheet.create({
    container: {

        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: '#3474eb',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },

});