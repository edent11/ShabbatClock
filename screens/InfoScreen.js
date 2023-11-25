import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { useTranslation } from 'react-i18next';
import { DateTimePicker } from '@react-native-community/datetimepicker';

export default function InfoScreen() {
    const { t } = useTranslation();

    return (
        <View className="flex h-full pt-8 dark:bg-black">

            <TopBar tabName={t('info_screen')} />
            <Text>bb!</Text>
            <Text>hi</Text>
        </View>

    );
}

