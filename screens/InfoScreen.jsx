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

            <ScrollView>


                <View class='oneDayView' className='bg-gray-400 dark:bg-black mt-6 h-auto flex-row px-4'>


                    <Text className='text-white text-base font-semibold h-auto w-auto'>{t('info_head')}</Text>


                </View>

                <View class='daysExplanation'>

                    <View class='oneDayView' className='bg-gray-400 dark:bg-black mt-6 h-auto justify-normal items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-red-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <Text className='text-white text-base font-semibold  h-auto w-auto'>1</Text>
                        </View>


                        <View className='h-auto w-auto  flex-1'>
                            <Text className='text-white text-base font-semibold '>{t('info_first_day')}</Text>
                        </View>
                    </View>




                    <View class='twoDayView' className='bg-gray-400 dark:bg-black mt-6 h-auto justify-normal items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-blue-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <Text className='text-white text-base font-semibold  h-auto w-auto'>2</Text>




                        </View>

                        <View className='h-auto w-auto  flex-1'>
                            <Text className='text-white text-base font-semibold '>{t('info_second_day')}</Text>
                        </View>
                    </View>


                    <View class='threeDayView' className='bg-gray-400 dark:bg-black mt-6 h-auto justify-normal items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-green-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <Text className='text-white text-base font-semibold h-auto w-auto'>3</Text>

                        </View>

                        <View className='h-auto w-auto  flex-1'>
                            <Text className='text-white text-base font-semibold '>{t('info_third_day')}</Text>
                        </View>
                    </View>



                    <View class='allDaysView' className='bg-gray-400 dark:bg-black mt-6 h-auto justify-normal items-center flex-row border-2 border-gray-800'>

                        <View class='btns' className='flex-row mx-3' >

                            <View className={`bg-red-400
                             h-8 w-8 rounded-full items-center justify-center`}>
                                <Text className='text-white text-base font-semibold  h-auto w-auto'>1</Text>
                            </View>


                            <View className={`bg-blue-400
                             h-8 w-8 rounded-full items-center justify-center`}>
                                <Text className='text-white text-base font-semibold  h-auto w-auto'>2</Text>

                            </View>

                            <View className={`bg-green-400
                             h-8 w-8 rounded-full  items-center justify-center`}>
                                <Text className='text-white text-base font-semibold h-auto w-auto'>3</Text>


                            </View>
                        </View>

                        <View className='h-auto w-auto  flex-1'>
                            <Text className='text-white text-base font-semibold '>{t('info_all_days')}</Text>
                        </View>

                    </View>


                    <View class='deleteView' className='bg-gray-400 dark:bg-black mt-6 h-auto justify-normal items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-yellow-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <MaterialCommunityIcons name="delete-empty" size={24} color="black" />

                        </View>

                        <View className='h-auto w-auto flex-1'>
                            <Text className='text-white text-base font-semibold '>{t('info_remove_alarm')}</Text>
                        </View>
                    </View>




                </View>


                <View className={`items-center justify-center px-4 pt-4`}>
                    <Text className='text-white text-base font-semibold h-auto w-auto mb-4 bg-spacial-blue'>{t('info_ringtone_update')}</Text>



                </View>


            </ScrollView>

        </View >

    );
}

