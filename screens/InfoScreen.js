import { Text, View, Button } from 'react-native';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { useTranslation } from 'react-i18next';




export default function InfoScreen() {
    const { t } = useTranslation();


    return (
        <View className="flex h-full pt-8 dark:bg-black">

            <TopBar tabName={t('info_screen')} />
            <Text>bb!</Text>
            <Button
                title='hi'
            // onPress={() => }
            >hi</Button>
            <Text>hi</Text>
        </View >

    );
}

