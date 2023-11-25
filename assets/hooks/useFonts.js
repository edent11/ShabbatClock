import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
      'MPLUSRounded1c-Medium': require('../fonts/MPLUSRounded1c-Medium.ttf'),
   });
};