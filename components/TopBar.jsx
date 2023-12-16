


/*
    FileName: TopBar.jsx
    Role: Component, display's the tab name in the top of every tab.
*/

import { Text, View, useWindowDimensions } from 'react-native';


const TopBar = (props) => {

    const { fontScale } = useWindowDimensions();

    return (


        <View className='flex bg-spacial-blue items-center justify-center h-16 w-full '>

            <Text className={`font-Alef_Bold  ${fontScale > 1.2 ? 'text-xl' : 'text-3xl'} -right-2 text-white`}>{props.tabName} </Text>

        </View>

    );

}

export default TopBar;