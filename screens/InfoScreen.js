import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button } from 'react-native';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { useTranslation } from 'react-i18next';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import AlarmNotification from "../screens/AlarmNotification";


export default function InfoScreen() {
    const { t } = useTranslation();
    const alarmManager = new AlarmNotification();

    return (
        <View className="flex h-full pt-8 dark:bg-black">

            <TopBar tabName={t('info_screen')} />
            <Text>bb!</Text>
            <Button
                title='hi'
                onPress={() => alarmManager.scheduleNotification('23', '48')}
            >hi</Button>
            <Text>hi</Text>
        </View >

    );
}

