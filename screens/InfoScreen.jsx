/*
FileName: InfoScreen.jsx
Role: Displays app's information for the user.
*/




import { Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import TopBar from '../components/TopBar'
import "../languages/i18n";
import { showToast } from "../assets/globals";


export default function InfoScreen() {

    const { t } = useTranslation();
    const { fontScale } = useWindowDimensions();

    const copyToClipboard = () => {
        Clipboard.setString(t('contact_mail'));
        showToast(t('mail_copied'));

    };

    return (
        <View className="flex h-full pt-4 dark:bg-black pb-20 ">

            <TopBar tabName={t('info_screen')} />

            <ScrollView>


                <View class='oneDayView' className=' dark:bg-black justify-center mt-6 h-auto flex-row px-4'>


                    <Text className='text-gray-700 dark:text-white text-base font-semibold h-auto w-auto
                      font-MPLUSRounded1c_Medium'>{t('info_head')}</Text>


                </View>

                <View class='daysExplanation'>

                    <View class='oneDayView' className='bg-gray-200 dark:bg-black mt-6 h-auto justify-normal
                     items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-red-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <Text className={`text-white font-Alef_Bold text-xl text-center ${fontScale > 1 ? '-top-1' : {}}`}>1</Text>
                        </View>


                        <View className='h-auto w-auto  flex-1'>
                            <Text className=' text-gray-700 dark:text-white text-base font-semibold font-MPLUSRounded1c_Medium mr-2'>{t('info_first_day')}</Text>
                        </View>
                    </View>




                    <View class='twoDayView' className='bg-gray-200 dark:bg-black mt-6 h-auto justify-normal
                     items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-blue-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <Text className={`text-white font-Alef_Bold text-xl text-center ${fontScale > 1 ? '-top-1' : {}}`}>2</Text>




                        </View>

                        <View className='h-auto w-auto flex-1'>
                            <Text className=' text-gray-700 dark:text-white text-base font-MPLUSRounded1c_Medium mr-2' >{t('info_second_day')}</Text>
                        </View>
                    </View>


                    <View class='threeDayView' className='bg-gray-200 dark:bg-black mt-6 h-auto justify-normal
                     items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-green-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <Text className={`text-white font-Alef_Bold text-xl text-center ${fontScale > 1 ? '-top-1' : {}}`}>3</Text>

                        </View>

                        <View className='h-auto w-auto  flex-1'>
                            <Text className=' text-gray-700 dark:text-white text-base font-semibold font-MPLUSRounded1c_Medium mr-2'>{t('info_third_day')}</Text>
                        </View>
                    </View>


                    <View class='deleteView' className='bg-gray-200 dark:bg-black mt-6 h-auto justify-normal
                     items-center flex-row border-2 border-gray-800'>

                        <View className={`bg-yellow-400
                             h-8 w-8 rounded-full mx-3 items-center justify-center`}>
                            <MaterialCommunityIcons name="delete-empty" size={24} color="black" />

                        </View>

                        <View className='h-auto w-auto flex-1'>
                            <Text className={`text-gray-700 dark:text-white text-base font-semibold
                             font-MPLUSRounded1c_Medium mr-2`}>{t('info_remove_alarm')}</Text>
                        </View>
                    </View>




                </View>


                <View className={`items-center justify-center mt-6 flex-row bg-spacial-blue`}>

                    <View className='mx-3'>

                        <FontAwesome name="exclamation-triangle" size={36} color="yellow" />
                    </View>

                    <View className='h-auto w-auto flex-1'>
                        <Text className='text-white text-base font-semibold font-MPLUSRounded1c_Medium mr-2'>{t('info_ringtone_update')}</Text>
                    </View>

                </View>

                <View className={`items-center justify-center mt-6 mx-3`}>

                    <View className='h-auto w-auto flex-1 mb-3 mx-3'>
                        <Text className='text-base font-semibold font-MPLUSRounded1c_Medium
                         text-gray-700 dark:text-white'>{t('contact')}</Text>

                    </View>

                    <View className='h-auto w-auto flex-1 bg-red-300'>

                        <TouchableOpacity onLongPress={copyToClipboard}>
                            <Text className='text-white text-base font-semibold '>{t('contact_mail')}</Text>
                        </TouchableOpacity>



                    </View>

                </View>


            </ScrollView>

        </View >

    );
}

