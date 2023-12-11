


/*
    FileName: TopBar.jsx
    Role: Component, display's the tab name in the top of every tab.
*/

import { Text, View } from 'react-native';


const TopBar = (props) => {

    return (

        <View className='flex bg-spacial-blue items-center justify-center h-14 w-full '>

            <Text className='font-Alef_Bold text-3xl -right-2 text-white '>{props.tabName} </Text>

        </View>

    );

}

export default TopBar;