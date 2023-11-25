import { Text, View } from 'react-native';


const TopBar = (props) => {


    // const { t } = useTranslation();


    return (

        <View className='h-20 bg-white dark:bg-black flex justify-center items-center'>


            <Text className='text-4xl text-white'> {props.tabName}</Text>

        </View>

    );

}

export default TopBar;