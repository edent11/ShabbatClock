import { Text, View } from 'react-native';


const TopBar = (props) => {


    // const { t } = useTranslation();


    return (

        <View className='h-20 border-b-2 dark:bg-black flex justify-center items-center'>


            <Text className='text-4xl text-spacial-blue  dark:text-black'> {props.tabName}</Text>

        </View>

    );

}

export default TopBar;