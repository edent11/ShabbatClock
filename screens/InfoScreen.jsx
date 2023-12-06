import { Text, View, Button, Pressable, ScrollView } from 'react-native';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function InfoScreen() {
    const { t } = useTranslation();


    return (
        <View className="flex h-full pt-4 dark:bg-black pb-20 ">

            <TopBar tabName={t('info_screen')} />

            <ScrollView className='flex-1'>


                <View class='oneDayView' className='bg-gray-400 dark:bg-black mt-6 h-auto flex-row px-4'>


                    <Text className='text-white text-base font-semibold h-auto w-auto'>על מנת לתמוך במצב של שבת וחג של 48 ו-72 שעות</Text>



                </View>



                <View class='daysExplanation'>

                    <View class='oneDayView' className='bg-gray-400 dark:bg-black mt-6 h-auto justify-normal items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-red-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <Text className='text-white text-base font-semibold  h-auto w-auto'>1</Text>




                        </View>

                        <Text className='text-white font-semibold text-base px-2 w-4/5'>הקרובות כשהכפתור דולק, השעון המעורר יצלצל בשעה הנקובה ב- 24 שעות</Text>
                    </View>




                    <View class='oneDayView' className='bg-gray-400 dark:bg-black mt-6 h-auto justify-normal items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-blue-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <Text className='text-white text-base font-semibold  h-auto w-auto'>2</Text>




                        </View>

                        <Text className='text-white font-semibold text-base px-2 w-4/5'>הקרובות כשהכפתור דולק, השעון המעורר יצלצל בשעה הנקובה ב- 24 שעות</Text>
                    </View>






                    <View class='oneDayView' className='bg-gray-400 dark:bg-black mt-6 h-auto justify-normal items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-green-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <Text className='text-white text-base font-semibold h-auto w-auto'>3</Text>

                        </View>

                        <Text className='text-white font-semibold text-base px-2 w-4/5'>הקרובות כשהכפתור דולק, השעון המעורר יצלצל בשעה הנקובה ב- 24 שעות</Text>
                    </View>




                    <View class='oneDayView' className='bg-gray-400 dark:bg-black mt-6 h-auto justify-normal items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-yellow-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <MaterialCommunityIcons name="delete-empty" size={24} color="black" />

                        </View>

                        <Text className='text-white font-semibold text-base px-2 w-4/5'>על מנת למחוק התראה יש ללחוץ לחיצה ארוכה על כפתור המחיקה</Text>
                    </View>


                </View>


                <View className={`items-center justify-center px-4 pt-4`}>
                    <Text className='text-white text-base font-semibold h-auto w-auto mb-4'>*במקרה שברצונך לעדכן את הרינגטון, יש לקבוע את ההתראות מחדש. הרינגטון קבוע לכל ההתראות</Text>

                    <Text className='text-white text-base font-semibold h-auto w-auto'>*ניתן לשלב שניים או שלושה כפתורים בהתראה אחת, כך שהשעון יצלצל באותה השעה לאחר 24/48/72 שעות</Text>

                </View>


            </ScrollView>

        </View >

    );
}

