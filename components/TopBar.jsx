


/*
    FileName: TopBar.jsx
    Role: Component, display's the tab name in the top of every tab.
*/

import { Text, View } from 'react-native';


const TopBar = (props) => {

    return (

        <View className={` bg-spacial-blue items-center justify-center h-14`}>
            <Text className=' text-white font-bold text-3xl '>{props.tabName}</Text>
        </View>

    );

}

export default TopBar;