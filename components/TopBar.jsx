import { Text, View } from 'react-native';


const TopBar = (props) => {



    return (

        <View className={`dark:bg-spacial-blue bg-spacial-blue  items-center justify-center h-14`}>
            <Text className=' text-white font-bold text-3xl text-center'>{props.tabName}</Text>



            {/* <Text
                className='text-4xl text-spacial-blue font-semibold dark:text-white text-center  bg-slate-600'
                adjustsFontSizeToFit={true}
                numberOfLines={1}
            > {props.tabName}</Text> */}

        </View>

    );

}

export default TopBar;