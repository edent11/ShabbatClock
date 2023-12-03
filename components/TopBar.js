import { Text, View } from 'react-native';


const TopBar = (props) => {



    return (

        <View className='h-20 border-b-2 dark:bg-black flex justify-center items-center'>


            <Text className='text-4xl text-spacial-blue font-semibold  dark:text-black'> {props.tabName}</Text>

        </View>

    );

}

export default TopBar;